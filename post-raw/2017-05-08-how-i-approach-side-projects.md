<!-- How I approach side projects -->
# How I approach side projects

![](../images/post-images/fun-projects.jpg)  
[Picture by WoC In Tech, CC-BY 2.0](https://flic.kr/p/FbS6AN)

## TL;DR

- Start with something you don't know. Research & write down the result
- Research just enough to identify the major unknown-unknowns, turning them into known-unknowns
- Break your project down into approachable steps
- Build small prototypes for each step to validate your understanding of the project's problem
- Put together an implementation of your project, based on learnings from the prototypes
- 🎈 Be proud & share 🎈

## Intro

First things first: This is how *I* approach the silly, little fun projects I do.
It may not work for you and it will most definitely not work for your team when building a product.
Long story short: Your milage may vary.

Yet, I think it's valuable for me to write it down and maybe it helps someone out there to get over analysis-paralysis
and make them move their side project forward. So here it goes!

## I have an idea, now what?

So I'm starting this at the stage where you discovered a thing and wanna do something with it.
This can take many forms:

* "Oh, serverless sounds interesting. I wonder what I can do with it..." - You see a cool new library or tool and wanna build something with it to see how it could help you with work.
* "How does an operating system actually work?" - You hear about a topic (e.g. research paper or technique) and want to learn about it.
* "I really hate $app, it would be nice if I could build my own with $feature!" - You see something and want to make it better or create your own version of it.

Let's go for an example project: 

> I would like to build a serverless service that converts an image into grayscale.

Now that you've had that thought - how do we go on?

## Step 1: Identify

Oh the excitement! All the new things that we'll learn! 🙌  
But then again, all the uncertainty and anxiety! 😩

This is usually my first roadblock: I don't even know where to start and *uggggghhhhhhhh* I will never make it happen.

**Don't let that drag you down!**

Instead, start with a thing that you clearly don't know. For instance: "I don't even know what serverless *means*".

Write that down, google it.

"Aha, so it runs code on a cloud platform without me worrying about the instances. But *how do I get my code there?*"

Write that down, google it.

"Aha, cool - but how do I *execute my code* then?"

You guessed it: Write that down, google it.

Repeat that until you understand just enough to have an idea how you could go about building your project. In this case you may have learned:

- AWS lambda is a serverless platform
- How to write code that runs on AWS lambda
- How to trigger your code to run
- How to store the output

In the end you'll have a document that looks more or less like an FaQ.

This doesn't have to be ready to become the official FaQ document for the world's questions - it's for you to document your learnings.

Instead of keeping in the question - google - document answer cycle, we break out once we understand enough to form a plan on how we go about building it! So instead of going into details on how you log things, debug your code, scale it, blah blah blah - we'll find out these details as we go along!

## Step 2: Map

Before we can jump into building something, we should lay out our path forward, so we don't get lost too easily.

From phase 1 we know at least the major pieces of the puzzle that will be our project.

Now write down the path from end to end and break it down into steps that are coarse enough to not be a specification, but small enough to fit into your head, one step at a time.

We can do this by zooming into the journey of a potential user:

> "Ok, so the service gets a picture and then returns the grayscale image"

One step. Too coarse, but gives us a tracer bullet. Now break this down a bit more:

> "Ok, the user calls my API with an image URL. **Then** the code runs and produces a grayscale image. **Then** it stores it somewhere and returns the URL."

Better, three steps here - we could do one more iteration by clarifying how this would work in practice:

> "Ok, the user does an **HTTP call** with the image URL. Then the code runs and produces a grayscale image **with $library**. Then it stores the image **on S3** and returns the URL."

In my opinion that's not adding much to what we had previously, but sometimes these details confuse me, then I add them to the map.

So now we know what we'll have to do - but chances are, that we've not done any of these things ever before - so OH THE UNCERTAINTY AGAIN! 😭

Fear not, we'll break it down into approachable little prototypes now.

## Step 4: Validate

In step one we've learned enough to know most of what we don't know, now it's time to find the rough edges of our newly-gained knowledge and fill the gaps in our plan!

Let's revisit the plan again:

1. HTTP call with image URL comes in
2. Our code runs, producing a grayscale image
3. Grayscale image is stored & URL to it is returned

Let's break that down in a few tasks we'll **tackle with actual project work**! (In this case: We'll start writing code now!)

The core of our project is converting images to grayscale versions.
So, go build that first. Write a function or module or application that takes a given image path and creates a grayscale version. It's fine if the image has to have a given name and be in the same folder as your code. It doesn't matter if the output is stored on disk or just displayed or even just a bunch of bytes on screen that you know are a grayscale version of the original pixels in the image.

That prototype had one tiny, clear goal: Prove that you can write code to convert a colour image to grayscale. **Done!**

The next prototype could be to run a simple "echo" service on AWS lambda - it could take a string via HTTP POST and just return that string back as a response. 

Or maybe you're wondering about the S3 upload? Write a prototype that uploads a local file to S3, then.

So we build a collection of small prototypes to answer **one aspect** of our plan each.

I, for instance came out with these prototypes:

- convert image from URL to grayscale
- AWS lambda service to turn HTTP GET "/echo?msg=hello" into a "hello" response
- AWS lambda service that downloads a file from the HTTP call to an S3 bucket

Those answered the detail questions I had and validated that each step of my service can be done!

## Step 5: Build

Now that we know we can do it, well, we put the parts together!

You now go through the steps and implement them, based on the learnings from your prototypes. At this point you should also check how other people build their things and if there's any advisories regarding security, best practices, etc. Also adding logging and documentation is very valuable at this point, because even if nobody else might ever see your result, you will forget how the thing you build works.

If you want to get the most out of it and be able to go back to your project one day to see "how did this work, again?" - you'll need some documentation.

## Next up: Release & Reflect

Once you've build it and it's running, you should take a deep breath and be proud of you.

Sounds silly, maybe, but it's *very* important to acknowledge what you've done. You started with "WTF is this?" and went to "I understand it now and I've applied my new knowledge. I can do the thing now!".

That is an achievement - be proud of your work :-)

Also: Share with others. These things are brilliant for meetup or conference talks, blog posts or to open source on Github, if applicable.

**You are not the only one who wanted to figure this out!**
Others can learn from you and maybe even give you ideas for improvements or teach you something on top of it, that you didn't find out during building your project. Everyone wins.

However, unfortunately the reality is that some people may badmouth your work or expect you to now be responsible for maintaining it and offering them 24/7 support. **No.** Tell them to ~~fuck off~~ you're not doing this commercially and if they don't like it, they are free to build upon it and make it better. You are not your projects, so don't let anyone take away your achievements in learning something new and doing something cool!

🎈 Enjoy learning & making! 🎈
