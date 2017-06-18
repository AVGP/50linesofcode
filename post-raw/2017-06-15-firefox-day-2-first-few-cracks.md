<!-- Firefox day 2: First few cracks -->

# Firefox day 2: First few cracks

## TL;DR

## Unintentional glitch art

Today I happened to visit my own website, [geekonaut.de](http://geekonaut.de) and noticed a few interesting glitches on my page:

![](../images/post-images/firefox/firefox-day2-4.png)

The first thing to do was to go to the devtools and inspect the elements:
![](../images/post-images/firefox/firefox-day2-3.png)

So the 3D transforms aren't doing too well on my trusty linux laptop. I've not seen this problem with Chrome. Then again, graphics can be wonky on Linux, so I double checked with my OSX machine to find that it's indeed a **compatibility bug between Firefox and Linux** in my case.

Also for some reason Firefox required me to put an `overflow-x: hidden` into an element that is styled to be `width: 100vh` and displayed as such. No biggie but something I'll investigate further as I can't fully explain it yet.

## Nothing to see here (now)

Another issue happened after visiting the great [A Week of A-Frame 64](https://aframe.io/blog/awoa-64/):

![](../images/post-images/firefox/firefox-day2-1.png)

I don't know what that was, but at least **it was temporary**. I checked back a few hours later (with nothing having changed - same laptop, same WiFi, ...) and it worked. There were no problems with playback at any time in Chrome. 

**Update**: [I'm being told](https://twitter.com/jwajsberg/status/875472489631162369) this is an intermittent issue on Twitter's end.

I can't say the same about the [Forest Wave](https://forestwave.glitch.me) demo, though. It just never worked in Firefox. The music played to a blank window:

<div style="border: 1px solid black; width: 400px;">
  <img src="../images/post-images/firefox/firefox-day2-2.png" width="400px">
</div>

Again, Chrome was having no problems. A look into the developer tools offered this:

```
  TypeError: invalid arguments    aframe.min.js:105:25828
```

The interesting thing is: **That demo doesn't work in Safari either - but works fine in Chrome**.
I won't chalk this one up against Firefox, even though from a user's perspective _it's not working in Firefox but in Chrome it does_. This also goes on my list of "what's up here" investigations to find out what the root cause is here. I'll post my findings (if any) in a later episode.

## Firefox Android + Facebook messenger = yay!

There's been a very positive discovery though: While Facebook messenger forces me to install the app when running Chrome on Android, Firefox has no such problem.

In Chrome there's a way around but it ends up with a ridiculously bug-ridden version of the messenger for me:

- I go to `m.facebook.com`
- I select "Request mobile version"
- Messenger is back!

Even after that dance, I struggle with disappearing words as I type and other fun.
**In Firefox, I can use the FB messenger without problems again**

## Summary

I have seen a few weird glitches and a cool discovery today. So far I'm still having a pretty good feeling about this journey - let's see how it will be tomorrow!

## The entire saga so far

* [Firefox day 1](2017-06-14-my-firefox-month-day-1)
* [Firefox day 2](2017-06-15-firefox-day-2-first-few-cracks)
* [Firefox day 3](2017-06-16-firefox-day-3-details)
* [Firefox day 4](2017-06-17-firefox-day-4-goin-up-the-country)
* [Firefox day 5](2017-06-18-firefox-day-5-a-race)