{
  "title": "Quick bulletin: Picking a way of developing hybrid mobile apps",
  "date": "2013-07-05 15:13:00 GMT"
}

---

#Quick bulletin: Picking a way of developing hybrid mobile apps
Due to popular demand: A superquick guide to picking the right tools for you.

**TL;DR**: You may want to give my [Hybrid Strategy Picker](http://avgp.github.io/hybrid-strategy-picker/) a whirl. Be careful tho, it's far too simplistic, but a good starting point.

**Warning**: This is by no means complete and it may not turn out to be the right fit for you. For more details and the full story [see my slides from SpainJS 2013](http://avgp.github.io/hybrid-strategies-pick/).

With this out of the way, let's step into this!

##So you want to go hybrid..
..nice! But before you start looking at the technologies, you need to answer a couple of questions and make a couple of decisions.

**This post aims at speeding this up a little for you**.

**Remark** The following choices can be considered **production ready**.

## Choice 1: Only Javascript
If you come from a JS world and have been working with the backend side of things a lot and you feel more comfortable with **writing pure Javascript all the time** (or Coffeescript, for that matter), this choice is for you.

You should have a close look at [Sencha](http://www.sencha.com/products/touch-bundle/) as it gives you a one-stop-solution: UI, Logic / Architecture, Packaging right out of the box.

## Choice 2: HTML / CSS / JS
You're coming from the web world and know all parts of the frontend stack? That gives you a couple of choices on it's own:

### Option A: Kendo + Cordova
This gives you the UI & Logical architecture from Kendo (MVVM) and deployability to a range of platforms, including iOS and Android.

There's even a simple way of getting into it right from your browser, check [Icenium](http://icenium.com) to get up and running in no time.

### Option B: LAB + Cordova

This gives you the wonderful world of Angular.js with the UI sweetness & easy prototyping Lungo.js provides.
Check out [our Github repository](https://github.com/centralway/lungo-angular-bridge) or the [grunt-init task for the LAB](https://github.com/centralway/grunt-init-lungo-angular) to get started as quick as possible.

I hope you now have some pointers to go and play with things that are ready for prime time - use these powers with care and never forget

##Martin's rule of mobile app development

> Don't trust anybody, test it yourself