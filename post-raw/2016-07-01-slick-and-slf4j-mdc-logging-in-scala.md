<!-- Slick and slf4j MDC logging in Scala -->
# Slick and slf4j MDC logging in Scala

## TL;DR

* Multi-user applications need log messages to retain **context**, so the situation can be examined on a transaction-basis
* The **mapped diagnostic context**, short `MDC`, allows to put context to all log statements for a single thread
* Scala allows us to build an `ExecutionContext` where we can copy the `MDC` to any new thread that is being used giving us **multi-thread MDC logging**
* Slick requires us to also provide an `Executor` that uses this `ExecutionContext`
* There's a package for that: `de.geekonaut.slickmdc`

## Wait, what is MDC logging?

Imagine you are having a web server. It gets an HTTP request, calls a few functions and serves a response.
Now if you are having some logs, you may see something like this in them:

```
2016-07-01 06:55:01 (INFO) [XNIO-1 I/O-1] : Got request for /login
2016-07-01 06:55:01 (DEBUG) [XNIO-1 I/O-1] : Login for user: bob
2016-07-01 06:55:01 (DEBUG) [DATABASE-1] : Preparing statement SELECT * FROM users WHERE name=? AND password=?
2016-07-01 06:55:02 (ERROR) [DATABASE-1] : Invalid query
...
```

That's not too bad for a logging setup: We've got log levels, so we can toggle a setting to decide how much info we wanna have logged, we have a precise date info and we've even got the threads that were involved. Nice.

But this might not be enough for useful debugging... imagine we're seeing multiple logins at the same time and try to find out which user saw the "Invalid query" error:

```
2016-07-01 06:55:01 (INFO) [XNIO-1 I/O-1] : Got request for /login
2016-07-01 06:55:01 (DEBUG) [XNIO-1 I/O-1] : Login for user: alice
2016-07-01 06:55:01 (INFO) [XNIO-1 I/O-1] : Got request for /login
2016-07-01 06:55:01 (DEBUG) [XNIO-1 I/O-1] : Login for user: bob
2016-07-01 06:55:01 (DEBUG) [DATABASE-1] : Preparing statement SELECT * FROM users WHERE name=? AND password=?
2016-07-01 06:55:01 (INFO) [XNIO-1 I/O-1] : Got request for /login
2016-07-01 06:55:01 (DEBUG) [DATABASE-2] : Preparing statement SELECT * FROM users WHERE name=? AND password=?
2016-07-01 06:55:01 (DEBUG) [XNIO-1 I/O-1] : Login for user: clarissa
2016-07-01 06:55:01 (DEBUG) [DATABASE-3] : Preparing statement SELECT * FROM users WHERE name=? AND password=?
2016-07-01 06:55:02 (ERROR) [DATABASE-2] : Invalid query
...
```

Who saw the invalid query? Well, as long as these messages are that close together it is possible to make an assumption that's very likely to be true: It might be bob, if we assume that `DATABASE-1` corresponds to the first login call (from alice) and `DATABASE-2` corresponds to the second one from bob.

Now that becomes impossibly hard to spot, if these logs aren't close together in a real scenario, where there's more things going on in the system at the same time.

## Context to the rescue

Okay, so we need a way to put the log messages into context, like this:

```
2016-07-01 06:55:01 (INFO) [XNIO-1 I/O-1]  [req-1] : Got request for /login
2016-07-01 06:55:01 (DEBUG) [XNIO-1 I/O-1] [req-1] : Login for user: alice
2016-07-01 06:55:01 (INFO) [XNIO-1 I/O-1]  [req-2] : Got request for /login
2016-07-01 06:55:01 (DEBUG) [XNIO-1 I/O-1] [req-2] : Login for user: bob
2016-07-01 06:55:01 (DEBUG) [DATABASE-1]   [req-1] : Preparing statement SELECT * FROM users WHERE name=? AND password=?
2016-07-01 06:55:01 (INFO) [XNIO-1 I/O-1]  [req-3] : Got request for /login
2016-07-01 06:55:01 (DEBUG) [DATABASE-2]   [req-2] : Preparing statement SELECT * FROM users WHERE name=? AND password=?
2016-07-01 06:55:01 (DEBUG) [XNIO-1 I/O-1] [req-3] : Login for user: clarissa
2016-07-01 06:55:01 (DEBUG) [DATABASE-3]   [req-3] : Preparing statement SELECT * FROM users WHERE name=? AND password=?
2016-07-01 06:55:02 (ERROR) [DATABASE-2]   [req-2] : Invalid query
...
```

We now have a "req-" followed by some sort of ID for each request in our logs. With this we can search and filter our logs for the request we're interested in.

So if all we've got is the log message:

```
2016-07-01 06:55:02 (ERROR) [DATABASE-2] : Invalid query
```

This will be hard to trace back to the login from bob, but if we've got:

```
2016-07-01 06:55:02 (ERROR) [DATABASE-2] [req-2] : Invalid query
```

