{
  "title": "Matrix.js - fancy background with JS and CSS",
  "date": "2012-01-30 13:02:05 GMT"
}

---

#Matrix.js - fancy background with JS and CSS
<p>Some days ago I wrote a little script to create a animated, matrix-alike background using CSS and JS.</p>&#13;
<p>If you want to see how that could look, visit <a href="http://www.geekonaut.de" target="_blank">geekonaut.de</a>.</p>&#13;
<p>It works by prepending a number of divs containing a number of spans. Each span holds either a "0" or a "1" (chosen by random). The number of divs and spans depends upon window size.</p>&#13;
<p>Additionally a window.setInterval is set up to randomly choose one of the spans to change it's content to 0 or 1 (random again) and brighten the color. Plus: It checks, that every 50 times this happens, the first number that is still brighter is reset to the original color.</p>&#13;
<p>You find the matrix.js and the css-definition for it on <a href="https://gist.github.com/1701563" target="_blank">gist</a>.</p> 