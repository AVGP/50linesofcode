{
  "title": "Running your meteor.js application on your own server",
  "date": "2013-03-12 12:00:50 GMT"
}

---

#Running your meteor.js application on your own server
During the course of the weekend two weeks ago, I created the **[Quantified Geekonaut](http://quantified.geekonaut.de) to gather some data about my internet activities (such as Twitter, Last.FM [Spotify really], Foursquare, Github, my blog and a few others) and experiment with graphing and such.

I decided to build it with [**Meteor.js**](http://www.meteor.com) - primarily because I needed a reason to play around with it again.

One thing I found (without being too surprised about it) about hosting your app on the **free meteor.com cloud hosting** is, that it gets restarted whenever somebody accesses your website.

Which isn't a problem normally is an issue for the *Quantified Geekonaut* application, because it gathers data periodically and saves it to be able to graph and query historical data points. That's obviously impossible, if it only collects data when accessed by a visitor.

As Meteor gives you the possibility to **bundle your app** as a (more or less) self-contained node.js app, you could as well **run it on your own server**.

In this article I'll give a quick run-through on how to do that.

**Step 1: Bundle your app**

To bundle your meteor app, run

    meteor bundle app.tar.gz
and copy the app.tar.gz on your server.

**Optional: Install nvm and node.js v0.8**

To run a meteor.js application you need to have at least node.js version 0.8.  
Optionally, if you want to use different node.js versions in parallel, you could install nvm, the Node Version Manager (pretty much "RVM" for node).
To install nvm on your server, you just run

    cd ~
    curl https://raw.github.com/creationix/nvm/master/install.sh | sh
to make bash always load nvm on startup, use

    echo "source ~/.nvm/nvm.sh" >> .bash_rc
on your server. If you're not using bash as your shell, adjust that accordingly.

To install node 0.8 on your server you just run

    nvm install v0.8
which gets you the latest stable version of the 0.8 branch. To make node 0.8 your default node.js version (if you have more than just this one), run

    nvm alias default 0.8

**Step 2: Unpack the bundle on your server**

Pretty straight forward: Copy the bundle from Step 1 to your server and run

    tar xvf app.tar.gz
    cd bundle

** If you bundled your app on a different architecture than your servers' (e.g. you bundled the app on OSX and run your server on Linux or your server is a 64bit system and your computer is a 32bit system) you need to reinstall fibers:
    
    cd server
    rm -rf node_modules/fibers
    npm install fibers@1.0.0
    cd ..

**Step 3: Install forever**

If you have your app running, you want to make sure it keeps running.
[Forever](https://github.com/nodejitsu/forever) is a great tool for that.  
It runs a node.js app in the background, monitors it and restarts it when needed.
To install forever, run

    npm install -g forever

**Optional: Get a MongoHQ database**

If you don't want to setup and install your own MongoDB instance, check out [MongoHQ](https://www.mongohq.com/home). You can use their free sandbox DB, if you wish. Copy the Mongo-URL to use it with meteor.

**Step 4: Set the environment and start the app**

For this you need a connection URL to a mongo db. You can either set it up manually or you can use MongoHQ as described above.
The app needs the URL of a MongoDB and a port to run on. To specify these run

    export PORT=8080
    export MONGO_URL=mongodb://<user>:<password>@<db_host>:<db_port>/<db_name>
Please substitute ```user```,```password```,```db_host```,```db_port``` and ```db_name``` with values for your Mongo instance.  
Now you can start the app with
    
    forever start main.js
Your app should now be reachable on Port 8080 on your server's address!

**Optional: Setup reverse proxy with Apache**  
If you want to run the app on a subdomain of your server, let's say
```meteorapp.example.com``` and you already have an Apache running for the main domain and/or some VirtualHosts, you can create a reverse proxy to serve the meteor app with something like this in your apache ```sites``` folder (for Debian that is ```/etc/apache2/sites-enabled```).  
Create a new vhost file with the following contents:

    <VirtualHost *:80>
      ServerName meteorapp.example.com
      ProxyRequests off
      <Proxy *>
        Order deny,allow
        Allow from all
      </Proxy>

      <Location />
        ProxyPass http://localhost:8080/
        ProxyPassReverse http://localhost:8080/
      </Location>
    </VirtualHost>
and you're ready to go. Reload apache with

    /etc/init.d/apache2 reload
or similar for your server OS and you're ready to enjoy meteor running on a subdomain.