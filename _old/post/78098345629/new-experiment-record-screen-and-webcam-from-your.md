{
  "title": "New experiment: Record screen and webcam from your browser",
  "date": "2014-02-28 11:00:00 GMT"
}

---

#New experiment: Record screen and webcam from your browser
Thanks to an experimental feature in Google Chrome, you can use ``getUserMedia`` to capture your screen - put that together with your webcam stream and record it as a video from within the browser - et voila: An interesting experiment was born.

## Demo
Take a look at my quick demo:

<iframe width="560" height="315" src="//www.youtube.com/embed/dvoFHovgzjw" frameborder="0" allowfullscreen></iframe>

[You can try it yourself here](https://googledrive.com/host/0B9MEoZDi5-peZVdwT3lDT09iaEE/index.html) or [take a look at the Github repository](https://github.com/AVGP/webcaster).
## A rabbit hole called development
![To solve n IT problems, you need to solve n^n other problems first.](https://lh4.googleusercontent.com/-q_CSd6VuGxg/UfeYTp6ci_I/AAAAAAAAgV8/gXy32wVX47A/w480-h360-no/programming.gif)
You know that, right? You face a challenge you want to tackle, only to find out that there's a myriad other, related challenges to be tackled first.

This is how this experiment came to live...

## How to capture your screen with web technologies

I recently stumbled upon an [experimental Chrome feature for capturing your screen with getUserMedia](https://html5-demos.appspot.com/static/getusermedia/screenshare.html) and so I thought: Sweet, that'd give a great screencast recording tool.

Now for a screencast to be a little more personal and relatable, I find it nice to see the person talking me through something - and the web has me covered!

I just request the video stream from the web cam and put it together (picture-in-picture) with the video stream from the screen capture.

## Recording from getUserMedia

Alright, now I can see myself and my screen. That's cute but only mildly useful - I'd need to record it.  
Again the web has me covered... sorta...

The [StreamProcessing](https://dvcs.w3.org/hg/audio/raw-file/tip/streams/StreamProcessing.html#canvas-recording) is including a piece for recording video and audio. But I don't know any browser supporting it today.

There is also the [MediaRecorder](https://dvcs.w3.org/hg/dap/raw-file/default/media-stream-capture/MediaRecorder.html) proposal... but documentation is rare for this.

So I had to look for some other way to get to something quickly.

## Whammy.js to the rescue
For the video bit, I use [whammy.js](https://www.google.ch/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&ved=0CC0QFjAA&url=https%3A%2F%2Fgithub.com%2Fantimatter15%2Fwhammy&ei=skkQU-qzKa3W7QaYsoGYAQ&usg=AFQjCNHnojPKL3RVts0aijCFcY0QaXSF8A&bvm=bv.61965928,d.ZGU) now. It allows to take frames from the canvas and put them together as WebM videos.

## The next steps

So I can record video - but no audio. That's pretty bad.  
I will also take a look at [MediaStreamRecorder](https://github.com/streamproc/MediaStreamRecorder) which should give me access to video and audio recording.