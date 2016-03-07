{
  "title": "Mounting SFTP on MacOSX",
  "date": "2012-09-06 12:50:28 GMT"
}

---

#Mounting SFTP on MacOSX
<p>Linux filebrowsers often are capable of mounting a vast amount of remove filesystems as if they were local folders. That usually works with FTP, SFTP, WebDAV, SMB and others.</p>&#13;
<p>Finder, on the other hand, is capable of doing the same for FTP, WebDAV, SMB and AFP - but not via SSH with SFTP.</p>&#13;
<p>To do so, you could spend some money for CyberDuck - or you go with the solution I will describe here for free.</p>&#13;
<p><strong>Getting all the stuff</strong></p>&#13;
<p>You will need three things: <a href="http://code.google.com/p/macfuse/">MacFuse</a>, <a href="http://osxfuse.github.com/">FUSE for OSX</a> and <a href="http://macfusionapp.org/">Mac Fusion</a>.</p>&#13;
<p>Additionally, you need to install sshfs. This is easily done by running "brew install fuse4x sshfs".</p>&#13;
<p><strong>Mounting your first SSHFS</strong></p>&#13;
<p>After installing all of them, open a terminal and enter "sshfs --version" which should output something along the following lines:</p>&#13;
<blockquote>&#13;
<p>$ sshfs --version</p>&#13;
<p>SSHFS version 2.4.0</p>&#13;
<p>fuse4x library version: FUSE 2.8.7 / fuse4x 0.10.0</p>&#13;
<p>fuse: no mount point</p>&#13;
</blockquote>&#13;
<p>Once you have SSHFS installed, you can start MacFusion.</p>&#13;
<p>Click on the little "+" in the bottom left corner, choose "SSHFS" and enter the connection details (A descriptive name, host, user, password and optional: path to the initial folder).</p>&#13;
<p>The new mount should show up in the list of the main window now and a click on "Mount" should bring it up in Finder as well.</p> 