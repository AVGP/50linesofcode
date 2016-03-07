{
  "title": "The last few weeks and news!",
  "date": "2010-10-21 13:54:00 GMT"
}

---

#The last few weeks and news!
<p>Sorry for the inactivity throughout the last week(s) - its been a busy time!</p>&#13;
<p>The studies started again, I went to the Qt Developer Days 2010 (which was a great thing and a great time!), work started again and I've been developing on some thing.</p>&#13;
<p>Here is what:</p>&#13;
<p>I have been using KDE for years now, stuck with KDE 3 though. Upgrading to KDE 4 basically brought discontent. The system was unstable, workflough was tenacious and I did not really like it.</p>&#13;
<p>I do not like Gnome for some reasons. It feels like working in a patched together environment and this was my reason to ask: Why not build your own?</p>&#13;
<p>To accomplish this, I first asked myself what I expect from my desired desktop environment. This lead to a bunch of interesting points:</p>&#13;
<ol><li>It should not drag a ton of dependencies with it</li>&#13;
<li>It should not need too many resources - speaking of disk space, memory and screen-space.</li>&#13;
<li>I should be abled to customize to look and feel like I wish it to.</li>&#13;
<li>It should allow me to prevent, what I call "window war" (i.e. unhandy working with lots of windows)</li>&#13;
<li>It should allow me to use it in a fast and comfortable manner.</li>&#13;
<li>It should be reliable and stable.</li>&#13;
</ol><p>Thinking of this lead to the following essence:</p>&#13;
<ul><li>Having a set of less-or-more independent applications as a desktop, tray, etc.</li>&#13;
<li>Getting away from the unhandy start-menu to having a "Starter", which is a window showing the apps for example in categories, having access to the apps without hangling through menus, submenus, subsubmenus, etc.</li>&#13;
<li>Making it possible to use the keyboard to switch through workspaces</li>&#13;
<li>Grouping windows together, independent from the underlying applications</li>&#13;
<li>Saving space on the screen by using minimal window decorations and having a shortcut to tile all visible windows to have a possibility to switch between them easily and fast.</li>&#13;
<li>Using a simple, yet fancy widget toolkit.</li>&#13;
<li>Implementing a kind of watchdog for the running environmental processes to restart them automatically on crash.</li>&#13;
</ul><p>So I started implementing it.</p>&#13;
<p>It took me some time to set things up and get a basic version working.</p>&#13;
<p>Right now I have the foundation for accomplishing the given tasks. Yet it consists of a set of very VERY basic applications for tray, starter and desktop. It contains a basic window manager. So right now, none of the fancy features specified is present, but I'll go for them now.</p>&#13;
<p>As usual, the project can be found on GitHub and you're invited to fork and build whatever you like on it. I'd appreciate any work - let it be in the core system or on additional applications. For example you can build a fully-featured desktop or a tricky, feature-rich tray. You might, as well, port it to any widget toolkit you like!</p>&#13;
<p>If you are interested in hacking with this, take a look at it <a title="Slide Repository" target="_blank" href="http://github.com/AVGP/SLIDE">here</a>.</p> 