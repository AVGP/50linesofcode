{
  "title": "Iron+linux and blocking ads",
  "date": "2010-09-20 14:09:00 GMT"
}

---

#Iron+linux and blocking ads
<p><strong>[See below for update!]</strong></p>&#13;
<p>After having used Firefox for many years, I had some problems with it in the last few months.</p>&#13;
<p>It needed ages to start, crashed several times per hour, I had many issues with Flash, no matter what plugin I tried and it took a huge amount of memory and cpu cycles.</p>&#13;
<p>This was the reason I switched to Opera. With spare improvements: Opera crashed several times per day (sad to say this was an improvement!), the Flash issues kept going on and it also wasted a lot of memory.</p>&#13;
<p>Then, a week ago, I tried <a title="Iron" href="http://www.srware.net/en/software_srware_iron.php">Iron</a>. I need to say: It is perfect for me.</p>&#13;
<p>Its really fast, its reliable (hadn't had <strong>any</strong> crash so far), extendable (through a really nice API!) and allows me to comfortably surf the net. Additionally Flash works without any problems.</p>&#13;
<p>Although, there was a problem: The integrated adblocker did not work for me.</p>&#13;
<p>I followed the instructions, but with no effect.</p>&#13;
<p>If any of you encounter this, using Iron under Linux, I developed a small ad blocker extension, as the AdBlocker-Extension for Iron needs at least version 6, while currently the most recent Linux version of Iron is 5.0.381.0. </p>&#13;
<p>You can find my extension <a title="NoAds" target="_blank" href="http://www.filer.net/get/f48e0aaddbefe57/file/NoAds.crx">here</a>. It catches a fair amount of ads already, but if you like to, you may tell me (using "Inspect Element" from the context-menu) what code the ad used and I may extend the blacklist.</p>&#13;
<p>You should be abled to do it on your own, I guess. Just edit the blacklist.js situated in the extension's directory (at the moment I don't know WHERE this is :D)</p>&#13;
<p>It allows you to switch it on or off, whenever needed and works pretty nice for me.</p>&#13;
<p>I hope that its useful for you :)</p>&#13;
<p>Hang on,</p>&#13;
<p>0x86</p>&#13;
<p><strong>Update:</strong></p>&#13;
<p>I noticed I had some alert() call in code, which has been debug-code. I am sorry!</p>&#13;
<p>If you encounter dialogs popping up, stating some numbers, then you encountered exactly <em>that</em> piece of code ;) Just download the new version [link above is updated] and the problem is solved :)</p> 