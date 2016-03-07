{
  "title": "Windows Shellcode",
  "date": "2010-09-21 19:21:00 GMT"
}

---

#Windows Shellcode
<p>Today I'm gonna cover, how exploits get served with payload.</p>&#13;
<p>To clear the terms:</p>&#13;
<ul><li><strong>exploit:</strong> Data that, when inserted into a target application, lets the attacker execute some kind of payload-code. The exploit itself just triggers some kind of defect in the target software, to give control to user data and lets the attacker modify the running program. The payload is usually called <em>shellcode.</em></li>&#13;
<li><strong>shellcode:</strong> The actual "payload", that brings the actual harm of an exploit, by providing the attacker with whatever activity he wants.</li>&#13;
</ul><p>The name shellcode comes from the fact, that in most cases you'll want to have some kind of remote shell. For this purpose the payload code spawns a shell. Over the years, the term evolved to a generalization for every payload, that is used in an exploit.</p>&#13;
<p>Shellcodes are a bit special. For example: If you inject them into char-buffers, you'll need to make sure, that there is no 0-char in your binary, because that would cause the shellcode to fail.</p>&#13;
<p>You should also keep in mind, that you usually have limited amount of memory available for your shellcode, unless you use techniques, so you're not injecting your shellcode directly into the exploited memory area.</p>&#13;
<p>In the following example, I want to show you, how to create a simple shellcode for Windows. The code will just exec calc.exe, when inserted into an exploit. You don't have an exploit at hand? Then use <a title="Shellcode loader" target="_blank" href="http://gist.github.com/590261">this</a> code to start it without any exploit.</p>&#13;
<p>I chose this example, because the used WinAPI function "WinExec" resides in kernel32.dll, which is mapped to every process. In any other case, we would've had to call LoadLibraryA and GetProcAddress before we can use the function.</p>&#13;
<p>For a first introduction to this topic, that'd be too much, I think.</p>&#13;
<p><a title="calc.exe Shellcode" target="_blank" href="http://gist.github.com/590331">Here</a> you find the documented code. To get the shellcode from it, you might use bin2c or just write yourself a small script, loading the elf and getting the binary part from it.</p>&#13;
<p>All you need to exec a WinAPI function is to get the address, where its mapped to. Then you push the arguments on the stack and thats it.</p>&#13;
<p>Would you have thought its that simple?</p>&#13;
<p>If you wonder, why I come up with this: I refreshed my knowledge today after haven't done things like this for some years now...</p>&#13;
<p>Hope you liked it - stay tuned.</p>&#13;
<p>0x86</p> 