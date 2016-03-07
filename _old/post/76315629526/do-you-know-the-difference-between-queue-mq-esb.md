{
  "title": "Do you know the difference between Queue, MQ, ESB etc.?",
  "date": "2014-02-11 11:00:44 GMT"
}

---

#Do you know the difference between Queue, MQ, ESB etc.?
Because I wasn't fully aware of it until today. This whole topic in that much detail is new to me - and this is a discussion start, so feel free to engage here.

TL;DR
--------

The quick rundown:
- Message Queues for asynchronous communication in your system
- Message Brokers for loosely coupled components
- Integration frameworks if you need to make them understand each other first
- ESBs if you're facing a zoo of services and tricky requirements (e.g. governance)
- Integration suites if you need BPM or MDM in the picture

If you have input - I want to learn more!
If you never heard most of those words from above - read on!

Naming things is hard!
--------

> "There are 2 hard problems in computer science: 
>  caching, naming, and off-by-1 errors" 
> 
>  -- Phil Karlton

This topic is a wonderful proof for the saying from above.  
Naming things is tricky - differentiation isn't always straight forward and there are grey areas everywhere.

I think it is fundamentally important to know what you're talking about when the buzzwords start falling like raindrops on a rainy afternoon in autumn... and you should make sure everybody in the discussion has a cristal clear idea what you mean when you use them.  
If anybody is not on the same page with you on that, solution finding is going to be horrible.

Who's who?
---------

We're gonna encounter the following players in the naming game:

- Message transports / Queues
- Message brokers / Message queues
- Integration frameworks
- Enterprise Service Buses
- Integration Suites

So if you're thinking about using any of these terms read on!

Transports / Queues
-------

Let's start with the simplest thing first: The message transports and queues.

Those are relatively dumb.  
In the case of transports they're just pushing data around from A to B, generically speaking. Examples are Thrift, ICE, CORBA or ZeroMQ (0mq being a bit special, as it has some features of the next higher layer).

Queues are dumb too. You push stuff in and take stuff out eventually. That's it. Examples are Pipes, ring-buffers, stacks or even DBs (e.g. Redis) can be used for this.

These are primitive building blocks to implement interesting services on top of them. Those services may be able to masquerade the type of data structure they operate on, but choosing the solution with the proper data structure for your use case is important.  
Queues are great for asynchronous operations, where the time between pushing and removing doesn't matter so much, but messages should never be lost (as queues can be implemented as persistent storage), while message transport are great when the delay should be minimal or you want to fan out to a large audience - guarantees for delivery may be available, too - to a certain extent.

Message queues / Message brokers
-------

A message queue uses a queue (well, duh!) to establish asynchronous communication between different parties (services for example) while adding a few features on top of the queue implementation, such as:

1. Durability (resilience)
2. Policies (e.g. message TTL, terms of delivery, batching, etc)
3. Security (access control)
4. Routing (pub/sub, point-to-point, etc.)

Message brokers, on the other hand, provide loose coupling between components without necessarily being asynchronous or queue-based at all. They, too, provide a few additional services on top of their lower layer:

1. Routing
2. Multiplexing / De-multiplexing (i.e. aggregation and decomposition of messages from/into multiple messages to different receipients)
3. Security
4. Policies
5. Durability (resilience)
6. Transformation (translation of messages between formats)

Here things usually get blurry - many solutions are both (message queue and message broker) - for example RabbitMQ or QDB.  
Samples for message queues are Gearman, IronMQ, JMS, SQS or MSMQ.  
Message broker examples are Qpid, Open AMQ or ActiveMQ.

Again, things are hard to tell apart... especially with popular tools like RabbitMQ being citizen of both worlds it is tricky to make sure everybody is on the same page...

So now we had a look at this layer, it becomes clear that message queues are great if you're just after making some components asynchronous - but there's a gradient into the world of message brokers, which can also be asynchronous, but provide more sophisticated communication patterns.  
Message brokers aim primarily for decoupling and help integrating different components, without having to know too much about your communication partners. For this to work, they provide the transformation functionality to make sure the peers can understand each other.

If you ever find yourself implementing message transformation on top of a message queue, you know have a way to avoid that!

Integration frameworks
-------

This is often meant when people bring "Enterprise Service Bus" to the table, but it isn't as powerful as one, yet more powerful than message brokers.

Integration frameworks are basically specialized message brokers for integrating different pieces of software with each other.  
They usually ship with a selection of connectors (e.g. FTP, HTTP, AMQP, SMTP and what not). They may also support some enterprise application integration patterns ([EAI patterns](http://www.eaipatterns.com/)).

Examples for those beasts are Spring Integration Framework or Apache Camel.

These are great if you're going to make different systems talk to and understand each other. If you're building something that speaks the same language anyway, you may be better off with a message queue or message broker, I guess.

Enterprise Service Buses
--------

This is a widely-used buzzword. So what's this thing about, then?

This is the go-to solution for service-oriented architectures - it's basically a really smart and resilient integration framework.

In addition to the integration framework it provides:

- Monitoring of the services and the messages passed between them
- Deployment and service version controlling
- Scheduling, mapping, QoS management, error handling and more
- load balancing between services of the same type and concurrency control

The twist is, that most functionality is actually provided as a service on the bus - routing for example or transformations.

ESBs come with a host of tools for Monitoring, Auditing, managing routes and service bindings, etc. That's really handy for critical messaging between a large number of components within one system.

Samples for ESBs are Apache ServiceMix or Synapse, BizTalk, JBoss ESB, Open ESB or Mule.

Integration Suites
------

Last but not least: Integration Suites.  
Those add even more on top of the ESBs, such as:

- BPM integration
- [MDM](en.wikipedia.org/wiki/Master_data_management) services

So the integration suites are basically ESBs with business process logic on top.

Wrap-up
-------

Phew. What a ride. I am pretty sure I missed something, maybe I even misunderstood bits and pieces - but one thing is clear: It's important to figure out what exactly you want and how it's actually called.

If you just want to decouple components of a small system, an ESB may be overkill but if you need to take data quality or governance into account, it may not even be enough for you.

I'm looking forward to hear your input :)