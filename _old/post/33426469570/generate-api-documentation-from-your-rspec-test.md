{
  "title": "Generate API documentation from your RSpec test cases",
  "date": "2012-10-12 12:57:22 GMT"
}

---

#Generate API documentation from your RSpec test cases
<p>Writing API docs can be tedious work, especially when your API is under active development.</p>&#13;
<p>New methods are added frequently and from time to time an existing method changes slightly - writing and adapting the docs may slow down your pace.</p>&#13;
<p><strong>Automate your API documentation</strong></p>&#13;
<p>If you are using RSpec for your tests, you will love the <a href="https://github.com/zipmark/rspec_api_documentation">rspec_api_documentation</a> gem!</p>&#13;
<p>It brings in an additional DSL to RSpec, so that you can write test cases with example request and parameter documentation and automatically transfer them into very neat API docs.</p>&#13;
<p><strong>Automated awesomeness</strong></p>&#13;
<p>The resulting API docs are well-structured, comprehensive and extensive, <a href="http://rad-example.herokuapp.com/docs">as seen in this example</a>.</p>&#13;
<p>As a Bonus, the docs can also be delivered in text form through Curl requests and as a super bonus you can have a <a href="https://github.com/tildewill/wurl">Wurl</a> API playground inside your docs to try out your API (see below).</p>&#13;
<p><img align="middle" height="237" src="http://i.imgur.com/EWkCm.png" width="490" /></p>&#13;
<p>To get all this, you just need to run "rake docs:generate", which also runs the test cases your API docs are build upon!</p> 