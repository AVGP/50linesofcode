{
  "title": "The native mobile app fallacy",
  "date": "2013-03-11 10:00:00 GMT"
}

---

#The native mobile app fallacy
**Native, web, hybrid?**

When it comes to mobile application development, there’s far too many evangelism out there.

The web fans sing their  

> “write once, deploy everywhere”

the native party yells back  

> “But it’s slow and doesn’t look native!”

but both lack the understanding of the advantages and disadvantages of each approach, as well as the rationalism to re-decide on this matter, based on the project at hand.

**Does *native* always mean *better*?**  
Certainly **no**.
Facebook is a great example for this. Their claim was, that the Android app's quirks and issues originated in its hybrid nature.  
The reality is: The new native Android app does not really work any better and Sencha [gave an impressive proof that a non-native app could do better](http://www.sencha.com/blog/the-making-of-fastbook-an-html5-love-story/).

So a native app is not by definition better.  
If you write inefficient code, the performance will be bad and the development iterations may be longer, as you can't easily test on many different platforms simultaneously without having to repeat modifications in the code for each platform.  
If you also run a web version of your project, the mobile web or the hybrid approach allows you to quickly iterate on both of them.

As always you should pick the right tool for the job, which can be a native or web app. It can even be a hybrid app.

The tricky thing is to find out *when* to use *what*.

**Quick overview of what's what**

* **Native**: Requires code tailored to each supported platform but gives you direct access to the native features.
* **Mobile web**: The same code runs on many (if not all) platforms. Can also be delivered to desktop browsers, but can not be installed via app stores and can not access all device features. As the code is run in the browser which runs on top of the operating system, some features may be slower than native features.
* **Hybrid**: Combination. Same code can run everywhere, all native features can be accessed and native components can be used to get a good performance. Hybrid apps can also be distributed in the app stores.

If you have a big team of experienced mobile developers for the different platforms at hand, you can of course leverage that.

But when you have a team of experienced web developers instead and need to quickly get an app out there (maybe even flanked by a web app), mobile web or hybrid apps are a great tool for achieving this.

The thing many people miss is: It's **not only** good for prototyping and quick iterations - it is a **viable option** for building great apps.  
With modern Javascript frameworks and libraries (such as [Angular](http://www.angularjs.org) and [Lungo](http://lungo.tapquo.com) in combination with [PhoneGap](http://www.phonegap.com)) you can use web technologies to your mobile apps that can play in the same league as native apps.

**It needs to look&amp;feel native, right?**  
First of all: If you want to achieve perfectly native look&amp;feel, you’re not going to have a good time with a hybrid approach. But do you really want that?

Let’s look at the Foursquare app for a second:  
![Foursquare app](http://aboutfoursquare.com/wp-content/uploads/2010/09/iphone_app.png) &copy;[Foursquare](http://www.foursquare.com)

and why not take another look at the Facebook app:
![Facebook on Android and iOS](http://cdn.sixrevisions.com/0274-02_facebook_native_mobile_web_app.jpg)

&copy; six revisions, see [their great article about native vs. mobile web](http://sixrevisions.com/mobile/native-app-vs-mobile-web-app-comparison/)

It's easy to spot that even the *native* Facebook-App doesn't really look native.
And that's no problem! The user doesn't really care, as long as it looks **great** and **feels right**.

This is something most people get wrong - you can have your very own look in your apps. Stop mimicking the native look and feel and start delivering something great and useful to your users.


**But to get in the stores, you need native, right?**  
No you don't.  
You can for example use [PhoneGap](http://www.phonegap.com) to package your hybrid app for many different platforms (e.g. iOS, Android, Windows phone, Blackberry).

**Okay, but what if I need the native features, like the camera?**  
Again, PhoneGap is the answer.

**But how do you build a great app?**  
There are many different ways to build great hybrid apps.
To achieve the best results, you should focus on the following aspects:

* Responsiveness - the app has to respond quickly to user input
* It has to feel right - don't imitate the perfect native transitions. Use decent transitions that are not giving the impression of "wanna be native"
* Be aware that the user won't always have a good internet connection (or any at all) - leverage local storage whenever you can and minimize the data to transfer
* Use native components (e.g via PhoneGap plugins) whenever needed
* be careful: Not all platforms already support every HTML 5 feature. Provide fallbacks
* **test** your app on different devices, especially on older ones
