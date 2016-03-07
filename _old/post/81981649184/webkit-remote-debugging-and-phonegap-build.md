{
  "title": "Webkit Remote Debugging and Phonegap Build",
  "date": "2014-04-07 11:00:27 GMT"
}

---

#Webkit Remote Debugging and Phonegap Build

Debugging has been a problem in hybrid app development over the recent years.

Yes, there has been [WeinRE](http://people.apache.org/~pmuellr/weinre/docs/latest/Home.html) or [Ripple](http://emulate.phonegap.com/) to ease the test and debug pains or the logs from the device if everything else did not help - but it was no substitution for the debugging tools we have for normale websites and running the application in a normal browser (vs. the embedded web view of Phonegap).

## Enter Webview Debug

As explained on the [Phonegap Debugging Guide](https://github.com/phonegap/phonegap/wiki/Debugging-in-PhoneGap) there's a new way to debug Phonegap applications on devices running Android 4.4: [Webkit remote debugging](https://developers.google.com/chrome-developer-tools/docs/remote-debugging#debugging-webviews).

## Setup 
### Cordova 3.3
Cordova 3.3 has the webkit debugging enabled, if you set the debuggable flag in the ``AndroidManifest.xml`` and the ``targetSdkVersion`` to 19.
On Phonegap Build you just need to enable debugging and adjust the SDK version, no modifications in the AndroidManifest.xml are needed. 

### Cordova 3.2
With Cordova 3.2 you'll need to add some code to make the Web view debuggable or you use [this handy plugin](https://github.com/jrstarke/webview-debug). 

## Using the dev tools 
You need to connect your device via USB to the computer you want to use the Chrome Dev tools on. 

Then run ``adb list devices`` to see if the device is ready for debugging. If it doesn't show up, you [need to enable USB debugging](http://developer.android.com/tools/device.html). 

Open [chrome://inspect](chrome://inspect) in the Chrome browser and enable "discover USB devices". 

When you launch the app on the phone, it should appear in the list. 
By clicking on it, you can start using the full dev tools suite to debug your hybrid app now. 

![](https://developers.google.com/chrome-developer-tools/docs/remote-debugging/about-inspect-webview.gif) 