<!-- Fetch and CORS: a walkthrough -->
# Fetch and CORS: A walkthrough

## TL;DR

* The fetch API does allow you to specify how to deal with requests to other domains (also known as "CORS requests")
* There are a few HTTP headers to tell the browser what the server allows in CORS requests
* The fetch API will not send cookies or Auth-Headers by default and doing so needs the server to allow this
* The fetch API will not give access to the body or the response headers of a CORS request. The server can allow this using headers, too.

## The problem with cross-domain requests

The web is an amazing, vast and open platform.
As such, browser vendors, web developers and standards makers need to make sure it is safe for users.

One problem that we're facing on the web is that web apps need to make requests on behalf of the user. Some of these requests may even happen without the user noticing.

There are valid use cases for this: Loading more images as the users scrolls down on a web shop page. Or a web app requesting the logged-in user.

But what happens when web apps could make requests to *any* URL it pleases?

Let's imagine the user has a valid session at bank.example.com - they can access their account or transfer money.

The online banking website makes requests like this:

```javascript
fetch('https://bank.example.com/balance`)
  .then(function (response) { return response.json() })
  .then(function (balanceInfo) { showBalance(balanceInfo[0]) }
``` 
If the user has a valid cookie, it will attach that cookie to the request. The bank's server will use the cookie to check if it is a valid user session and whose account balance it will return.

But what if the user is surfing on their banking website and open a new tab to catpictures.com?

If catpictures.com is evil, they could do the same request and the browser will add the cookie, too. In this case, bank.example.com would give the user's balance away to a complete stranger!

**Luckily that's not how it works!**

Browsers have the so-called "Same Origin Policy" (SOP for short).
Before making a request, they check if the website is coming from the same origin. An origin is the combination of 

* the protocol (HTTP or HTTPS, for instance)
* the domain (e.g. bank.example.com)
* the port (by default 80 for HTTP and 443 for HTTPS)

For example, the URLs `https://example.com` and `https://bank.example.com` **don't have** the same origin.
The URLs `http://example.com/abc/123` and `http://example.com/def/987` **have** the same origin.

The Same-Origin-Policy is not only applied to requests made with `fetch` or `XMLHttpRequest`. It also applies to loading images and videos in some cases.

Imagine the following scenario: The user has private photos - if an attacker knows the URL

## CORS to the rescue!

But there may be times where we do want to allow requests to other origins.

For example if there is an API that returns 