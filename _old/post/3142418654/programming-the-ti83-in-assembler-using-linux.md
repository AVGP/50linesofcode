{
  "title": "Programming the TI83+ in Assembler using Linux",
  "date": "2011-02-06 11:40:00 GMT"
}

---

#Programming the TI83+ in Assembler using Linux
<p><strong>Preface:</strong></p>&#13;
<p>A few days ago I rediscovered my Texas Instruments "<a target="_blank" href="http://en.wikipedia.org/wiki/TI-83">TI 83 Plus</a>" graphical calculator.</p>&#13;
<p>It is based upon <a target="_blank" href="http://en.wikipedia.org/wiki/Z80">Zilons Z80</a> CPU. The TI83+ runs on 6 MHz and is capable of displaying pixel-graphics. It can be programmed using a special BASIC-favor, using C (haven't really figured that out, yet) or z80 Assembly. </p>&#13;
<p>I remembered the days back in school, when I used the TI-BASIC to extend the calc's capabilities - for example to render 3D-Vectors to be abled to illustrate and review results of vector-geometrical assignments.</p>&#13;
<p>Besides that, I built a variety of programs for convenience in plain "use that formula, substitute the variables according to the task and give the result." - for example for <a target="_blank" href="http://en.wikipedia.org/wiki/Bernoulli_process">Bernoulli-Processes</a>.</p>&#13;
<p>Anyway. Currently, I would like to play with Z80 Assembly on it. To get that running, I started reading some articles and got several different results. All differ a bit here and there and it took me some time to get going.</p>&#13;
<p><strong>Here is how you get going easily:</strong></p>&#13;
<p>I am using Debian Linux but the setup should be the same for all distributions.</p>&#13;
<p>You'll need the following tools:</p>&#13;
<ul><li>spasm: The Assembler (Just get <a href="http://wabbit.codeplex.com/releases/view/45275">Wabbitcode</a> to fetch it.)</li>&#13;
<li><a href="http://www.ticalc.org/pub/unix/tilp.tar.gz">tilp</a>: The TI-Link Program for Linux (use "apt get install tilp2", if you're Debian user)</li>&#13;
<li>The text-editor of your choice. (only if you don't work in Wabbitcode)</li>&#13;
<li>The <a target="_blank" href="http://education.ti.com/downloads/files/computer_software/sdk_83p/ti83plus.inc">ti83plus.inc</a> File.</li>&#13;
</ul><p>You can - of course - also use Wabbitcode, which is an IDE for TI-Assembly.</p>&#13;
<p>Now you have two possible options to build the .8xp-File (the binary):</p>&#13;
<ol><li>Use Wabbitcode</li>&#13;
<li>Use your favorite text-editor and spasm directly.</li>&#13;
</ol><p>Whatever way you choose, after building the *.8xp-File, you need to transmit it to the calculator using tilp. I will describe the second method.</p>&#13;
<ul><li>You create your code file, say "hello.asm".</li>&#13;
<li>Write your code - <a href="https://gist.github.com/812603">here is an example</a>. Be sure to have an empty line at the end of the file!</li>&#13;
<li>Save the file.</li>&#13;
<li>Run spasm with "spasm hello.asm hello.8xp".</li>&#13;
<li>Start tilp. Perform a left-click on the left panel, click "Change device" and choose the right settings for you.</li>&#13;
<li>Transfer the hello.8xp to the calculator.</li>&#13;
<li>Run it on the calculator by using Asm(prgmHELLO) and enjoy.</li>&#13;
</ul><p>Thats it!</p> 