We can filter the logs for "req-2" and get:

```
2016-07-01 06:55:01 (INFO) [XNIO-1 I/O-1]  [req-2] : Got request for /login
2016-07-01 06:55:01 (DEBUG) [XNIO-1 I/O-1] [req-2] : Login for user: bob
2016-07-01 06:55:01 (DEBUG) [DATABASE-2]   [req-2] : Preparing statement SELECT * FROM users WHERE name=? AND password=?
2016-07-01 06:55:02 (ERROR) [DATABASE-2]   [req-2] : Invalid query
...
```

Much better!

## The Mapped Diagnostic Context

But how can we do that without having to write this context out on every logging call?

After all, this isn't very appealing and error-prone:

```scala
def postLogin(...): Unit = {
  logger.info(s"[req-${params.requestId}] Got request for /login")
  login(params.userName, params.password, params.requestId)
}

def login(userName:String, password:String, requestId): Unit = {
  logger.debug(s"[req-${requestId}] Login for user: $userName")
  // ...
}
```

Not only would we have to add the request ID to every function along the way, but also would we not be able to get this information into logs coming from external, third-party libraries that we use.

Luckily, there's a better way: The **Mapped Diagnostic Context** or **MDC** in short.

If you are using `slf4j` it is exposed via `org.slf4j.MDC` but other logging systems (such as log4j and logback) have similar concepts that slf4j wraps.

Here we go again, this time with the MDC:

```scala
def postLogin(...): Unit = {
  MDC.put("requestId", UUID.randomUUID().toString())
  logger.info("Got request for /login")
  login(params.userName, params.password)
}

def login(userName:String, password:String): Unit = {
  logger.debug(s"Login for user: $userName")
  // ...
}
```

With this, everything that is in the current thread will use the same MDC and we can configure our log system to use content from the MDC in its patterns.

For example, our `logback.xml` might contain the following pattern:

```xml

<property name="defaultPattern" value="%date \(%level\) [%thread] [%X{requestId}]: %message" />

```

With `%X{requestId}` we get whatever we've put into the MDC as `requestId`.

## MDC across threads and execution context

Now there's a little spot on our logging: **It only works if the thread doesn't change**, so our logs look like this right now:

```
2016-07-01 06:55:01 (INFO) [XNIO-1 I/O-1]  [req-2] : Got request for /login
2016-07-01 06:55:01 (DEBUG) [XNIO-1 I/O-1] [req-2] : Login for user: bob
2016-07-01 06:55:01 (DEBUG) [DATABASE-2]   [] : Preparing statement SELECT * FROM users WHERE name=? AND password=?
2016-07-01 06:55:02 (ERROR) [DATABASE-2]   [] : Invalid query
...
```

