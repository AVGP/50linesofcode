<!-- Five rules to stay sane and efficient when handling downtimes -->
# Five rules to stay sane and efficient when handling downtimes
## Best practices for handling incidents

Downtimes, Crashes, Incidents, System Failures - they have many names, but most people involved with technology to some degree have experienced at least one at some point in their career.

I've seen many different teams and many different incarnations of the above-mentioned situations. I've been on the different sides of them: The user, the developer, the system administrator, the site reliability engineer and the consultant.

Some of them I have caused, some of them I helped to resolve and in some of them I was a mere bystander.

This post is the distilled essence on how different teams that I had the pleasure of being a member, dealt and deal with the stress and the specific characteristics of these tense situations to ensure timely and proper resolution.

## TL;DR

Your primary goal is to end the incident and restore normal operations as quickly as possible while being under a lot of stress and sometimes in front of an audience of not-very-helpful onlookers. This article describes five rules I extracted from my personal observations of past incidents and that turned out to be helpful when trying to resolve those situations quickly and without losing your mind.

![](/images/post-images/this-is-fine.png)

## When fecal matter hits the rotary air impeller

1. Stay calm (no, **really**)
2. Think out loud and be precise
3. Remove noise &amp; distractions
4. Bundle up external communication
5. Keep a paper trail for later

Let's look at those rules in more detail:

### 1. Stay calm

This seems obvious and is definitely easier said than done, but it's crucial.
Yes, your systems may be down and all phones in the office may ring - but you know what? That's the reality now, so stop worrying and get busy changing this reality.

There's literally nothing else that makes sense - if people yell at you or stress you out in other ways, look them dead in the eye and say "Do you want me to sit down and fix this or do you wanna continue like this, which is a guarantee to prolong this situation. You choose.".

Also: Unless you work in rocket science, medicine or industrial control it's unlikely that the situation you find yourself in will cost lifes or hurt people. Finances can be figured out, so keep perspective: Even if it feels like it, this is not the end of the civilised world.

All those "What if" things in your head? Screw 'em, you have stuff to tend to right now. Breath in, breath out.

### 2. Think out loud and be precise
Chances are, that you are not alone in this.

Even if you are alone, it may actually help to talk things out loud, as that gives you a little more time to reflect on the actions you want to take.

This rule is about keeping you and your team in sync about what you all are about to do and what you did already. The goal of this is to reduce confusion, avoid doing things multiple times and straight up messing with actions of each other.

So you should **clearly** say what you are about to do *before* you do it, what you do *when you do it* and what you did *once you did it*

Be sure to be precise in the terms you use to avoid confusion. If anyone isn't sure what is meant by an expression, **ask and clarify**!

### 3. Remove noise &amp; distractions

Disaster attracts onlookers.

Onlookers bring distraction and often noise - and that's the last thing you want around you, when you are trying to fix a live system.

To allow maximal concentration and clear communication between the people working to resolve the situation, remove anyone and anything that is not part of the troubleshooting process.

Yes, Marketing / PR and customer support need to know what's happening, but you'll keep them posted in an efficiant, non-disruptive way (see rule #4 for this). But they won't be part of the "problem solvers", so they should leave that to you and go somewhere else.

### 4. Bundle up external communications

While you and your team are in the middle of fixing the problem, you are very concentrated. That's good. But don't forget the world outside of the room...

It can take pressure and anxiety away to know that people outside your "inner circle of troubleshooters" know what's happening - but it's not very helpful if people stop by every 5 minutes to ask for updates. The same for everybody typing into chat tools or email programs to keep people updated.

That's why you should bundle up your communication with the "outside world", be it your colleagues from other teams, your management or your users.

Have a single, pre-defined channel to communicate updates and have a designated person among the troubleshooters keep this channel updated. This channel does not have to be bidirectional, but it helps to get feedback from the other side.

The updates should be short and relatively regular (say, every 15 minutes) and be posted even if they say "We are still investigating the situation." if no new details are available.

It helps to keep the recipients calm and keep them posted on new developments.
Refrain from giving ETAs, however, as it's usually nearly impossible to guess those.

Once you are confident the situation is resolved, tell them via the defined channel, too.

### 5. Keep a paper trail for later

Things are on fire, so your focus is absolutely on fixing things. And that's correct!

If you have a little capacity left, you should spend this with taking notes in written form.

Those notes are absolutely invaluable when the smoke clears and you have time to look back and ask questions like:

* What exactly happened?
* Why did this happen?
* What did we do to fix the issue?
* What can we do to prevent this situation in the future?

Having written notes on how the situation unfolded and what you and your team have been doing about it - along with hypotheses at the time - is very useful to find answers to these questions.

Answering these questions helps to learn from the problems that lead to the situation, how to spot and prevent them and what to do, if a similar event happens.

## Conclusions

Keep the five rules in mind and try to keep as calm as possible.
It's fine to be nervous, but don't freak out.

Things are on fire, but it's not the end of the world.
Focus on resolving the issue and remove all distractions - any big talks should happen *after* the issue is resolved.

With this in mind, next time things go sideways: Take a deep breath and get busy fixin'!
