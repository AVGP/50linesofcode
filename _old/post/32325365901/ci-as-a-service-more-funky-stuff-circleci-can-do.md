{
  "title": "CI as a service: More funky stuff CircleCI can do",
  "date": "2012-09-26 12:53:21 GMT"
}

---

#CI as a service: More funky stuff CircleCI can do
<p>In my recent post about CircleCI I pointed out how easy it is to get started with Continuous Testing thanks to CircleCI.</p>&#13;
<p>After a few mails to and from the customer support (Thanks to <a href="http://twitter.com/paulbiggar">Paul Biggar</a> and <a href="http://twitter.com/arohner">Allen Rohner</a>!) I found out, you can do a lot more, than I suspected:</p>&#13;
<p><strong><br /></strong></p>&#13;
<p><strong>Deployment</strong></p>&#13;
<p>A vital part of fully leveraging Continuous Integration for me is being abled to automatically deploy (either to a live or a staging environment) what has been identified as a working build - or Continuous Deployment in shorter terms.</p>&#13;
<p>After browsing through the project settings and looking around in the platform, I only found a way to deploy to Heroku automatically and concluded, that other deployment strategies are not supported for now.</p>&#13;
<p>This is a case of RTFM, I have been stupid here: You can deploy anyway you want, <a href="https://circleci.com/docs/configuration#deployment">as the docs point out</a>.</p>&#13;
<p><strong><br /></strong></p>&#13;
<p><strong>API</strong></p>&#13;
<p>The curious child I sometimes am I wondered, if there is an API, like the Jenkins API, to have something on our wall displays, yelling at people if builds fail (as we have using the mentioned Jenkins API).</p>&#13;
<p>There are two ways of accessing the data from CircleCI:</p>&#13;
<ol><li><a href="https://circleci.com/docs/configuration#notify">A notification hook</a>: This is a URL in your control where CircleCI sends information about the project and its build state to (as JSON). You can put some server-side script there and do something with the data then.</li>&#13;
<li>An initial version of a REST API! This one is undocumented and pretty limited for now - but promising!</li>&#13;
</ol><div></div>&#13;
<p><strong>Github Commit Status API</strong></p>&#13;
<p>Github has published their "<a href="https://github.com/blog/1227-commit-status-api">Commit Status API</a>" which, to put it short, allows marking individual commits as "working" or "broken".</p>&#13;
<p>That Circle CI supports this is pretty fancy.</p> 