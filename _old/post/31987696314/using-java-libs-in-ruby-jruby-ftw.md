{
  "title": "Using Java-Libs in Ruby: jRuby ftw!",
  "date": "2012-09-21 15:49:38 GMT"
}

---

#Using Java-Libs in Ruby: jRuby ftw!
<p>We have some Grails project we're going to migrate to Ruby over the next months.</p>&#13;
<p>But - of course - we have a tight release schedule as well.</p>&#13;
<p><strong>So how to switch the language and still be able to ship on time?</strong></p>&#13;
<p>In our particular scenario the answer is: We stick with the Java-Libraries the Grails project uses (3rd party stuff) and compile some basic, lower level stuff of the Grails app into JARs as well and use them from Ruby.</p>&#13;
<p><strong>Using JAR libraries from Ruby? Yep, that is possible with jRuby.</strong></p>&#13;
<p>See an example:</p>&#13;
<ul><li><a href="https://gist.github.com/3762089">sample Java library</a></li>&#13;
<li><a href="https://gist.github.com/3762229">sample Ruby code</a></li>&#13;
<li>sample output</li>&#13;
</ul><p>As the example shows, the Sample Java Library even has a dependency to org.json.jar which can be handled as well by JRuby.</p> 