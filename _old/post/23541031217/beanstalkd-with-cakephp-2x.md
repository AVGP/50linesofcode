{
  "title": "Beanstalkd with CakePHP 2.x",
  "date": "2012-05-22 12:25:13 GMT"
}

---

#Beanstalkd with CakePHP 2.x
<p><strong>Beanstalkd? What? Why?</strong></p>&#13;
<p>When you need to carry out background tasks (e.g. processing a video file, fetching RSS feeds or sending a huge amount of emails) with PHP, it's usually a good idea to use an independent daemon to do the work.</p>&#13;
<p>This way, the user does not have to wait until the task is done and there is no risk of aborting the task because the user leaves or something goes wrong between server and client.</p>&#13;
<p>The use of a separate process handling the task brings up the problem of communicating the task between the handling script run by the webserver (taking the request from the user) and the processing script, performing the task with given parameters. For this purpose, there are many different message queue systems: Memcache, <a href="http://activemq.apache.org/amq-message-store.html">AMQ</a> and <a href="http://kr.github.com/beanstalkd/">Beanstalkd</a>.</p>&#13;
&#13;
<p><strong>Setup Beanstalk and the CakePHP Plugin</strong></p>&#13;
<p>When you are on a Debian system, you have it simple: </p>&#13;
<blockquote>&#13;
<p>apt-get install beanstalkd</p>&#13;
</blockquote>&#13;
<p>Then edit /etc/defaults/beanstalkd and run</p>&#13;
<blockquote>&#13;
<p>/etc/init.d/beanstalkd start</p>&#13;
</blockquote>&#13;
<p>And you're ready.</p>&#13;
<p>There are client libraries for a lot of different programming languages and with CakePHP you can take advantage of a plugin, which makes it really simple.</p>&#13;
<p><a href="https://github.com/davidpersson/queue">The plugin</a> was originally written for CakePHP 1.x, but there is a fork for <a href="https://github.com/carlipa/cakephp-queue">2.x</a>.</p>&#13;
<p>To use it, just go to your app/Plugin directory and run</p>&#13;
<blockquote>&#13;
<p>git clone <a href="https://github.com/carlipa/cakephp-queue">https://github.com/carlipa/cakephp-queue</a> Queue</p>&#13;
</blockquote>&#13;
<p>and edit your bootstrap.php to have the line</p>&#13;
<blockquote>&#13;
<p> CakePlugin::loadAll(); // Loads all plugins at once</p>&#13;
</blockquote>&#13;
<p>and finally include in your database.php</p>&#13;
<blockquote>&#13;
<p>    public $queue = array('datasource' =&gt; 'Queue.BeanstalkdSource');</p>&#13;
</blockquote>&#13;
<p>This is not well-documented in the plugin's README.</p>&#13;
&#13;
<p><strong>The Producer: Beanstalkd in the Controller</strong></p>&#13;
<p>The script that should trigger the daemon to do something (i.e. an action in a controller, called by the user visiting a URL) is called the "Producer" from Beanstalkd's perspective.</p>&#13;
<p>To create a job in the Beanstalkd "default" tube have this in your controller:</p>&#13;
<blockquote>&#13;
<p>    public $uses = array('SomeModel', 'Queue.Job');</p>&#13;
<p>    public $tube = 'default';</p>&#13;
</blockquote>&#13;
<p>That allows you to use Beanstalkd on the "default" tube from the controller.</p>&#13;
<p>To finally put a Job to the Queue do this:</p>&#13;
<blockquote>&#13;
<p>public function someAction() {</p>&#13;
<p>    $this-&gt;Job-&gt;put(array(</p>&#13;
<p>        'body' =&gt; array(...)</p>&#13;
<p>    ));</p>&#13;
<p>... </p>&#13;
</blockquote>&#13;
<p>This puts the values of "body" into the job in the "default" tube.</p>&#13;
&#13;
<p><strong>The Daemon - A worker</strong></p>&#13;
<p>To process the jobs and perform the actual tasks (with the data passed in throught the job's body) you could for example write your own CakePHP shell. The Shell itself should contain:</p>&#13;
<blockquote>&#13;
<p>public $uses = array('Queue.Job', 'Repository', 'Testdrive');</p>&#13;
<p>public $tubes = array('default');</p>&#13;
</blockquote>&#13;
<div>And to fetch (and delete) the job from the tube:</div>&#13;
<blockquote>&#13;
<div>&#13;
<div>$job = $this-&gt;Job-&gt;reserve(array('tube' =&gt; $this-&gt;tubes));</div>&#13;
</div>&#13;
<div>$this-&gt;Job-&gt;delete();</div>&#13;
</blockquote>&#13;
<div>All the parameters you passed through "body" in the producing action is now in $job['body'] and can be used to do whatever you need.</div> 