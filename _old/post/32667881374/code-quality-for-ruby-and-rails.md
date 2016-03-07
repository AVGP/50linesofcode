{
  "title": "Code quality for Ruby and Rails",
  "date": "2012-10-01 14:14:42 GMT"
}

---

#Code quality for Ruby and Rails
<p>When you write web applications with Ruby and Rails, you may be already pretty happy about the amount of tooling you have there: <a href="http://rspec.info/">RSpec</a>, <a href="http://cukes.info/">Cucumber</a>, <a href="https://github.com/jnicklas/capybara">Capybara</a> and many, many more.</p>&#13;
<p><strong><br /></strong></p>&#13;
<p><strong>Interesting things first: The toolset for ruby QA</strong></p>&#13;
<p>The first tool you will want to have a look at, if you're writing Rails applications is the <a href="https://github.com/railsbp/rails_best_practices">rails_best_practices gem</a> or <a href="http://railsbp.com/">their neat web</a> service to check your Rails app for accordance with the best practices the project collects for Rails. The web service makes it especially easy as long as you have a (public or private) repository on GitHub.</p>&#13;
<p>That one is easy to use and pretty useful to maintain the basic style, but for a deeper analysis there is <a href="https://github.com/simplabs/excellent">excellent</a>, which looks for a bunch of code smells (aka "nasty lines") in your source files.</p>&#13;
<p>Also useful (but I haven't tried them yet): </p>&#13;
<ul><li><a href="https://github.com/martinjandrews/roodi">Roodi</a> which resembles PMD - a code smell detector. It has a a broader ruleset compared to excellent, though it was broken when I installed it.</li>&#13;
<li><a href="https://github.com/seattlerb/flog">Flog</a> - scores your code based upon an <a href="http://c2.com/cgi/wiki?AbcMetric">ABC metric</a>. The produced score seems quite abstract and is hard to relate to.</li>&#13;
<li><a href="https://github.com/troessner/reek">Reek</a> is another code smell detector, like Roodi. It works good but has a <a href="https://github.com/troessner/reek/wiki/code-smells">limited catalog of checks</a> at the time of this writing, like excellent.</li>&#13;
</ul>&#13;
<p><strong>Style guides, best practices and standards</strong></p>&#13;
<p>The tools usually are using Coding Standards for the given languages to tell "good" and "bad" apart.</p>&#13;
<p>For Ruby those standards are still emerging so there is nothing official yet, however there is a bunch of <a href="http://rails-bestpractices.com/">Best Practices for Rails</a> and the Excellent project has some <a href="https://github.com/simplabs/excellent/wiki">code smell checks</a> on their wiki and a lot of different guides:</p>&#13;
<ul><li><a href="http://pub.cozmixng.org/~the-rwiki/rw-cgi.rb?cmd=view;name=RubyCodingConvention">Ruby Coding Conventions</a></li>&#13;
<li><a href="https://github.com/bbatsov/ruby-style-guide">Ruby Style Guide</a></li>&#13;
<li><a href="http://www.caliban.org/ruby/rubyguide.shtml">Unofficial Ruby Usage Guide</a></li>&#13;
</ul>&#13;
<p><strong>Different languages, different tool chains - excursion: QA in PHP/Java</strong></p>&#13;
<p>When you come from the Java or the PHP world, you will recall tools like Coverty or Sonar, PMD, CheckStyle and FindBugs.</p>&#13;
<p>These are static code analysis tools - and they're not limited to static languages, because they're based on the source code (which may let them miss out some stuff that happens dynamically though). For PHP those tools can be found combined in the <a href="http://phpqatools.org/">PHP QA Toolchain</a>.</p> 