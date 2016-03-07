{
  "title": "circleci.com - Continuous Testing made easy",
  "date": "2012-09-24 12:55:21 GMT"
}

---

#circleci.com - Continuous Testing made easy
<p>Test-Driven-Development and Behaviour-Driven-Development are becoming more and more important and help with delivering better software quality in short release cycles.</p>&#13;
<p><strong><br /></strong></p>&#13;
<p><strong>Testing, testing, testing</strong></p>&#13;
<p>This means, that Unit tests or User acceptance tests must be run.</p>&#13;
<p>Automating those is not hard. There are a lot of tools for virtually every language you could pick.</p>&#13;
<p>To name a few: jUnit (or PHP Unit or Test::Unit or QUnit,...), Selenium (or RackTest or phantom.js,...) and Spec tools like RSpec or Behat or Cucumber or Jasmine.</p>&#13;
<p>Testing systems can be hard</p>&#13;
<p>The problem with all of them is: You have to run them after every change to the code. And you have to make sure, that the testing environment in which the tests are run is insulated from any tweaks you may have for your local machine (because those tweaks need to be applied to the production system as well and should be more-or-less automated). </p>&#13;
<p>So how to do to that with no hassle? Set up a Continuous Testing server.</p>&#13;
<p>You can do that using hooks of your version control system or using cronjobs to pull from the repository and run the tests. But that gets out of hand fast, because you have to take care of a bunch of things - proper cleaning and setup of databases, libraries, caches, temporary files, etc.</p>&#13;
<p>You can also automatically create and provision virtual machines - but that is a tricky task as well.</p>&#13;
<p>Using a full-blown Continuous Integration Server (Continuous Integration basically is continuous testing and deploying to production, when the all tests passed) like Jenkins.</p>&#13;
<p>But that requires some configuration and maintenance as well.</p>&#13;
<p><strong>CircleCI</strong></p>&#13;
<p>The easiest way was suggested to me by my good fellow <a href="http://twitter.com/igama">Marco</a> is <a href="http://www.circleci.com">circleci.com</a>.</p>&#13;
<p>You can sign up via GitHub and select your project(s) from GitHub that should be tested.</p>&#13;
<p>CircleCI takes care of the whole rest.</p>&#13;
<p>It will run your tests and notify you via email, if a test failed (and when it is fixed by a later commit).</p>&#13;
<p>It's really nice to work with it and makes continuous testing really, really easy!</p> 