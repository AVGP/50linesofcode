{
  "title": "So you don't like Firefox OS? Change it!",
  "date": "2013-06-24 11:00:22 GMT"
}

---

#So you don't like Firefox OS? Change it!
After getting my [Geeksphone PEAK](http://www.geeksphone.com/) last week, I have to say, that it's a pretty neat device.

However, some stuff was not making me happy. One example was the email app on the device.

It's not bad, but I didn't like the appearance of the read vs. the unread mails.

So here comes a wonderful thing about FirefoxOS: **If you're not happy with something, change it.**

If you want to change the system UI like I wanted, you need to make changes in [Gaia](https://wiki.mozilla.org/Gaia), the collection of system apps. Start by [checking out Gaia from Github](https://github.com/mozilla-b2g/gaia) and make sure to checkout the right branch for your image.

* PEAK stable: Checkout the ``v1.0.1`` branch
* PEAK nightly: Checkout the latest master

Now you can run

    $ PRODUCTION=1 make
    $ PRODUCTION=1 make install-gaia
and get your latest Gaia version on your phone.
In my case I just worked on the email app, so I sped things up with

    $ PRODUCTION=1 APP=email make
    $ PRODUCTION=1 APP=email make install-gaia
to only recompile and push the email app.

So, now go and make your Firefox OS phone yours!