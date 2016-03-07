{
  "title": "Facebook-Connect Login/Logout Issues?",
  "date": "2011-10-17 10:00:05 GMT"
}

---

#Facebook-Connect Login/Logout Issues?
<p><strong>Facebook-pwned</strong></p>&#13;
<p>After having fought with incomplete docs, outdated tutorials (ironically, this article will become outdated eventually) and weird behavior, I decided to give a kickstart to those, trying to get this (basically simple) thing done.</p>&#13;
<p><strong>Create a login</strong></p>&#13;
<p>First step after having followed the docs is to get the Login done via PHP-SDK.</p>&#13;
<p>Believe me, you don't want the JS-Shit. Why? Because it will fuck up your logout.</p>&#13;
<p>For some magical reason, having JS log me in while PHP logs the user out, the Javascript started some asynchronous black-magic and logged the user right back in.</p>&#13;
<p>For whatever reason that is.</p>&#13;
<p>So to get started, somewhere in your PHP init Facebook-SDK:</p>&#13;
<blockquote>&#13;
<p>$facebook = new Facebook('AppId','AppSecret');</p>&#13;
</blockquote>&#13;
<p>Of course, you need to replace AppId and AppSecret with those of your app. In the template just create a link for login with facebook like this:</p>&#13;
<blockquote>&#13;
<p>&lt;a href="&lt;?php echo $facebook-&gt;getLoginUrl(); ?&gt;"&gt;Login via Facebook&lt;/a&gt;</p>&#13;
</blockquote>&#13;
<p>You are done for login.</p>&#13;
<p><strong>Create a logout</strong></p>&#13;
<p>Now to logout. I assume you have some "native"-mechanism for login/logout in your web-application. For example, you log users out of the system by directing them to /logout.php.</p>&#13;
<p>Reading the docs from Facebook, you'll easily figure out, that logout via Facebook goes like this:</p>&#13;
<blockquote>&#13;
<p>header('Location: '.$facebook-&gt;getLogoutUrl());</p>&#13;
<p>exit;</p>&#13;
</blockquote>&#13;
<p>Thats close. You might want to set a "next"-Param to that method call to get back onto the landing page. If you're lucky and have a framework, where you check for a Facebook-Session with every request coming in without login-credentials, you are fucked now.</p>&#13;
<p>Because the before mentioned mechanism is not done properly. You will encounter the weird phenomenon, that you'll be logged in AGAIN after being logged out.</p>&#13;
<p>After some freaking out, I found that to be caused by a remaining cookie, set from Facebook for my domain. So I deleted the cookie using</p>&#13;
<blockquote>&#13;
<p>setcookie('fbrs_'.APP_ID,false,time()-10);</p>&#13;
</blockquote>&#13;
<p>with perfectly no result.</p>&#13;
<p>After having tried a number of ways, googled for the problem (others had it too, but the cookie-stuff seems to have changed from the older SDK versions to 3.1) I saw Chrome telling me its a "host-only" cookie.</p>&#13;
<p>Whatever that was supposed to be. After googling again, I found <em>its a cookie with no domain set.</em> And thats the trick: You need to call</p>&#13;
<blockquote>&#13;
<p>setcookie('fbrs_'.APP_ID,false,time()-10,'/','');</p>&#13;
</blockquote>&#13;
<p><span>which is </span>necessary<span>, because the default param is setting the current domain, not an empty string.</span></p>&#13;
<p>I hope this post is helping at least some soul out there, struggling with that issue.</p>&#13;
 