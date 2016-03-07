{
  "title": "The Windows Kernelspace",
  "date": "2010-09-17 14:46:00 GMT"
}

---

#The Windows Kernelspace
<p>The kernelspace of Windows is the area, where all the <em>magic</em> things happen.</p>&#13;
<p>So this is the place, where the sun shines every day, where unicorns and elves are living together in perfect harmony, yadda yadda.</p>&#13;
<p>While there are of course reasons why one should get code into this sphere, there are also reasons related to malicious - or at least suspect - activities.</p>&#13;
<p>For example hiding activity on the computer, for instance to cover malware or cracker activity. One very wide-spread example is hiding the communication channel bot-clients keep to receive orders from their botmaster.</p>&#13;
<p>Software performing these activities is called a <a title="Rootkit" href="http://en.wikipedia.org/wiki/Rootkit">rootkit</a>. Rootkits hide network connections, files and directories, processes, etc. Usually this is done by interfering with the regular communication channels between applications and the operating system.</p>&#13;
<p>The operating system itself provides a quite extensive set of functions for the user-space applications. For example getting a chunk of memory, listing running processes or files in a directory and many more.</p>&#13;
<p>A rootkit will try to get its hands on the data, which is transferred between the operating system and the application, to be abled to change this data according to its needs.</p>&#13;
<p>Now you might think: Yeah, well. But that is a very complicated task - you cannot just walk into kernel-space and say: "Gimme all your data, bro!".</p>&#13;
<p>Well, <strong>you can</strong>.</p>&#13;
<p>I'll show a simple example, which allows you to manipulate the data the operating system will pass to applications requesting it. In the given example, we will hide registry keys, whose names start with "EVIL".</p>&#13;
<p>To those, who ask: WTF? Why is he covering this topic? Its pretty well-known. Its not. Most people never sneak into the kernel-space.</p>&#13;
<p>Ah, and to the "1337" scriptkiddies out there: Forget about it. Every anti-malware tool, that is worth the cpu cycles it consumes, will discover it. So go and play elsewhere. Everybody else is invited to take a peek and get to know, how few lines of code it takes to get in between applications and the OS.</p>&#13;
<p>The rootkit is nothing more than a driver. Drivers run in kernel-space (I heard, there are user-space drivers in Windows 7. I am not quite up-to-date with Win 7, so feel free to tell me about this in comments.)</p>&#13;
<p>The technique we'll use here is called SSDT-Hooking (Hooking makes me feel pirate-y. Arr.) - SSDT is the acronym for System Service Dispatch Table.</p>&#13;
<p>This table holds the addresses of code the OS uses to handle the user-space calls to its service-functions (so called SysCalls). What we are about to do is simple: We will seek the entry of a specific kernel function in the SSDT and change the address of the handling code from window's to the address of our own function.</p>&#13;
<p> We'll store the original address, because we need to call the original function in order to get the information we wanna change from the operating system. Then we pass the modified data on to the user-space application, which requested it.</p>&#13;
<p>To get this working, we'll use the symbole "KeServiceDescriptorTable" the kernel exports. This table is of the following structure:</p>&#13;
<blockquote>&#13;
<p>typedef struct<br />{<br />    unsigned int *TableBase;<br />    unsigned int *CounterBase;<br />    unsigned int  NumberOfServices;<br />    unsigned char *ParamTableBase;<br />} SSDT;</p>&#13;
</blockquote>&#13;
<p>The begin of the table is stored in TableBase, the number of entries is in NumberOfServices. The rest is uninteresting for us now.</p>&#13;
<p>Be aware, that - <em>for security reasons</em> - the table is exported as read-only. But don't worry, Microsoft has got a well-documented way, how to get write access easily: MDLs. You just create an MDL around the table, ensure its not paged, map it to the kernel-space and lock it. Done!</p>&#13;
<p> After this you have to define the data-structure of the target function and create your own function, matching the function definition of the original function (i.e. matching parameter count,parameter types and return type).</p>&#13;
<p>In your own function, you call the original function to get the data from the operating system, then you filter it and return it to the calling application.</p>&#13;
<p>Thats it.</p>&#13;
<p>If you wanna get into detail with this, read my <a title="SSDT-Hooking" href="http://www.filer.net/get/5b66e4ace5aab28/file/SSDT-Hooking-en.pdf">short paper</a>. This file includes complete source code of the driver.</p> 