{
  "title": "Making an interactive 3D terrain from Zurich's open geo data with Three.js",
  "date": "2015-02-14 11:00:36 GMT"
}

---

#Making an interactive 3D terrain from Zurich's open geo data with Three.js


# Preface

A few days ago I stumbled upon [this tweet](https://twitter.com/OpenDataZurich/status/565201408077856769) from  [@OpenDataZurich](https://twitter.com/opendatazurich):

> Hochaufgelöste Höhendaten des @kantonzuerich neu als #opendata verfügbar! are.zh.ch/internet/baudi… by @GISZentrumZH ^si

So I checked them out in the [GIS browser](http://maps.zh.ch/mobile?topic=LidarZH&offlayers=dom2014hillshade&over=UpBackgroundZH) and was hit by the possibilities this meant.

The data contains three interesting things:

* the output files of the actual measurement done with the [LIDAR](http://en.m.wikipedia.org/wiki/Lidar) 
* the Digital Terrain Model (i.e. the pure terrain without buildings or vegetation) data 
* the digital surface model (in German "Digitales Oberflächen Modell, DOM) 

I am particularly interested in the latter, as it allows for a number of ideas to become possible! 

Some of the things that came to my mind:

* make an interactively explorable model from the data to allow getting a 3D look at Zurich
* hook it up to a physics engine and do a few neat simulations
* pair it with VR (e.g. the Oculus Rift or the Google Cardboard) and make it walkable

# There's the data. Now what? 

Alright, enough ideas, let's go! 
So first of all, I navigated into [the directory that holds all the surface model data](http://maps.zh.ch/download/hoehen/2014/dom/tif/) and hunted for the tile that I identified using the GIS browser beforehand - in my case the tile `6830_2470.tif` that holds part of the city center. [This is the one I'm talking about](http://maps.zh.ch/download/hoehen/2014/dom/tif/6830_2470.tif).

Okay, now I have a TIFF image that contains geo data. Now what?
Googling brought me to [the GeoTIFF website](http://trac.osgeo.org/geotiff/) with a lot of information on the format, but I wondered if I really have to parse it myself.

Obviously, I didn't have to. As nearly always [npm got me covered with geo-pixel-stream](https://www.npmjs.com/package/geo-pixel-stream) from the folks at [MapBox](https://www.mapbox.com/)!
[Ryan Clark](https://github.com/rclark), if you read this: Thanks man!

Okay, so I wrote a small script to do some evaluation of what the heck I will get from the file:

    var ps = require('geo-pixel-stream'),
        readers = ps.createReadStreams('data.tif');
    
    console.log(readers.length);
    console.log(readers[0].metadata);

    readers[0].on('data', function(data) {
      console.log("----", data.offset, data.blockSize, data.buffer[0]);
    });

Okay, so that gave me some information:

    { 
      driver: 'GTiff',
      width: 2000,
      height: 2000,
      numBands: 1,
      srs: {},
      geotransform: [ 683000, 0.5, 0, 248000, 0, -0.5 ],
      id: 1,
      type: 'Float32',
      blockSize: { x: 256, y: 256 } 
    }

Notably: 

* It's a 2000x2000 "image"
* It is a bunch of `Float32`s
* It comes in blocks of 256 by 256 data points

Ah-ha.
So I have a stream of floats... that's possibly the elevation, huh?

    { x: 0, y: 0 } { x: 256, y: 256 } 411.1099853515625
    { x: 1, y: 0 } { x: 256, y: 256 } 407.8500061035156
    { x: 2, y: 0 } { x: 256, y: 256 } 430.29998779296875
    { x: 3, y: 0 } { x: 256, y: 256 } 408.260009765625

That sounds about right (checking it with the GIS browser again).

Cool, so I'll turn that into a terrain with [Three.js](http://www.threejs.org) for which I need each block of 256x256 points in one JSON array - that's what `linearize.js` does:

    var ps = require('geo-pixel-stream'),
        readers = ps.createReadStreams('6830_2470.tif'),
        fs = require('fs');
    
    var numPoints = 0, blocks = [];
    
    readers[0].on('data', function(data) {
        var blockPoints = [],
            blockLen = data.blockSize.x * data.blockSize.y;
    
        for(var i=0;i<blockLen;i++) {
          blockPoints.push(data.buffer[i]);
        }
        blocks.push(blockPoints);
    });
    
    readers[0].on('end', function() {
      fs.writeFile('data.json', JSON.stringify(blocks), function() {
        console.log("Written " + blocks.length + " blocks to file.");
      });
    });

So we're now having it all in a (large) JSON file (`data.json`) - ready for consumption in Three.js :)

# Making it discoverable

Now that we have the data ready, it's time to put pixels on the screen, isn't it?

For that, we'll read the `data.json` that is created by `linearize.js` and create a plane for each block.
Each of those planes will represent a block of 256x256 points in our case - and we'll have 8x8 blocks arranged in a grid in the data.

So let's start looking at how to create the planes containing the point data:

    function createTerrainBlock(points, width, depth, blockWidth, blockDepth) {
      var geometry = new THREE.PlaneBufferGeometry( width, depth, blockWidth - 1, blockDepth - 1 );
      geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
    
      var vertices = geometry.attributes.position.array;
      for ( var i = 0, j = 0, l = vertices.length; i < l; i++, j += 3 ) {
        vertices[ j + 1 ] = points[ i ];
      }
    
      return geometry;
    }

This will create a plane, rotate it so that it's horizontal and set each of its vertices (it's an array in the form of [x1, y1, z1, x2, y2, z2, ... , xn, yn, zn] so we're iterating in steps of 3 through that array) and set the y-coordinate to the point data from the GeoTIFF (i.e. the elevation of that point).

Now we'll have to walk through each of our blocks and use the geometry to create meshes to put on screen:


    function createTerrain(blocks, blocksPerRow, blockSize) {
      var material = new THREE.MeshLambertMaterial();
      var meshes = [];
      for(var i=0; i<blocks.length; i++) {
        var geometry = createTerrainBlock(blocks[i], blockSize, blockSize, 256, 256);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set((i%blocksPerRow) * blockSize, 0, Math.floor(i/blocksPerRow) * blockSize);
      }
    
      return meshes;
    }

And that's it for the generation and positioning.
When you render it, together with some lighting, you get something similar to this:

![Demo picture of the terrain data](http://i.imgur.com/OaQ59Ig.png)

Nice, isn't it?

# Where to go next?

What you can do with this data is up to your imagination now - so go and check out the data in the [GIS browser](http://maps.zh.ch/mobile?topic=LidarZH&offlayers=dom2014hillshade&over=UpBackgroundZH) and play around with it.

Would be happy to hear what you did, so why not drop me a tweet [@g33konaut](https://twitter.com/g33konaut)?