{
  "title": "Documenting your Javascript with YUIdocs",
  "date": "2012-11-20 14:00:33 GMT"
}

---

#Documenting your Javascript with YUIdocs
<p>If you look for a nice way of documenting your Javascript, apart from the Java-based <a href="http://code.google.com/p/jsdoc-toolkit/w/list">JSDoc </a> and want something easy and comfortable to use, check out <a href="http://yui.github.com/yuidoc/">YUIDoc</a>.</p>&#13;
<p>Getting started is as easy as installing the node.js module:</p>&#13;
<blockquote>&#13;
<p>$ npm install -g yuidocjs</p>&#13;
</blockquote>&#13;
<p>and generate your docs with</p>&#13;
<blockquote>&#13;
<p>$ yuidoc .</p>&#13;
</blockquote>&#13;
<p>The syntax for documenting your code is similar to what you may already know from tools like JavaDoc, Doxygen, et. al. <a href="http://yui.github.com/yuidoc/syntax/index.html">See the reference here.</a></p>&#13;
&#13;
<p><strong>YUIDoc server auto-regenerates the docs while you develop</strong></p>&#13;
<p>The nastiest part, during the development, ist the need to regenerate the docs, whenever you change something. YUIDoc is nice enough to provide a server, that automatically regenerates the docs for you, when your files change. This way, you just need to refresh the page in your browser to see the latest changes in the docs.</p>&#13;
<p>You can start the server with</p>&#13;
<blockquote>&#13;
<p>$ yuidoc --server .</p>&#13;
</blockquote>&#13;
<p><a href="http://yui.github.com/yuidoc/args/index.html#server">See the manual for more.</a></p>&#13;
&#13;
<p><strong>Optionally show private, protected or deprecated docs as well</strong></p>&#13;
<p>Despite the fact, that the documentation says that private documentation is not displayed, you find a checkbox in the generated HTML documentation, that allows you to also display private, protected or deprecated documentation blocks.</p>&#13;
&#13;
<p>All in all, an easy to use tool that makes documenting your code less painful and produces use- and beautiful documentation for your Javascript code.</p> 