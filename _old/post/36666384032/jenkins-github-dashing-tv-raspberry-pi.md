{
  "title": "Jenkins+Github+Dashing+TV+Raspberry Pi = Project-Cockpit",
  "date": "2012-11-27 15:00:29 GMT"
}

---

#Jenkins+Github+Dashing+TV+Raspberry Pi = Project-Cockpit
<p>In our office we had a spare TV and wanted to use it as an information radiator in our room.</p>&#13;
<p>As our setup involves <a href="http://www.github.com">Github</a> where pull requests are built with <a href="http://www.jenkins-ci.org">Jenkins</a> to verify everything is working as expected, I wanted to put the success rate of the builds, the build health and the latest open pull request on the screen.</p>&#13;
<p>The screen is hooked up to a <a href="http://www.raspberrypi.org/">Raspberry Pi</a>, so I had a vast amount of possibilities to get something on screen.</p>&#13;
<p>After having a look at <a href="http://shopify.github.com/dashing/">Dashing</a>, I decided to go for it and build the <a href="https://github.com/martin-naumann/project-cockpit">project-cockpit</a> project on top of it.</p>&#13;
<p>It uses the Jenkins API to get the ration of successful / non-successful builds as well as the latest build state. It also calls the Github API to get the latest pull request to display the name and picture of the author and the title of the pull request on the dashboard.</p>&#13;
<p>This is how it looks like in action:</p>&#13;
<p><img align="middle" height="271" src="https://lh4.googleusercontent.com/-Pe4lcw10vLI/UK-kqsgpn4I/AAAAAAAADVg/V7LGuSXl80s/s1158/IMAG0459.jpg" width="480" /></p>&#13;
<p>In case the latest build is broken, it plays a Youtube Video of an exploding nuclear bomb.</p>&#13;
<p>The next step will be to show the JIRA tickets in the different stages (open, in progress, done).</p> 