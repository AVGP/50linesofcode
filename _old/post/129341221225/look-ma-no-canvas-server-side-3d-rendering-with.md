{
  "title": "Look ma, no canvas! Server-side 3D rendering with node.js and Three.js",
  "date": "2015-09-18 10:00:17 GMT"
}

---

#Look ma, no canvas! Server-side 3D rendering with node.js and Three.js
**Sweet surprise: SoftwareRenderer**

If you wonder if and how you can render a Three.js 3D scene using node.js on the server, you may have been thinking about using a canvas module, such as [Automattic/Canvas](https://www.npmjs.com/package/canvas) or run a headless browser such as Phantom or even a full-blown [Firefox or Chrome on xvfb](http://tobyho.com/2015/01/09/headless-browser-testing-xvfb/).

But you don't need to, thanks to a modified `SoftwareRenderer`.

The following Gif has been rendered on a server in 1.5 seconds:

![](http://i.imgur.com/KQOLbGo.gif)

**Using the new SoftwareRenderer**

You find the modified SoftwareRenderer on [npm](https://npmjs.org/package/three-software-renderer) and [Github](https://github.com/avgp/three-software-renderer) and it's working in the browser as well as on the server with node.js.

[Here's an example](https://gist.github.com/AVGP/88dbd972824eb2e0b2a1) that renders a spinning cube (or a single frame of the cube, if you're not in a browser) and counts the coloured pixels. This is a simple demonstration of how the renderer is used:

<div class="gist">https://gist.github.com/AVGP/88dbd972824eb2e0b2a1</div>

The difference to other renderers is that `render()` returns an object similar (but not exactly) `ImageData`:

    {
      data: Uint8ClampedArray(...), // pixels as RGBARGBARGBA... array
      width: Number, // width in pixels
      height: Number // height in pixels
    }

The data coming from `render` can be generated and used both in browser as well as on the server. So it's "[isomorphic](http://venturebeat.com/2013/11/08/the-future-of-web-apps-is-ready-isomorphic-javascript/)" in current lingo (I'd prefer "universal").

**Adventure Time!**

With the possibility to render off-GPU and on the server, we get a bunch of interesting possibilities like render in a web worker or.... **render an animated GIF from a THREE.Scene on the server**:

<div class="gist">https://gist.github.com/40e545f9e1b793edbb71</div>

**Credits**

The original `THREE.SoftwareRenderer` is part of the Three.js examples but still uses a canvas element. 

When going through the sources I found that it actually uses array operations on the pixel array from the canvas context, so I decided to modify it a bit to not create (or use) a canvas and a 2D context from it, but just create and use a ray `Uint8ClampedArray` which, to my delight, worked just fine.

The original source can be found [here](https://github.com/mrdoob/three.js/blob/0b07813dc45481f1d16d3b6d2334178664861465/examples/js/renderers/SoftwareRenderer.js).

So, yeah, check it out on [Github](https://github.com/avgp/three-software-renderer) and [NPM](https://npmjs.org/package/three-software-renderer)!