{
  "title": "Winet hosted Asterisk PBX SIP 403: Bad auth",
  "date": "2012-10-03 18:10:53 GMT"
}

---

#Winet hosted Asterisk PBX SIP 403: Bad auth
<p>Today I encountered a problem that is common to some GUIs for Asterisk: Problems with synchronizing Asterisk with the Configuration from the GUI.</p>&#13;
&#13;
<p>In my case, I was confronted with a hosted Asterisk instance that I can only access through a web gui.</p>&#13;
<p>A user complained, that he got a "403: Bad auth" and he was totally sure that he got the password and username right. I checked and he got them right.</p>&#13;
<p>So I checked if it was his softphone that fucked things up - it turned out to happen on my softphone as well when I tried to connect with his credentials.</p>&#13;
<p>It even happened with a second user account but not with a third one.</p>&#13;
<p>As it turned out: The common factor of the two accounts that failed was a previous password change.</p>&#13;
<p>The Winet GUI offers you a console via "System" &gt; "Console" where you can use pretty much all the <a href="http://www.voip-info.org/wiki/view/Asterisk+CLI">Asterisk CLI commands</a>.</p>&#13;
<p>In that particular case you can do the following:</p>&#13;
<ol><li>Enter "sip show users" - the "Secret" column shows the beginning of the password of a user.</li>&#13;
<li>Enter "sip reload".</li>&#13;
<li>Enter "sip show users" again and check if the password is now refreshed.</li>&#13;
</ol><p>Now your users should be abled to connect properly.</p>&#13;
 