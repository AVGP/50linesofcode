{
  "title": "Print via Wifi with Canon on Debian / Ubuntu",
  "date": "2012-07-10 13:56:00 GMT"
}

---

#Print via Wifi with Canon on Debian / Ubuntu
<p>Today I got a Canon MP3150 printer/scanner.</p>&#13;
<p>As we have multiple computers to access the printer from, I set it up for use via Wifi.</p>&#13;
<p>Setting up the printer for Windows and MacOS worked like a charm - while Linux refused to work at first.</p>&#13;
<p><strong>CUPS</strong></p>&#13;
<p>I used CUPS for years now. Back in 2008 I had an HP printer hooked up to the network and it worked flawlessly. I also added a PDF-printer back then, which comes in handy from time to time.</p>&#13;
<p>CUPS also supports IPP and LPD out of the box.. pretty much.</p>&#13;
<p>Canon screwed it up</p>&#13;
<p>I started setting up my linux machine for printing with simply pinging the printer and checking, which protocols are enabled.</p>&#13;
<p>Besides HTTP (which only gives a rarely useful interface) there was a running LPD on the usual port 515.</p>&#13;
<p>Well, that looked good!</p>&#13;
<p>I started setting up the printer. First question: Is there a specific queue name I have to use? After searching for a way to find out (including reading the fucking RFC for LPD) I just gave up and decided to go without a queue name.</p>&#13;
<p>Next up was the driver selection. No driver seemed to match my model, so I tried a generic Foomatic and Gutenprint. Without success. Shit.</p>&#13;
<p>This was especially weird, because it worked with MacOS (which is a CUPS system basically) and had dedicated drivers for OSX to download.</p>&#13;
<p>But no download for linux.</p>&#13;
<p><strong>Asian style</strong></p>&#13;
<p>Some folks at Canon thought it was a reasonable decision to put up linux drivers for the printer only on<a href="http://support-sg.canon-asia.com/contents/SG/EN/0100393702.html"> the asia website</a> while it was missing on the useless european download site. </p>&#13;
<p>Thanks a lot, Canon, for this great idea.</p>&#13;
<p>Final conclusion: It works. It works pretty well. But the folks at Canon are too lazy or too stupid to properly link their drivers and put a few facts (e.g. the BJNP port number) on their FaQ page to make Linux users happy. So they basically say "Fuck you" to Linux users - and that's why I say: "Fuck you" to Canon and will get my next Printer/Scanner from a more competent company.</p> 