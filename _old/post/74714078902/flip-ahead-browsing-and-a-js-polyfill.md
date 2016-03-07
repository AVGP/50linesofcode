{
  "title": "Flip Ahead browsing and a js polyfill ",
  "date": "2014-01-27 11:00:42 GMT"
}

---

#Flip Ahead browsing and a js polyfill 
<p dir="ltr">If you haven't heard of *flip ahead browsing* you are like me a few months ago. </p>
<p dir="ltr">Have you ever read a blog post or a multi page article on a website on a mobile device and felt the urge to just swipe and get to the next or previous post or page? </p>
<p dir="ltr">No, I don't mean navigating the browser history. I talk about coming to a website for the first time and wanting to get to the next (or previous) logical content, such as the following blog post or page two of the great article you're reading... </p>
<p dir="ltr">I did feel that urge. It feels natural to "turn the page" by swiping. </p>
<p dir="ltr">To my surprise, the Internet Explorer has this feature, called "flip ahead browsing". If a website, say your blog, supports it and I swipe on a page, it takes me to the URL the page author deems logically "next" or "previous". </p>
<p dir="ltr">When I revamped [Geekonaut] (http://geekonaut.de), I implemented flip ahead browsing, so people can swipe to reach the next or previous section, according to main navigation order. </p>
<p dir="ltr">Implementing it is extremely simple and a no-brainer to me:</p>
<p dir="ltr">&nbsp;&nbsp;&nbsp; &lt;link rel="next" href="..." /&gt;<br>
&nbsp;&nbsp;&nbsp; &lt;link rel="prev" href="..." /&gt;</p>
<p dir="ltr">I wonder why Internet Explorer is apparently the only browser that implements this. </p>
<p dir="ltr">Having tried it on a tablet my only concern is, that it clashes with the normal horizontal scrolling and that may be bad. </p>
<p dir="ltr">I agree with the idea of a colleague of mine that it would be good to establish a new convention to use a two-Finger swipe to use this form of navigation. </p>
<p dir="ltr">For this,, I built [a simple Javascript library](http://github.com/AVGP/flipAhead.js) that uses the same link syntax but a two-finger swipe to provide flip ahead browsing. </p>
<p dir="ltr">I am, still, not sure if the gesture is obvious or natural enough or if the education is worth the hassle. </p>
<p dir="ltr">I would love your feedback on this. </p>
