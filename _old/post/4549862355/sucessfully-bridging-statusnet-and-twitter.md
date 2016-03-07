{
  "title": "Sucessfully bridging StatusNet and Twitter",
  "date": "2011-04-12 10:00:06 GMT"
}

---

#Sucessfully bridging StatusNet and Twitter
<p><strong>Preface:</strong></p>&#13;
<p>Some weeks ago, I <a target="_blank" href="http://houston.geekonaut.de">set up a local</a> <a href="http://status.net/open-source">StatusNet</a> server on my server.</p>&#13;
<p>StatusNet is an open-source, decentralized microblogging-platform like Twitter.</p>&#13;
<p>But you can host it on your own system, or just join a running one (for example the famous <a href="http://www.identi.ca">identi.ca</a>). The nice thing is: Whatever server you are registered to, you have the possibility to subscribe (which is the StatusNet equivalent of "following") to any user on any server. It doesn't matter if that user is on the same server or on any other, as long as its StatusNet.</p>&#13;
<p>This idea seemed shiny to me: I do not need to rely on <em>one </em>single point of failure (which we all know as the "failwhale") - if some server goes down, only the users registered there are affected. And if I want to make sure, I'm having the service available - I can host it on my own which makes <em>me</em> the one being responsible for the service available of my own account.</p>&#13;
<p>If some server may go down, a part of my subscribed users may not be able to update their status - but all the others not on that particular server still are.</p>&#13;
<p>Thus, the whole infrastructure is more reliable in general.</p>&#13;
<p>As I host my own StatusNet-Server (<a href="http://houston.geekonaut.de">here</a>, to mention again) I ran into a small issue, that took me some time and <a href="http://forum.status.net/discussion/1491/twitterbridge-only-imports-tweets-but-cannot-post-notices-to-twitter-solved">help</a> from the IRC and the forum to get it fixed.</p>&#13;
<p>This post should be a help for anyone encountering this...</p>&#13;
&#13;
<p><strong>The reality</strong></p>&#13;
<p>But here comes the twist: Many of the people, I'm interested in having status updates from <em>aren't on any statusnet-server</em>.</p>&#13;
<p>They're on twitter, mostly. And not only do I want to keep up with their updates - no! I also want to keep them up to date with my own updates.</p>&#13;
<p>Both of this should be possible without having to check&amp;post on twitter and statusnet simultaneously - here comes the nice thing: <strong><em>It is.</em></strong></p>&#13;
&#13;
<p><strong>The solution</strong></p>&#13;
<p>StatusNet ships with a Twitter-Bridge. You can import the twitter-timeline and you can make the system post your updates to twitter automatically. This was exactly, what I was looking for. I can use StatusNet, have people from other StatusNet-Servers subscribed directly, benefiting from the decentralized, open infrastructure and have the well-known functionality of twitter <em>inside,</em> without having the double effort.</p>&#13;
<p>So I configured it to do its task.</p>&#13;
<p>This is pretty easy. Just follow the README for that (situated in plugins/TwitterBridge/README) - et voilá - it imported my timeline like a cake.</p>&#13;
<p>Pretty! But trying to post to twitter from houston did not work!</p>&#13;
<p>To fix this, turn of the <em>queuedaemon</em>. and start daemons again. This fixed the issue for me.</p> 