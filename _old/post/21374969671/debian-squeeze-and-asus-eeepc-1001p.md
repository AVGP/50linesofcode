{
  "title": "Debian Squeeze and Asus eeepc 1001p",
  "date": "2012-04-19 10:00:56 GMT"
}

---

#Debian Squeeze and Asus eeepc 1001p
<p>Last year I got myself an Asus EEE pc 1001p and wanted to set it up with Debian.</p>&#13;
<p>After reading the <a href="http://wiki.debian.org/DebianEeePC/Model/1005P">Debian eee Wiki</a>, I was convinced that it would be an easy task.</p>&#13;
&#13;
<p>Turns out: It wasn't.</p>&#13;
<p>The setup itself was nice and smooth. Setting up WiFi, X11 and fluxbox without any hassle. Then the first reboot.</p>&#13;
<p>After a few lines (up to udev, as it turns out) the screen went black.</p>&#13;
<p>This made me wonder, if something was wrong with my X11 config. I removed X11. Still: The screen went black.</p>&#13;
<p>I tried using "nomodeset" and several vga-modes in the boot command in Grub.</p>&#13;
<p>No effect, screen went black.</p>&#13;
&#13;
<p>I also tried the "acpi_os=Linux" hint from the Debian eee Wiki.</p>&#13;
<p>Does not work.</p>&#13;
&#13;
<p><strong>The real solution:</strong></p>&#13;
<p>Today, by pure incident, I came across the <a href="https://bbs.archlinux.org/viewtopic.php?pid=714406#p714406">working solution</a>:</p>&#13;
<blockquote>&#13;
<pre><code>acpi_osi=Linux</code></pre>&#13;
</blockquote>&#13;
<p>To have this working, just hit "e" in the Grub menu, go to the "linux .... quiet" line and append the option mentioned above and hit CTRL+X to boot.</p>&#13;
<p>You'll be just fine.</p>&#13;
&#13;
<div></div> 