{
  "title": "ascii.io - record your terminal and share the record",
  "date": "2012-09-17 13:52:41 GMT"
}

---

#ascii.io - record your terminal and share the record
<p>Screencasts are somewhat popular for a while now.</p>&#13;
<p>Often I see people casting their terminal session to illustrate how to do something fancy on their terminal or show how to set up complicated things.</p>&#13;
<p>The problem with this is, that with classical screensharing tools you usually have to choose between a high-enough quality to allow your audience to actually read what you hack into your console and a reasonable file size.</p>&#13;
<p>This is made even worse by the fact that a lot of free tools limit you in the size or the quality of the recorded video (Did you know that you may use Quick Time Player on OSX or VLC on Windows or Linux to do it?).</p>&#13;
<p>Sometimes it is even a problem of uploading and sharing the video after recording it, as upload may take ages when the quality needs to be sufficiently good.</p>&#13;
<p><strong><a href="http://ascii.io">Ascii.io</a></strong></p>&#13;
<p>When you want to do a screencast from your terminal as the only content, there is a great and wonderful solution to all the hassle: <a href="http://ascii.io">ascii.io</a> can be installed by just running a single line in your terminal:</p>&#13;
<blockquote>&#13;
<p>curl -sL get.ascii.io | bash</p>&#13;
</blockquote>&#13;
<p>afterwards you can start your recording by running asciiio in your terminal:</p>&#13;
<blockquote>&#13;
<p>martin@magrathea:~$ asciiio</p>&#13;
<p>~ Asciicast recording started. Hit ^D (that's Ctrl+D) or type "exit" to finish.</p>&#13;
<p>martin@magrathea:~$ &lt;this is recorded&gt;</p>&#13;
<p>~ Asciicast recording finished.</p>&#13;
<p>~ Do you want to upload it? [Y/n]</p>&#13;
<div>martin@magrathea:~$</div>&#13;
</blockquote>&#13;
<div>Ascii.io allows you to directly upload your fresh record to their servers - you only have to pass around the link to it.</div>&#13;
<div>This came in handy to me recently and I guess you could have a lot of fun with it.</div> 