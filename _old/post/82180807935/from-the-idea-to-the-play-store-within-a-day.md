{
  "title": "From the idea to the play store within a day",
  "date": "2014-04-09 10:00:00 GMT"
}

---

#From the idea to the play store within a day
Thanks to @IonicFramework, @PhonegapBuild and @Cloud9IDE and @OpenDataZH I was able to bring an idea fully to live within one day.

Here's what and how.

##The idea

In November 2013 at the [Open Data Hacknights](http://make.opendata.ch/wiki/event:2013-10) in Zurich an idea was presented: Using the data on trees in public space to create an app for people with pollen allergy in Zurich.

The application should be designed for use on a mobile device and should also include a prognosis report and current pollen and weather data to give affected people a single point of contact to get all relevant information.

I got a very, very basic prototype working which was just a map with the tree locations marked in different colors.

![The old prototype was neither beauti- nor useful](http://blog.tagesanzeiger.ch/datenblog/wp-content/uploads/sites/32/2014/02/Bildschirmfoto-2014-02-16-um-15.39.00.png)

Unfortunately, I didn't really come around moving forward with it until this weekend.

## Getting started

### Ionic Framework
As the app is envisioned to work well on mobile, I decided to use [Ionic Framework](http://ionicframework.com) to build the application.

Getting started with a simple boilerplate is as easy as:

    npm install -g cordova ionic  
    ionic start PROJECTNAME tabs

At this point I included a Google map and some settings, extracted the data into a JSON file to store within the project and voila: A nice application was ready.

![The web version of the application starts looking reasonably usable](https://lh6.googleusercontent.com/-5GMEiYU-07Q/U0JHbxX1vmI/AAAAAAAAKeg/7KqyQzPcphU/w750-h1250-no/Screenshot_2014-04-07-08-32-34.png)

![Settings allow to select what trees are displayed on the map](https://lh3.googleusercontent.com/-ZQTjsL0RJuY/U0JHdPk9oFI/AAAAAAAAKeo/831It2x2v0c/w750-h1250-no/Screenshot_2014-04-07-08-34-59.png)

At this point I have the web version ready ([see it in action here](http://avgp.github.io/kein-stress-mit-pollen)) - it even has basic offline capabilities and allows fullscreen mode if you use Android or iOS and "Add to homescreen".

### Cloud9
As a big fan of the web I value the possibility to work and be independent from the device I am working on - so I often use [Cloud9](https://c9.io) as the development environment of choice.
It connects with Github and gives you a full virtual workspace environment including a static file web server and console.
For this project I created a new workspace and installed the 2 node modules mentioned above.

![A Cloud9 workspace has it all: Terminal, Syntax highlightin, preview web server](http://i.imgur.com/cOw4zaF.png)

This creates the full Ionic [Cordova](http://cordova.io) project - but as I won't build the project for Android directly on Cloud9 and use [Phonegap Build](http://build.phonegap.com) (see below) instead, I can delete everything except the ``www`` folder.

When I am done, I can use git to get it on Github, ready for building with the Phonegap Build service.

    git init  
    git add .  
    git commit -m "Initial commit"  
    git remote add <Github Repo Git URL>  
    git push -u origin master  

### Phonegap build
If you don't want to go through the hassle of setting up the various SDKs for the different platforms or you simply don't have, for instance, any Apple hardware to run XCode on, you can use the build service from Adobe for Phonegap applications.

This service is free for open source projects and you can start by just importing from your Github repository.

You can then scan a QR code to install the application on your device.

![Phonegap build lets you easily create hybrid apps for the most important platforms](http://i.imgur.com/VUGBRo1.png)

If you upload your keys, you can also create the release version of your app and push it to the stores.

This way, I got the app into the [Play Store](https://play.google.com/store/apps/details?id=de.geekonaut.pollenkarte) within an hour.

## Summary
Times are changing fast - and our development habits should adapt to this.

By using a few tools, I was able to get from a rough prototype to a fully-featured app in the Google Playstore.

I think we as developers are experiencing a wonderful era, where the whole supply chain is leaner than ever before.

Use these powers to the benefit of many and yourself.
