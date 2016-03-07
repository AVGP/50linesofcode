{
  "title": "Roll your own video-on-demand server with vlc and vodca",
  "date": "2012-05-29 12:59:28 GMT"
}

---

#Roll your own video-on-demand server with vlc and vodca
<p><strong>Preface: Why?</strong></p>&#13;
<p>I like to watch videos when I am getting bored or when I am alone.</p>&#13;
<p>We have a bunch of DVDs and even some blurays staying in the shelf here.</p>&#13;
<p>But I mostly want to watch them when I am not home: When I am on a business trip, when I visit my relatives, etc.</p>&#13;
<p>In all these cases I have some spare time and an internet connection. But not all of the DVDs. Or only some of them. Or I have to carry a disk or usbstick or flash card with me. But usually I don't want to carry them with me or simply forget them.</p>&#13;
<p>So why not put them on my server and stream them from there?</p>&#13;
<p><strong><br /></strong></p>&#13;
<p><strong>VLC as the streaming server</strong></p>&#13;
<p><strong><br /></strong><a href="http://www.videolan.org/vlc/">VLC</a> is a very popular, open source media player - but it is more than just that: I is also capable of acting as a <strong>streaming server</strong>!</p>&#13;
<p>When you want to use it, you can use the <a href="http://wiki.videolan.org/Control_VLC_via_a_browser">HTTP web interface</a> (<a href="http://web.ggpi.org/doc/vlc/stream/ch05.html">using the VLM interface</a>) or the telnet interface:</p>&#13;
<blockquote>&#13;
<p>vlc -I telnet</p>&#13;
</blockquote>&#13;
<p>You can log in using "telnet localhost 4212" - the default password is "admin".</p>&#13;
<p>With the following command you can add a new on-demand stream:</p>&#13;
<blockquote>&#13;
<p>new Test enabled input "/path/to/some/file.avi"</p>&#13;
</blockquote>&#13;
<p>You can then access the stream via the url</p>&#13;
<blockquote>&#13;
<p>rtsp://your-server.org:554/Test</p>&#13;
</blockquote>&#13;
<p><strong><br /></strong></p>&#13;
<p><strong>The problem</strong></p>&#13;
<p>The vlc server is pretty good but there are two downsides:</p>&#13;
<ol><li>The HTTP interface is very basic</li>&#13;
<li>The streams need to be reconfigured, when the server is stopped (or crashed)</li>&#13;
</ol><p><strong><br /></strong></p>&#13;
<p><strong>The solution: Vodca</strong></p>&#13;
<p>I decided to write a little interface myself: <a href="https://github.com/AVGP/vodca">vodca</a></p>&#13;
<p><a href="http://imgur.com/NR6Bh"><img align="middle" height="242" src="http://i.imgur.com/NR6Bh.jpg" title="Hosted by imgur.com" width="450" /></a></p>&#13;
<p>Vodca is a little interface that allows to add, remove, watch (if you have the vlc-plugin installed you can watch videos directly in your browser) and search your streams. It also allows you to recreate streams after a server restart with one click.</p>&#13;
 