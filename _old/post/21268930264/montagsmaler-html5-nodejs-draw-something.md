{
  "title": "Montagsmaler - HTML5 / node.js "Draw something" clone",
  "date": "2012-04-17 14:54:21 GMT"
}

---

#Montagsmaler - HTML5 / node.js "Draw something" clone
<p><strong>Abstract</strong></p>&#13;
<p>I wasn't happy with the flash-based "Draw my thing" and built my own version with node.js, HTML5 an socket.io and deployed it on <a href="http://www.nodester.com/">nodester</a>. Its <a href="https://github.com/AVGP/Montagsmaler" title="Montagsmaler on GitHub" target="_blank">open source</a>. You can play it <a href="http://montagsmaler.nodester.com" target="_blank">here</a> or on <a href="https://apps.facebook.com/fbmontagsmaler">Facebook</a>.</p>&#13;
<p>It works on modern browsers and I tested it with Android Opera Mini and the Android browser, too.</p>&#13;
<p>Here is the whole story:</p>&#13;
&#13;
<p><strong>First, I got pissed off...</strong></p>&#13;
<p>Some weeks ago I came across <a href="http://www.omgpop.com/games/drawmything" target="_blank">"Draw my thing"</a> (via the app version "Draw something"). I like it and my girlfriend and I wanted to play it together. When I was on my phone and she was on her laptop, we wanted to start. "Its the same game vendor (OMGPop) and its the same thing. Should work, I guess" way my initial thought. It didn't. "Draw something" and "Draw my thing" - while being named similarily and utilizing the same game principle, it was not possible to play together using both versions.</p>&#13;
<p>"Meh, okay - I just get my laptop and use that.", I continued. Nevertheless, being flash-based it was pretty slow on my laptop (which is now 4 years old...) and even when trying to play together it was a bad user experience ("Okay, now I'll send you this game's link via google talk and then you open it in your browser" "But I am already on OMGpop in the "Draw my thing" screen. Can't I just get a notification or something?"... and it never really worked to play this game together.</p>&#13;
<p>So I rebuild it with HTML5, node.js and socket.io</p>&#13;
<p>"Come on, that can't be THAT hard!" went through my head. And so I started.</p>&#13;
<p>I used an HTML5 canvas element, <a href="http://socket.io/" target="_blank">socket.io</a> and node.js for the whole thing.</p>&#13;
<p>When the first player connects, she sees "Waiting for other player" until a second player connects. The two then get in the game, they can save and share their drawings and the game ends, when one of the players disconnect.</p>&#13;
<p>My experience</p>&#13;
<p>It was all so easy and works like a charm. It even works on my Android phone - I just had to write a little wrapper for touch-events.</p>&#13;
<p>The server code is 119 lines Javascript (node.js / socket.io), the client-logic is 195 lines javascript and a bit HTML / CSS.</p>&#13;
<p>I made this open-source, you can <a href="https://github.com/AVGP/Montagsmaler" target="_blank">find it on GitHub</a>.</p>&#13;
<p>The deployment with <a href="http://www.nodester.com">nodester</a> was simple, easy and awesome.</p> 