{
  "title": "Why you shouldn't buy a Canon scan/print combo as a Linux user",
  "date": "2012-07-16 12:58:33 GMT"
}

---

#Why you shouldn't buy a Canon scan/print combo as a Linux user
<p><strong>Preface</strong></p>&#13;
<p>I love Linux.</p>&#13;
<p>Of course, you need to invest time and patience to get things to work for once.</p>&#13;
<p>But you can dive into everything and tinker with it until it works the way you want!</p>&#13;
&#13;
<p><strong>Canon - something I used to like</strong></p>&#13;
<p>I <em>had</em> a good opinion about Canon. I had HP, Brother, Canon and Epson printers and Canon had a decent performance, cheap ink and long-living printers.</p>&#13;
<p>So, after having had an HP printer (which worked remarkably well with Debian! And the support was quick and helpful), I decided my next printer should be a Canon.</p>&#13;
<p>I got a MG3150, which is a Print/Scan/Copy combo with Wifi.</p>&#13;
<p>I set it up on my Macbook - very easy. I set it up on Windows - works like a charm.</p>&#13;
<p>And I tried it with Linux...</p>&#13;
<p><strong><br /></strong></p>&#13;
<p><strong>Half assed things</strong></p>&#13;
<p>To my joy I found that the Canon printer promoted LPD to the Network on the usual port 515/tcp and I could just add it to CUPS. Oh the love and glory!</p>&#13;
<p>But it didn't quite work with all the Foomatic and Gutenprint drivers I tried.</p>&#13;
<p>So I went to the Canon download page of Germany. Nothing there. Not that only the Linux drivers were missing - <strong>THERE WAS SIMPLY NOTHING</strong>.</p>&#13;
<p>Some googling brought up a driver on the <strong>Canon Japan page.</strong></p>&#13;
<p>Seriously, Canon, WTF?</p>&#13;
<p>Okay - printing worked now! Woohoo! But what about scanning?</p>&#13;
&#13;
<p><strong>Scanning - the top secret thing!</strong></p>&#13;
<p>And again I was cheerful: I found libsane-pixma for using SANE with pixma devices over their weird BJNP protocol. Wohooo!</p>&#13;
<p>BJNP usually seems to use the port 8612. Usually. My scanner did not.</p>&#13;
<p>I tried portscanning: Nothing. Fuck!</p>&#13;
<p>So I would only have the choice of sniffing <strong>ALL OF THE FUCKING NETWORK TRAFFIC</strong> using Wireshark or something alike.</p>&#13;
<p><strong><br /></strong></p>&#13;
<p><strong>Unsupportive support</strong></p>&#13;
<p>I thought: Well, technically this is not a Linux or driver issue. They could just ask their tech-guys or look into their tech specs to find the port for my model. Easy, right?</p>&#13;
<ul><li>So I asked the german support! I wrote a nice email, telling them that I wanted to know the network port BJNP runs on for my device.</li>&#13;
<li>They told me, that they don't support Linux. OH COME ON!</li>&#13;
</ul><ul><li>I wrote another nice email, telling them that this is not a Linux issue and I would be very happy, if they would just poke one of the Tech guys for the port number.</li>&#13;
<li>They told me, that the port is build from the driver.</li>&#13;
</ul><ul><li>So I wrote another patient email, telling them that I don't want the virtual local port the driver creates, but the plain network port on the device-side.</li>&#13;
<li><strong>They told me that this is confidential information of Canon Japan.</strong></li>&#13;
</ul><p>After having laughed about so much stupidity, I wrote a last email, telling them that this is ridiculous and that it would've been easier for them and me, to just look at the tech-manual.</p>&#13;
<p><strong><br /></strong></p>&#13;
<p><strong>The answer to life, the universe and everything</strong></p>&#13;
<p>The best thing of all this is the actual answer: <strong>8945</strong>.</p>&#13;
<p>Those four digits would've been enough to make me a completely happy customer - and if they wanted, they could've put that online in their FaQs and everyone would see that they're one of the few awesome, linux-friendly hardware manufacturers!</p>&#13;
<p>Instead of that, I wrote about 5 emails and at the end of the day needed to fire up Wireshark and find a matching filter to get that number my self. </p>&#13;
<p>The next time I will spend money on some print/scan hardware it will be another company, for sure.</p> 