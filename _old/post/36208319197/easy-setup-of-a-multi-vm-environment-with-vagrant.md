{
  "title": "Easy setup of a multi VM environment with Vagrant",
  "date": "2012-11-21 14:00:09 GMT"
}

---

#Easy setup of a multi VM environment with Vagrant
<p>The wonderful Mr. <a href="http://www.twitter.com/igama">@igama</a> told me about a wonderful thing: Multi-VM setups via Vagrant.</p>&#13;
&#13;
<p><a href="http://ox86.tumblr.com/post/23734821654/painless-development-environments-with-virtualbox">Vagrant</a> is a tool that helps you set up virtual machines via VirtualBox comfortably within minutes.</p>&#13;
<p>The cool thing, the docs tell you (but you might have missed it, like I did): <a href="http://vagrantup.com/v1/docs/multivm.html">You can define multiple VMs that may communicate with each other inside one Vagrantfile!</a></p>&#13;
&#13;
<p>An amazingly easy way of setting up multiple VMs to test and play around with - for example, when you want to simulate a Master-Slave database environment or networking code. No need to jump between computers, no hassles setting up networking in VirtualBox, just extend your Vagrantfile and do a "vagrant up" to boot them all.</p>&#13;
&#13;
<p>Tip: If you don't know Vagrant, <a href="http://videos.sapo.pt/pky7qdvlT35cIvmgmaNc">watch this great talk from the Codebits 2012 about Vagrant</a>.</p> 