So if we use a `Thread` or a `Future` or a library like [Slick](http://slick.lightbend.com/) we are losing our precious MDC!

Now let's assume that we're running `login` in a Future, to get a feeling for what we'll need to do to fix this:

```
2016-07-01 06:55:01 (INFO) [XNIO-1 I/O-1]  [req-2] : Got request for /login
2016-07-01 06:55:01 (DEBUG) [ForkJoinPool-1-worker-12] [] : Login for user: bob
...
```

So with the default global execution context, the `Future` is run in a separate thread of a `ForkJoin` threadpool.

To get the MDC across that new thread, we'll need to **provide our own `ExecutionContext`**.

This new execution context will subclass `ExecutionContext` and override its `execute` method.
The method takes a `Runnable` and executes it, but instead we will create our own runnable around it, copy the MDC into the new Thread and submit it to the super method instead:

```scala
import org.slf4j.MDC
import scala.concurrent.ExecutionContext

/**
  * Execution context proxy for propagating SLF4J diagnostic context from caller thread to execution thread.
  */
class MdcExecutionContext(executionContext: ExecutionContext) extends ExecutionContext {
  override def execute(runnable: Runnable): Unit =  {
    val callerMdc = MDC.getCopyOfContextMap // get a copy of the MDC data
    executionContext.execute(new Runnable {
      def run(): Unit = {
        // copy caller thread MDC to the new execution thread
        if(callerMdc != null) MDC.setContextMap(callerMdc)
        try {
          runnable.run
        } finally {
          // the thread might be reused, so we clean up for the next use
          MDC.clear
        }
      }
    })
  }

  override def reportFailure(cause: Throwable): Unit = executionContext.reportFailure(cause)
}
```

You can see how the "copy MDC into the new Thread" works in detail:

1. We obtain a copy of the MDC contents with `MDC.getCopyOfContextMap`
2. If that copy worked, we put it into the MDC of the new Thread by calling `MDC.setContextMap`
3. Once we are done executing the original `Runnable`, we clear the MDC (this is only affects the cloned MDC inside the new Thread)

The `MDC.clear` is a good idea, because we'd get misleading logs if a Thread is reused without having an MDC.

Now all we need to do is create a new `MdcExecutionContext` and use it as our execution context:

```scala

import scala.concurrent.ExecutionContext
import java.util.concurrent.Executors

//...

implicit lazy val executionContext = = new MdcExecutionContext(
    ExecutionContext.fromExecutor(      // this gives us an ExecutionContext we piggyback on in MdcExecutionContext
      Executors.newWorkStealingPool(10) // this creates the ForkJoinPool with a maximum of 10 threads
    )
  )

//...

def postLogin(...): Unit = {
  MDC.put("requestId", UUID.randomUUID().toString())
  logger.info("Got request for /login")
  login(params.userName, params.password)
}

def login(userName:String, password:String): Unit = {
  logger.debug(s"Login for user: $userName")
  // ...
}
```

Okay, cool - now we're good right? Almost...

## Slick and its AsyncExecutor

Here is where we stand right now with our logs:

```
2016-07-01 06:55:01 (INFO) [XNIO-1 I/O-1]  [req-2] : Got request for /login
2016-07-01 06:55:01 (DEBUG) [ForkJoinPool-1-worker-12] [req-2] : Login for user: bob
2016-07-01 06:55:01 (DEBUG) [DATABASE-2]   [] : Preparing statement SELECT * FROM users WHERE name=? AND password=?
2016-07-01 06:55:02 (ERROR) [DATABASE-2]   [] : Invalid query
...
```

So we **now have the MDC in the ForkJoinPool for Futures** but we still **don't have it for the Thread that Slick uses**.
That's because Slick has its own `Executor`, the `AsyncExecutor` as [defined here](https://github.com/slick/slick/blob/3.1/slick/src/main/scala/slick/util/AsyncExecutor.scala).

This `AsyncExecutor` is responsible for creating a new threadpool using a custom `ThreadFactory` and it sets the ExecutionContext.
So we need our own `Executor`: The `MdcAsyncExecutor`!

```scala
import java.util.concurrent._
import java.util.concurrent.atomic.AtomicInteger

import scala.concurrent._
import com.typesafe.scalalogging.StrictLogging
import slick.util.AsyncExecutor

/** Taken from the original Slick AsyncExecutor and simplified
  * @see https://github.com/slick/slick/blob/3.1/slick/src/main/scala/slick/util/AsyncExecutor.scala
  */

object MdcAsyncExecutor extends StrictLogging {
  /** Create an [[AsyncExecutor]] with a fixed-size thread pool.
    *
    * @param name The name for the thread pool.
    * @param numThreads The number of threads in the pool.
    */

  def apply(name:String, numThreads: Int): AsyncExecutor = {
    new AsyncExecutor {
      // We use a custom ThreadFactory to be able to:
      // 1. Set the thread name as we like
      // 2. Set the daemon option on threads (i.e. threads get killed, when all non-daemon threads terminate, i.e. they get killed when the app shuts down)
      // 3. Set the priority to normal priority for each thread
      val tf = new DaemonThreadFactory(name + "-")

      lazy val executionContext = {
        // We create a threadpool with a fixed size, which can be specified as an argument to this method
        new MdcExecutionContext(ExecutionContext.fromExecutor(Executors.newFixedThreadPool(numThreads, tf)))
      }

      def close(): Unit = {}
    }
  }

  def default(name: String = "AsyncExecutor.default"): AsyncExecutor = apply(name, 20)

  private class DaemonThreadFactory(namePrefix: String) extends ThreadFactory {
    private[this] val group = Option(System.getSecurityManager).fold(Thread.currentThread.getThreadGroup)(_.getThreadGroup)
    private[this] val threadNumber = new AtomicInteger(1)

    def newThread(r: Runnable): Thread = {
      val t = new Thread(group, r, namePrefix + threadNumber.getAndIncrement, 0)
      if(!t.isDaemon) t.setDaemon(true)
      if(t.getPriority != Thread.NORM_PRIORITY) t.setPriority(Thread.NORM_PRIORITY)
      t
    }
  }
}
```

Now to use our fresh `MdcAsyncExecutor`, we'll supply it when creating the `Database` instance:

```scala
// Threads are named "Database-X" where "X" is the thread number &amp; there will be 10 threads in the pool.
val db = Database.forDataSource(connectionPool, MdcAsyncExecutor.apply("Database", 10))
```

## Introducing de.geekonaut.slickmdc

Now, you don't need to create your own `MdcAsyncExecutor` and `MdcExecutionContext` all the time, because I created a handy little package for you: `de.geekonaut.slickmdc` that contains both classes.

In your `build.sbt` you can add the dependency by adding:

```scala
libraryDependencies ++= "de.geekonaut" %% "slickmdc"  % "1.0.0"
```

Then, whenever needed, import the library with

```scala
import de.geekonaut.slickmdc._
```

## Sample project

There is a sample project available that starts a web server and reads from a SQLite database file using slick.
The sample [can be found here](https://github.com/avgp/slick-mdc-sample).
