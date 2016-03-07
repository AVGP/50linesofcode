{
  "title": "Quick tip: HTML5 offline cache manifest tips",
  "date": "2013-06-10 11:00:13 GMT"
}

---

#Quick tip: HTML5 offline cache manifest tips
If you want to leverage the power of the HTML5 offline caching, together with Cross Origin AJAX, you may see failing requests.

In addition you should specify a timestamp and/or a version number to easily give browsers a possibility to update their cache.

The trick is, to specify your "local" (i.e. "belonging to your app") assets, such as HTML, CSS, JS and image files) explicitely in the caching section of your cache manifest and mark everthing else explicitely as "always download". In my example the file looks like this:

    CACHE MANIFEST
    # 2013-06-07v3
    
    index.html
    img/icon.png
    img/loader.gif
    css/app.css
    js/app.js
    js/controller.js
    js/directives.js
    js/services.js
    components/quojs/quo.debug.js
    components/lungo.brownie/lungo.js
    components/moment/min/moment.min.js
    components/lungo.brownie/lungo.theme.css
    components/lungo/lungo.icon.css
    components/lungo/lungo.css
    components/lungo-angular-bridge/dist/lungo-angular-bridge.js
    components/angular/angular.js
    
    NETWORK:
    *
The last section, captioned "NETWORK" lets the browser download everything that is *not* mentioned in the previous section of the manifest.

I saw failing requests in my Chrome Webapp without specifying the other requests as non-cached.