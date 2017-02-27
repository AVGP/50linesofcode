<!-- CORS - a guided tour -->
# CORS - a guided tour

## TL;DR

* The [Same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy) does not prevent requests being made to other origins, but disables access to the response from JavaScript.
* [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) headers allow to access cross-origin responses.
* CORS together with credentials require caution.

## Our example
I will only show the request handling code here, but the [full example is available on Github](https://github.com/avgp/cors-demo-app).

Let's start with an example. Say we have an amazing website with a login to protect some private data we made available to our users at `/private`.  

```javascript
app.get('/private', function(req, res) {
  if(req.session.loggedIn === true) {
    res.send('THIS IS THE SECRET')
  } else {
    res.send('Please login first')
  }
})
```

We won't make this example too complicated, so let's say everyone logs in using the same password: `secret` and we will use cookies to protect the private data:

```javascript
app.post('/login', function(req, res) {
  if(req.body.password === 'secret') {
    req.session.loggedIn = true
    res.send('You are now logged in!')
  } else {
    res.send('Wrong password.')
  }
})
```

Our website also offers a public API at `/public` to get some public data, too:

```javascript
app.get('/public', function(req, res) {
  res.send('Public info')
})
```

## Requesting our API via AJAX from other domains
Now our "API" isn't particularly well-designed or fancy, but we could allow others to fetch data from our `/public` URL. Say, our API lives at `good.com/public` and our client is hosted on `thirdparty.com`, the client might run the following code:

```javascript
fetch('http://good.com:3000/public')
  .then(response => response.text())
  .then((result) => {
    document.body.textContent = result
  })
```
But that doesn't work!

Let's take a look at the network tab for `http://thirdparty.com`:

![The network request was successful](http://50linesofco.de/images/post-images/cors/network-before-cors.png)

The request was successful, but the result was not available. The reason can be found in the JavaScript console:

![The console shows that a missing CORS header causes the problem](http://50linesofco.de/images/post-images/cors/js-errors-without-cors.png)

Aha! We are missing the `Access-Control-Allow-Origin` header. But why do we need it and what is it good for?

## The Same-Origin Policy
The reason why we won't get the response in JavaScript is the *Same-Origin Policy*. This policy was aimed at making sure that a website can't read the result from a request made to another website.

For instance: If you are on `example.org` you would not want that website to make a request to your banking website and fetch your account balance and transactions.

The Same-Origin Policy prevents exactly that.

The "origin" in this case is composed from

* the protocol (e.g. `http`)
* the host (e.g. `example.com`)
* the port (e.g. `8000`)

So `http://example.org` and `http://www.example.org` and `https://example.org` are three different origins.

## A note on CSRF

Note that there is a class of attacks, called *Cross Site Request Forgery* that is not affected by the Same-Origin Policy.

In a CSRF attack, the attacker makes a request to a third party page in the background, for instance by sending a POST request to your bank website. If you have a valid session with your bank, any website can make a request in the background that will be carried out unless your bank uses counter measures against CSRF.

Note that despite the Same-Origin Policy being in effect, our example request from `thirdparty.com` was successfully carried out to `good.com` - we just could not access the results. For CSRF we don't need the result...

## Enabling CORS for our public API

Now we *do* want to allow the JavaScript on third party sites (such as `thirdparty.com`) to access our API responses. To do so, we can enable the CORS header as the error said:

```javascript
app.get('/public', function(req, res) {
  res.set('Access-Control-Allow-Origin', '*')
  res.send('Public info')
})
```

Here we are setting the `Access-Control-Allow-Origin` header to `*` which means: Any host is allowed to access this URL and the response in the browser:

![The response is available once we set the CORS header](http://50linesofco.de/images/post-images/cors/basic-cors.png)

## Non-simple requests and preflights

The previous example was a so-called *simple request*. Simple requests are `GET` or `POST` requests with a few allowed headers and header values.

Let's change our API a little bit:

```javascript
app.get('/public', function(req, res) {
  res.set('Access-Control-Allow-Origin', '*')
  res.send(JSON.stringify({
    message: 'This is public info'
  }))
})
```

And `thirdparty.com` changes the implementation a little, too:

```javascript
fetch('http://good.com:3000/public', {
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then((result) => {
    document.body.textContent = result.message
  })
```

But this breaks thirdparty.com again!
This time the network panel shows us the reason:

![The request has been preflighted with an OPTIONS request](http://50linesofco.de/images/post-images/cors/cors-preflight.png)

Any request that is using a method that isn't `GET` or `POST` or uses a content type that isn't
* `text/plain`
* `application/x-www-form-urlencoded`
* `multipart/form-data`
or any header that isn't [allowed for simple requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Simple_requests) requires a *preflight request*.

This mechanism is meant to allow web servers to decide if they want to allow the actual request. The browser sets the `Access-Control-Request-Headers` and `Access-Control-Request-Method` headers to tell the server what request to expect and the server answers with corresponding headers.

Our server doesn't answer with these headers yet, so we need to add them:

```javascript
app.get('/public', function(req, res) {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.set('Access-Control-Allow-Headers', 'Content-Type')
  res.send(JSON.stringify({
    message: 'This is public info'
  }))
})
```

Now thirdparty.com can access the response again.

## Credentials and CORS
Now let's assume that we are logged in on good.com and can access the `/private` URL with the sensitive information.

With all our CORS settings, can another site, say `evil.com` get this sensitive information?

Let's see:

```javascript
fetch('http://good.com:3000/private')
  .then(response => response.text())
  .then((result) => {
    let output = document.createElement('div')
    output.textContent = result
    document.body.appendChild(output)
  })
```

No matter if we are logged in to good.com or not, we will see "Please login first".

The reason is that the cookie from good.com will not be sent when the request comes from another origin, in this case evil.com.

We can ask the browser to send the cookies along, even when it's a cross-origin domain:

```javascript
fetch('http://good.com:3000/private', {
  credentials: 'include'
})
  .then(response => response.text())
  .then((result) => {
    let output = document.createElement('div')
    output.textContent = result
    document.body.appendChild(output)
  })
```

But again this won't work. That is great news, actually. Imagine any website could make authenticated requests - the request will be made but won't send the actual cookie and the response is inaccessible.

So, we don't want evil.com to be able to access this private data - but what if we want thirdparty.com to have access to `/private`?

In this case we need to set the `Access-Control-Allow-Credentials` header to `true`:

```javascript
app.get('/private', function(req, res) {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Credentials', 'true')
  if(req.session.loggedIn === true) {
    res.send('THIS IS THE SECRET')
  } else {
    res.send('Please login first')
  }
})
```

But this will still not work. **It's a dangerous practice to allow every authenticated cross-origin requests**.

The browser does not allow us to make this mistake this easily.

When we want to allow thirdparty.com access to `/private` we can specify this origin in the header:

```javascript
app.get('/private', function(req, res) {
  res.set('Access-Control-Allow-Origin', 'http://thirdparty.com:8000')
  res.set('Access-Control-Allow-Credentials', 'true')
  if(req.session.loggedIn === true) {
    res.send('THIS IS THE SECRET')
  } else {
    res.send('Please login first')
  }
})
```

Now `http://thirdparty:8000` has access to the private data as well, while evil.com is locked out.

## Allowing multiple origins
Now we have allowed one origin to do cross origin requests with authentication data. But what if we have multiple third parties?

In this case, we probably want to use a whitelist:

```javascript
  var ALLOWED_ORIGINS = [ 'http://anotherthirdparty.com:8000', 'http://thirdparty.com:8000' ]

app.get('/private', function(req, res) {
  if(ALLOWED_ORIGINS.indexOf(req.headers.origin) > -1) {
    res.set('Access-Control-Allow-Origin', req.headers.origin)
  } else {
    res.set('Access-Control-Allow-Origin', '*')        
  }
  res.set('Access-Control-Allow-Credentials', 'true')
  if(req.session.loggedIn === true) {
    res.send('THIS IS THE SECRET')
  } else {
    res.send('Please login first')
  }
})
```

**Do not directly send `req.headers.origin` as the CORS origin header. This would allow any website access to authenticated requests to your site.** There may be exceptions to this rule, but think twice before implementing CORS with credentials without the whitelist.

## Summary

In this article we've looked at the [Same-Origin Policy](https://en.wikipedia.org/wiki/Same-origin_policy) and how we can use [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) to allow cross-origin requests when required.

This requires server- and client-side settings and depending on the request will cause a *preflight* request.

Additional care should be taken when dealing with authenticated cross-origin requests. A whitelist can help to allow multiple origins without risking to leak sensitive data (that is protected behind an authentication).
