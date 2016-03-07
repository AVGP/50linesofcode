{
  "title": "A really, really simple static site generator",
  "date": "2014-05-13 11:00:00 GMT"
}

---

#A really, really simple static site generator
When I asked for suggestions what **simple** tool I should use to generate static HTML pages from Markdown files, the answer I got mismatched in the definition of simple - and that mad me sad.

**TL;DR**: All the static site generators I found are pretty heavy in terms of dependencies and ship with a lot of things I don't need, so I created [Susi](https://github.com/avgp/susi) - a really simple, 67 lines node.js based site generator. Give it a go if you want something **truly simple**.

## A simple job
I wanted to get a super stupidly simple job done quickly:

Compiling a few markdown files into HTML, using a shared HTML skeleton around it.

## Static Site Generators
That is exactly the domain of static site generators - but there's [a ton of them](http://staticsitegenerators.net/) - and even the ["Top list"](http://staticgen.com/) counts a whopping 26 of them.

And all of them appear to come with **lots of stuff I don't need at all**, such as:

- Templating languages such as ERB, Jade or Handlebars
- Preprocessors like Coffeescript, Sass, Less or Compass
- Build tools like Grunt or Gulp

which is fine, if you need some more complex stuff - **but I just want to parse some Markdown into HTML and put a static template around that**.

## Susi, oh Susi...
So I got fed up with all those feature-laden tools and decided to figure out what is really essential: **Parsing markdown into HTML and putting it in a template** - the result is [SuSi](https://github.com/avgp/susi).

I used it to revamp the content on [my website](http://www.geekonaut.de) and it **only has two dependencies** which are Node.js (because it's a node.js tool) and [Marked](https://github.com/chjj/marked) to parse the markdown files.

The whole [source code](https://github.com/AVGP/susi/blob/master/susi) counts **61 lines**. That's pretty small and simple.

That's it.

And here's is how a tiny demo:
![](https://googledrive.com/host/0B9MEoZDi5-peRTF3WE0tQmhIT0U/SuSi.gif)