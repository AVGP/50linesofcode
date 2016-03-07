{
  "title": "How to manage building a great software product",
  "date": "2013-03-14 10:50:00 GMT"
}

---

#How to manage building a great software product
The internet is fast-paced and to build great stuff, it's vital to manage your project properly.
  
Because if you don't, you'll never build something truly great.
You may say "Yup, that's obvious". Like everybody does.

**The TL;DR:**
* Focus on building what the customer needs
* **You** don't know what the customer needs, so ask the customer early on
* Measure the use of the features, optimize for the **real** top features
* Waterfall doesn't work, the original paper (1983) even says so, **be agile** and deal with it.
  
But for some reason, whenever I'm on an event or I look at fellow developers I hear the same things over and over and over again?
  
Here are the top 5:
1. The managers give us not enough time and budget to build giant, complex apps and expect the outcome to be great.
2. The deadlines are unrealistic the moment they're set
3. Nobody asked us about it, the decisions were made without the developers
4. We're behind schedule, the set of features is steady (sometimes this is even "it actually grows") and the deadline can't be delayed.
5. We don't have time to really think about anything, we just have to code code code.
  
It's not coming from people working in the same company. I hear this a lot and thinking back, I encountered that myself as well. Often.
  
When you ask people who know enough about coding but are in a managing position, I often get the following reply:

> I know, but the management...

I have a theory that has proven to be right pretty often: The project management gets under pressure from the higher management and doesn't stand their ground, which transitions into putting the pressure on the development team... which doesn't stand their ground either.
  
So here's my suggestion to this: When somebody **demands something unrealistic**, tell them about the **Scope Triangle**.
  
The scope triangle is one of the most-obvious yet most-ignored things in management of IT projects. It looks like this:

![](http://cdn.projectsmart.co.uk/img/scope-triangle.png)

It means: **From Quality, Time or Money you can pick two or you end up with something shitty.**
You should [**now read this article**](http://www.projectsmart.co.uk/project-management-scope-triangle.html) for further details on this.  
Seriously, click the link and read that really thoroughly, then come back.
  
Alright. Now that you understand the key thing there,start by focusing on the **only really important aspect**: The **user**.
  
* If your project **looks really great**, but doesn't really **do the right job perfectly**, it's **shit**.
* If your project **has a ton of features**, but doesn't really **do the right job perfectly**, it's **shit**.
* If your project **has the best user experience**, but doesn't really **do the right job perfectly**, it's **shit**.
  
**Period.** No excuses, no "Yeah but..." - the **first thing** you have to release is something **the user wants**. What makes people want something? If it **does something really good**. Everything else is **toys**.
  
Do you know **what the user needs** or wants? **No you don't.**.  
Try it for yourself, make up something you think a given group of people would love. Then go to a coffee shop and **offer people from that group a coffee** in exchange for **telling them your idea**.  
You'll be surprised how different their desires and needs are from what you had in mind.
  
Now that you understood how important it is to get the **real user feedback** to your idea (actually even **before having built the first release**), you could do different things:

* Create a simple clickable prototype and do the **coffee test** again.
* Create a simple *real* version with only the features you think are the most vital **but not more than one or two features**. Even if you think "Oh this is useless to the user, because it's missing XYZ**, do it that way. Then show it to test users and ask them, what they miss. Then extend your product.

**Release it early** and have a few early-adopters play with it. **Proactively ask them** and **gather analytics** on how they use your product and what they need.  
Your anticipated killer-feature is not used at all? Throw it out, focus on the most popular thing and direct your design efforts to make this as pretty, easy and useful as possible.

It's generally a really bad idea to go a top-down approach like waterfall. **Be agile**.
It you think "bah, the modern pseudo-management stuff? Never! I trust my waterfall", [**you should finally read the original paper from 1983**](http://sunset.usc.edu/csse/TECHRPTS/1983/usccse83-501/usccse83-501.pdf) - **focus on the foreword page 2 and following**.
Even the author says it doesn't work that way and they had done **prototypes first** to **minimize uncertainty and risk**.

Money quotes:

> The great majority seemed to espouse the following approach: we must write the initial top-down specification [...], so we will know precisely what 
our objectives are before we produce one line of code. This attitude can be terribly misleading and dangerous.  

(p. 3, line 13ff. ) and

> To stretch an analogy slightly, it is like saying that we must specify the 
characteristics of a rocket engine before measuring the burning properties of liquid hydrogen.

(p. 3, line 17/18)