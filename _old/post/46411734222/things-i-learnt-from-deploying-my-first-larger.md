{
  "title": "Things I learnt from deploying my first larger Meteor.js app",
  "date": "2013-03-27 10:00:28 GMT"
}

---

#Things I learnt from deploying my first larger Meteor.js app
With Google Reader [said to be discontinued](http://www.ubergizmo.com/2013/03/google-reader-discontinued/) I had to look for alternatives.
I had a look at the many alternatives but none made me really happy - *plus* I was already looking for a way of building a "real" app that I'd like to use to learn more about the woes and joys of maintaining a Meteor.js app and potentially running it at a bigger scale on my own infrastructure.

So building my own RSS reader and offering it to everybody as a hosted service on my private server seemed perfect to achieve more "real life" experience with Meteor.js.

The result is my latest side project [Neee.ws](http://neee.ws), which is [also on Github](https://github.com/avgp/rssteroids).

Okay, enough context - what went good, what went bad?


**(Re-)Deployment**

First of all, redeployment involved the following steps

 1. Run ```mrt bundle```
 2. Copy the tar to the server
 3. Unpack it
 4. Delete the ```fibers``` package (because I bundle on a different architecture as my servers'.
 5. Restart the application

to make this a little more convenient, I wrote a [little shell script](https://gist.github.com/anonymous/5249546) to do that and also keep a backup of the previously deployed version.

To run the app on the server I use [forever](https://github.com/nodejitsu/forever), which is super-simple and works reliably for me.

**Beware of large collections!**

I totally forgot about the client-side mongo instance.
Meteor tries to download the whole database (**!**) to the client for caching. Even if you're limiting your query results: The client will get the *whole* database.
That is part of the ```autopublish``` magic.
Hence you should remove the autopublish package and use ```Meteor.publish```, ```Meteor.subscribe``` and ```Deps.autorun``` and do as much filtering as possible on the server side to have only the most important documents cached locally.

The performance gain is enormous - from **28 seconds** loading time down to **1.9 seconds**!

**The many joys of Meteor.js**
The development was really quick & easy - thanks to the many nice things Meteor gives you for free. I will just give a short list here:

* Google Login + oAuth token for API access
* Reactivity in data sources
* Helpful [Meteorite](https://github.com/oortcloud/meteorite) packages, particularly [meteor-router](https://github.com/tmeasday/meteor-router)
* Easy setup & bundling
