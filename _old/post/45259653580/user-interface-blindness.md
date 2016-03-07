{
  "title": "User interface blindness",
  "date": "2013-03-13 10:00:00 GMT"
}

---

#User interface blindness
You know that situation: The interface of your favorite webapp changed and you're lost. Even when the interface changes are relatively subtle and make sense.

While that is intrinsically obvious, it came to me as a surprise *how* blind we get when we're used to an interface.

I will take [Confluence](http://www.atlassian.com/software/confluence/overview/team-collaboration-software?_mid=eda0b423fe78c61516af57d6b8be0d65&amp;gclid=CM6fyfaK-bUCFUWS3godgG8Axw) as an example.  
Confluence is a nice wiki software we use for pretty much all of our internal know-how transfers. It integrates pretty well with [Jira](http://www.atlassian.com/software/jira/overview), the Atlassian Issue Tracker.  
When I started to use the two, it was in version 4, the two interfaces were working in different ways. To accomplish similar things you had to look at different places to do them in the different applications - but the interfaces looked relatively similar to each other.  
While that sounds like a bad thing, it worked remarkably well in reality, because your mind is aware that you're in different contexts. Either you create an Issue in Jira (which means: Look at the middle of the top navigation and use the "Create" button) or you add a page in the wiki (which means: Look at the right hand navigation controls and use the "Add" dropdown).

Here are some screenshots to visualize that:  
**The old Confluence**  
![](http://media.tumblr.com/c62f810e92041f7086f53431e2e49923/tumblr_inline_mjl6x26UeV1qz4rgp.png)
**JIRA5**  
![](http://media.tumblr.com/b9eb2d823cb048f3f942dcd0d083c35a/tumblr_inline_mjl72qeN2P1qz4rgp.png)

JIRA5 has been around on Atlassians cloud service substantially longer than the latest Confluence, so we got used to this inconsistency.

But a few weeks ago Atlassian did a reasonable change in the Confluence UI to make it more user friendly:
![](http://media.tumblr.com/53fe6d9131453470939c190957899685/tumblr_inline_mjl78c0bu81qz4rgp.png)

That is a perfectly reasonable change - it makes the main navigation in Confluence and JIRA consistent. You don't need to think about the context you're in anymore - you alway create content with the button in the middle of the top navigation bar.
The only nasty thing is: Confluence still has *some* controls on the right hand side below the navigation bar:
![](http://media.tumblr.com/3bb2d65d2056aa503d0d215d51bdfb66/tumblr_inline_mjl7eiKFDL1qz4rgp.png)

The problem here: The presence of this old-fashioned right submenu gives you the cue that - while the interface changes are more or less subtle, the old mechanics have been kept. You instinctively look for the "Add" link there. Without finding it.

As the wording for creating content has been "Add" in Confluence so far, your brain now scans the site for something that says "Add". Without success.  
Now your brain has to go creative, because the clues, that make the workflow feel natural and obvious to you, have failed.
(At this point: I highly recommend the great book [Don't make me think](http://www.sensible.com/dmmt.html) which gives great insights on those stuff)

This little stupid thing took me some minutes to figure out - it made me feel dumb. And not only me. A coworker asked me why he can't add pages anymore but after I told him to search for "Create" on the page, he was rather surprised to find it. In the middle of the menu bar.

So when you refurbish your designs to make them more consistent and intuitive, do this really graduately. If, for example, Atlassian hadn't changed all of the visual clues (i.e. text, position and appearance) it may not have been so confusing.  
If they would have moved it to the middle of the navigation bar while still displaying the "+" symbol and still labeling it "Add", it may have been easier to spot. Changing "Add" to "Create" and removing the symbol a few months later would have been fine, because you already would've known where to look.

While this obviously applies to redesigns, it **also applies to making new designs**, because there are a bunch of **conventions** (or "prejudices" if you wanna put it a little more negative).

For example when you plan to have a search function on your website, you should put them in the top area. That's where people expect it, because most of the popular websites have it there.

Login/Signup/Logout is another frequent component. It usually lives in the top right hand corner. If you put it at the bottom left, your users will hate you.
I even had trouble once when I put the signup link on the top left hand corner - literally 75% of my testers (a group of 20 people) did not know where to sign up after having looked at the site for 10 seconds.
After I put it on the right hand corner, another group of 20 people found it right away.