{
  "title": "Writing web applications - all the way on the web!",
  "date": "2012-12-28 13:41:16 GMT"
}

---

#Writing web applications - all the way on the web!
<p>Lately, the web has become a really powerful platform.</p>&#13;
<p>With things like <a href="http://creativejs.com/2012/03/getting-started-with-getusermedia/">UserMedia</a>, <a href="http://www.webrtc.org/">WebRTC</a> and <a href="http://streunerlein.github.com/jsz-threejs/">WebGL</a> it can do many things you may not expect to be possible in your browser.</p>&#13;
<p>This article wants to shed a light on one more use case: Developing and deploying a web application from scratch - only using your browser.</p>&#13;
<p><strong><br /></strong></p>&#13;
<p><strong>Cloud9 - the IDE is your browser</strong></p>&#13;
<p>First of all, you need a place to write and test your application, basically you need some sort of development environment. <a href="http://c9.io">Cloud9</a> provides this.</p>&#13;
<p>It allows you to build web applications, run ruby or node.js applications, install gems as well as node packages and run them.</p>&#13;
<p>It integrates well with Git-, FTP- or SSH servers. The free plan includes public workspaces, but you can have private workspaces with the paid plan.</p>&#13;
<p>Cloud9 serves your application from a globally reachable address but stops processes like node or rails after a certain time (which is long enough for testing, though).</p>&#13;
<p>Bonus: <a href="https://github.com/ajaxorg/cloud9/">Cloud9 is open-source</a>.</p>&#13;
<p>For a full-power web application you may need a database... the next step describes how to set up and manage a mongo instance from your browser. If you don't want mongo, check Appfog below.</p>&#13;
&#13;
<p><strong>MongoHQ - your database as a service</strong></p>&#13;
<p><a href="http://www.mongohq.com">MongoHQ</a> allows you to create and manage mongo databases via a simple web interface.</p>&#13;
<p>You can also view, edit or delete documents or collections from your browser or connect using the mongo shell (which also integrates well with Cloud9).</p>&#13;
&#13;
<p><strong>Appfog - cloud hosting made really easy</strong></p>&#13;
<p><a href="http://www.appfog.com">Appfog</a> is like Heroku, but it offers you a lot of different languages, frameworks and tools.</p>&#13;
<p>You can start by creating an application from their web interface.</p>&#13;
<p>Deployment is done via their "af" rubygem from the console (I use the console from Cloud9, which works like a charm).</p>&#13;
<p>Afterwards you can create and bind services, which is basically one of the many supported databases (mongo, redis, postgres, mysql,...) to use with your application.</p>&#13;
<p>In addition, you can scale your application by adding more RAM or instances to it.</p>&#13;
<p>Now we created our web app + database and host it on the cloud - all from our browser.</p>&#13;
<p>But this is not the end of the story - let's test how well it performs!</p>&#13;
&#13;
<p><strong>Blitz.io - load testing as a service</strong></p>&#13;
<p><a href="http://www.blitz.io">Blitz.io</a> allows you to test how your application reacts to a given amount of users hitting your website over a given time.</p>&#13;
<p>You can configure from where the bombardement with users should come (they have a bunch of regions, scattered all over the world), the pattern of the users hitting your application (e.g. linear growth or saw-tooth patterns) and how long the "rush" should last.</p>&#13;
<p>Afterwards you get a summary of how many hits per second were successful, how many errors and timeouts happened and some more details.</p> 