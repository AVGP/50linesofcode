{
  "title": "Twitter API 1.1 responds with status 401, code 32",
  "date": "2012-11-29 15:00:38 GMT"
}

---

#Twitter API 1.1 responds with status 401, code 32
<p>For the impatient readers: If you run into this, try sending the POST params in the querystring instead of the body. This does not only apply to node.js twit, but is generally valid.</p>&#13;
&#13;
<p>The longer version:</p>&#13;
<p>I was playing around with <a href="https://github.com/ttezel/twit">twit</a> lately. It's a wonderful node module that allows you to interact either with the Twitter REST or the Streaming API in a very easy way, possibly the easiest way I've ever seen.</p>&#13;
<p>I tried to post a new Tweet saying "Hello World!" which didn't work.</p>&#13;
<p>The REST API responded with "Status 401, <span>Could not authenticate you" and I started googling.</span></p>&#13;
<p><span>The first hint that came up, was trying to use v1 instead of v1.1 of the API. This resolved the issue! But as v1 is going to deprecate soon, I didn't want to go that way, but find the root cause.</span></p>&#13;
<p><span>I ran the tests for twit and found, that it actually <em>was</em> abled to tweet. Even with v1.1.</span></p>&#13;
<p><span>The only difference was the text for the new tweet: The (successful) example from the tests did not contain an exclamation mark, while my (failing) example did.</span></p>&#13;
<p><span>So I removed the exclamation mark from my example - and it worked.</span></p>&#13;
<p><span>I looked through the many discussions of the "Code 32" issue on the Twitter developer portal and finally found </span>https://dev.twitter.com/discussions/11280 that answered this:</p>&#13;
<p>If you, for some reason, send the parameters for the POST via the querystring - instead of the "right way" for HTTP POST where the parameters go in the HTTP body - it works!</p>&#13;
<p>I changed that and it worked surprisingly well - my <a href="https://github.com/ttezel/twit/pull/26">pull-request</a> to twit is currently pending.</p> 