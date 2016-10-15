<!-- HTML, DOM and JavaScript unraveled -->
# HTML, DOM and JavaScript - unraveled

## The web stack

The web platform has started out with HTML to allow users to share documents
and link them in a user friendly and standardised way.

HTML alone was lacking the possibility to influence the way things looked, so
a new standard came about ([after other alternatives have been proposed](https://eager.io/blog/the-languages-which-almost-were-css/)), CSS.

Around the same time (depending on what you consider the beginning of CSS's existence)
[JavaScript was created by Brendan Eich](https://www.w3.org/community/webed/wiki/A_Short_History_of_JavaScript)
and a few years later a way to interact with the HTML document from JavaScript was created, the [DOM](https://en.wikipedia.org/wiki/Document_Object_Model).

Today, the different technologies may be a little too much to take in at first
and it won't get easier as things such as the Shadow DOM is added and frameworks and libraries may bring a Virtual DOM along.

So let's dive right in an have a look at the different bits and pieces that are at play here.

## More than just text: HTML

The web was designed to exchange information over the internet in an open, standardised way.
Tim Berners-Lee designed it as a hypertext system, i.e. to be text along with semantic information (such as "this is an address" or "this is a listing").

The [original version](http://info.cern.ch/hypertext/WWW/MarkUp/Tags.html) was very limited (images, for example, were only introduced in [version 2](https://tools.ietf.org/html/rfc1866#section-5.10)), yet it paved the way for websites to be structured text which encoded structure and meaning along with text content.

HTML is basically the way we encode the way for the browser to make the website show up, such as an SVG is a file that contains instructions for the computer for drawing an image.

## The DOM: From hypertext to a tree

So assuming you are opening an HTML file with your browser, it will be opened as a bunch of text.
This text is not what is displayed by your browser - at least not directly.

Instead, the browser is figuring out the structure of the web page by turning the text into a hierarchy, usually visualised as a tree structure.

The markup is turned into a bunch of nodes with attributes and text content, which is used by the browser to show the page as we expect it.

The following HTML would be turned into the following tree structure:

```html
<html>
  <body>
    <h1>Hello world!</h1>
    <p>
      <a href="b.html">Click here</a>
    </p>
  </body>
</html>
```

<img src="/images/post-images/DOM.png" alt="The browser turns the HTML into a tree structure of elements, attributes and text">

So, in order to display an HTML file, the browser creates a tree of the elements (such as "link" or "image") along with their attributes (such as "where does the link go?" or "which image to display") and text content (e.g. "Click here").

## JavaScript

Until now, our website has been static and could not change after being loaded.

JavaScript, after being added into Netscape Navigator 2.0 and Internet Explorer 3 (named "JScript" there for trademark reasons),
became a way to interact with websites. These interactions, however, were browser-specific and worked very differently between different browsers. This is usually referred to as *dynamic HTML* or short "DHTML"

So JavaScript is a generic programming language that had access to APIs which allowed it to change the content and appearance of a web site.

Now this wasn't a very pleasant situation for developers and users. Some websites would only work correctly in one browser and others only in another. Unless developers took the effort to make it work in all browsers.

Luckily, the [W3C](https://w3.org) worked on a standardised API that should work across the different browsers, giving developers a unified way to access the DOM programmatically from JavaScript and make websites dynamic.

So we've got a programming language that, nowadays, is also available outside of the browser, but commonly uses the DOM-API to show results in a website by changing the DOM tree that the browser in turn uses to display content to the user.

## Summary: HTML, JavaScript and DOM

So we've got **HTML** to define structure and content of a website in text form.
This is a human-readable form that allows editing and transmitting the information, but not ready for displaying in a browser yet.

The browser then takes this text data and turns it into a tree structure called **DOM*.
This tree is useful for the browser to display the data to the user, using the elements, their attributes and text content.

To do things programmatically on a website, the browsers added a programming language called **JavaScript**.
As JavaScript runs in the browser, the most obvious way for it to display anything or get inputs from the user would be to change the DOM, so an API to the DOM was created. In the beginning each browser had their own API (usually referred to as DHTML) but later the W3C specified a shared standard API we usually refer to as the DOM when writing JavaScript.

## Bonus round: Shadow DOM and Shady DOM

The DOM and its API is nice to give us the power to change things around in an HTML document.
Unfortunately that can be a bit of an issue when we're not building a document, but a complex application.

In modern HTML applications, the HTML might look like this:

```html
<html>
  <body>
    <user-profile>
      <user-data username="Martin" avatar="avatars/123_martin.png" is-online="yes"></user-data>
    </user-profile>
    <conversations-list>
      <conversation-item with="Alice" is-unread="yes">Blog post feedback</conversation-item>
      <conversation-item with="Bob">Lunch tomorrow?</conversation-item>
    </conversations-list>
  </body>
</html>
```

"Wait", you may say, "those aren't HTML elements!". You are right, but frameworks such as Angular, Vue.js or Polymer enable this way of creating applications by implementing the [Web Components](http://w3c.github.io/webcomponents/explainer/) or their own component system.

Each of the components in the previous listing would in turn include HTML, CSS and JavaScript to create its own part of the final DOM, so let's say the `<user-profile>` component looks like this inside:

```html
<style>
h2 {
  color: darkgreen;
}
</style>
<div>
  <h2 id="username"></h2>
  <img id="avatar"></img>
</div>
<script>
// JavaScript to pull the avatar and username from the component attributes into this part of the DOM.
</script>
```

The final DOM tree that the browser will use to render the application would then look like this (some bits left out for brevity):

<img src="/images/post-images/DOM2.png" alt="The components are being substituted by their actually DOM content">

Now, this has a few problems:

* the CSS changes the appear in the DOM, so we will get all `<h2>` elements to show text in a `darkgreen` colour.
* if we would use multiple `<user-profile>` elements, we would have the same IDs multiple times, which is invalid.
* when we access the DOM via the various JavaScript-API methods (e.g. `document.querySelector` or `document.getElementById`), we could accidentally reach into the components and change things in parts of the DOM which should be "private" to the component.

The last point might seem a little odd at first, but imagine this document structure:

```html
<html>
<body>
  <user-profile></user-profile>
  <h1>News</h1>
  <p>Currently there are <span id="newscount"></span></p>
  <ul>
    <li><h2>Lorem ipsum</h2></li>
    <li><h2>Dolorem sit amet</h2></li>
  </ul>
</body>
</html>
```

Now somebody might to write some JavaScript to show the number of news articles by counting the `<h2>` elements on the page:

```javascript
var numNewsHeadlines = document.querySelectorAll('h2').length
document.getElementById('newscount').textContent = numNewsHeadlines
```

And, ladies and gentlemen, we've got a bug.
What doesn't meet the eye here is that the `<user-profile>` component is adding an `<h2>`-element when turned into its internal DOM. Sure, we can fix this, but should we have to pay attention to this?

I think it would be better if components could have a boundary that "hides" their guts from the rest of the DOM, so we don't accidentally peek behind the curtains.

Luckily there is! This is called the **Shadow DOM**.

It's an addition to the DOM-API that allows us to hide some part of the DOM tree from the DOM, so that CSS and the JavaScript-APIs are confined to a small part of the DOM tree.

<img src="/images/post-images/ShadowDOM.png" alt="The Shadow DOM allows to hide parts of the DOM tree">

How that works in detail can be read in [the W3C specification](https://w3c.github.io/webcomponents/spec/shadow/).
