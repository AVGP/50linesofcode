{
  "title": "Why I don't care, that you use Ember",
  "date": "2013-02-11 06:25:27 GMT"
}

---

#Why I don't care, that you use Ember
<p>Recently on HackerNews, Robin Ward explains <a href="http://eviltrout.com/2013/02/10/why-discourse-uses-emberjs.html">why Discourse uses Ember.js</a>.</p>
<p>In the first part he describes, why Javascript client-side MVC is a good thing - and boy, kudos for that, he's right there.</p>
<p>In the second part however, he explains why they chose Ember from the giant jungle of framework choices out there.&nbsp;<span>And having evaluated Ember, Knockout, Backbone and Angular, I disagree.</span></p>
<p>The very first example of Angular.js he shows, is Transclude. One of the far more advanced features. What he doesn't tell you about are <a href="http://angularjs.org/#hello-html">the really simple</a> <a href="http://angularjs.org/#todo-html">examples</a> of the documentation, <a href="http://angularjs.org/#project-html">including one typical project</a>, you find right on the homepage of Angular.</p>
<p>It's easy as one two three and took a job applicant with little JS experience <strong>a few minutes</strong> to get started with it.</p>
<p>Tell me, what's complicated here.</p>
<p></p>
<blockquote>
<p><span>it is important to me that the Ember community didn&rsquo;t spring out of a corporate sponsorship</span></p>
</blockquote>
<p>Fine. But this, to me, is not a valid argument. This is blah-blah. Google backs Angular.js. While Yehuda Katz is a great guy with a great track record in Open Source, some people consider Google "the internet".</p>
<p>There are only a few bigger players out there - and as Angular is open source, you can pick it up and do whatever you feel like with it, if Google abandons it (pssh, as if) or develops it in a direction you dislike. Stop bitching about rockstar people or "corporate is bad, mhkay?". I wanna get a job done and Angular.js does this pretty well.</p>
<p>Plus: When I went to StackOverflow a few months ago because I had a few problems, there was one (in numbers "1") thread for one of them. One. With no answers. The rest was fishing in the dark. Is that an "excellent support of the community"? For Angular I only had to look something up once. And found a lot of support activity in various channels.</p>
<p>This may have changed, as Ember.js is moving forwards, but Angular was at that point already and is moving forwards in a very fast pace as well.</p>
<p>Another thing that is only marginally mentioned, is the fact that Angular.js uses vanilla-style Javascript and the DOM in a pretty normal fashion. No fancy-pants .extend() stuff, no class-hierarchy magic. No "attr()" or set()/get() stuff. Just plain JS ala "$scope.blah = 123". That's it.</p>
<p></p>
<p>Also, you can comfortably consume APIs of different flavors.</p>
<p>Is it proper REST? Yay, just throw in the ngResource!</p>
<p>Oh its unRESTy? Well, just throw in ngResource with adapted methods or use $http. Quick&amp;easy. No tears.</p>
<p></p>
<p>Even if this article may sound a little harsh and rant-y, I think Ember.js is nice. But looking at it from a more practical perspective (e.g. having developers that are familiar with "the good ole Javascripte" vanilla JS and HTML, as well as having to deal with complex systems and non-REST APIs) Angular.js comes at lower cost when it comes to adoption and producing most of the web applications, you wanna build these days (and possibly tomorrow).</p>
<p></p>