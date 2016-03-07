{
  "title": "AppFog and Heroku - web app cloud hosting",
  "date": "2012-09-25 13:48:00 GMT"
}

---

#AppFog and Heroku - web app cloud hosting
<p>Nowadays it is really easy to get your web app online, thanks to one of the many different cloud providers.</p>&#13;
<p>Many of them offer free plans: Heroku, Nodester or Meteor for example.</p>&#13;
<p>Some of them, like Nodester and Meteor, are specialized on a single technology - for Nodester that is Node.js and for Meteor it is meteor.js.</p>&#13;
<p>Heroku and AppFog on the other hand offer different technologies to be run on their platforms.</p>&#13;
<p><strong><a href="http://www.heroku.com">Heroku</a></strong></p>&#13;
<p>Heroku has been around for 5 years now and started as a cloud hosting platform for Ruby.</p>&#13;
<p>It quickly gained a lot of attention and users, because Heroku made it really easy to set up and deploy web apps: To set up a new application on heroku, a command line tool can be used, deployment is done by simple pushing to the heroku remote via Git.</p>&#13;
<p>As of now it supports Ruby, node.js, Python, Java, Scala, Clojure and sort of PHP.</p>&#13;
<p>Heroku supports the following database systems: Membase, Cloudant, Postgres, MogoDB and Redis.</p>&#13;
<p>It has a free plan to get started with a database of max. 10k lines, scaling can easily be done via the web interface but has to be paid for.</p>&#13;
<p><strong><a href="http://www.appfog.com">AppFog</a></strong></p>&#13;
<p>I came across AppFog in its early beta stage, where PHP was the primary platform they supported.</p>&#13;
<p>Just last week I decided to give it another go, as I have been transitioning away from PHP.</p>&#13;
<p>Nowadays AppFog supports a large number of languages:</p>&#13;
<p>Ruby, PHP, Python, Java, .NET and they come with a bunch of <a href="http://www.appfog.com/products/appfog/jumpstarts/">"jumpstart" application templates</a> for Rails, Sinatra, Flask, Django, express.js, Drupal, Wordpress, Grails, Spring and node Chat.</p>&#13;
<p>You can use MySQL, Postgres and MongoDB.</p>&#13;
<p>The free plan includes <em><strong>(</strong><strong>Correction: not 200 MB but)</strong></em> <span>2 GB of RAM and max. 1 GB Database for an unlimited number of apps.</span></p>&#13;
<p><strong>Summary</strong></p>&#13;
<p>Heroku is the old master - being around since 2007 it proved to be reliable. The web- and command line interfaces are pretty helpful and deployment via "git push" is quick and easy. As far as I know though, you need a Git repository to deploy your app easily, which is a downside if you are working with a Subversion or Mercurial repository.</p>&#13;
<p>AppFog on the other hand is version control system agnostic. It works even without any VCS (havin no VCS is a really bad idea, though).</p>&#13;
<p>The jumpstart applications are really interesting, if you quickly want to get something running or prove some concept (e.g. for <a href="http://www.extremeprogramming.org/rules/spike.html">technical spikes</a>) or if you're too lazy to set up all the stuff yourself.</p>&#13;
<p>I would suggest to give both of them a try to see what better fits your specific needs, but both platforms are good at what they do.</p> 