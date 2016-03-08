{
  "title": "JSON RPC 2.0 - for simple and powerful APIs",
  "date": "2016-03-09"
}

---

# JSON RPC 2.0
## For simple and powerful APIs

## TL;DR

JSON-RPC 2.0 is a *operation-oriented*, *transport-agnostic* way to call methods on a server by using JSON-messages.
It supports *batching of operations* as well as so-called notifications aka "fire &amp; forget".
The specification is rather short (921 words, including sample code and tables) and easy to implement and there's a variety of implementations available to choose from.

![](/images/post-images/json_rpc_omit.gif)

## REST or RPC

In the recent years, we've made [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) the gold standard of APIs.

It's nice in many cases, because the web is fundamentally about transferring and modifying resources. However, this is not always a good fit for an application.

Generally speaking, REST is an architecture pattern that defines a few constraints. These constraints aren't per se incompatible with [RPC](https://en.wikipedia.org/wiki/Remote_procedure_call).

The big difference between the two styles is in the way you think and communicate between client and server:

In REST architectures you are concerned with **resources** and how to represent and modify them, while in RPC you are concerned with **operations**.

It's also worth mentioning that many people conflate "REST" with the HTTP implementation of REST, which isn't the only way to implement a REST-API.

But now, without further ado, let's see how different common tasks look like when implemented as REST or RPC:

| Purpose | (HTTP-)REST | RPC |
| ------- | ----------- | --- |
| Get list of users | GET /users | users.list |
| Add new user | POST /users | users.create |
| Edit user | PUT /users/id | users.edit(id) |
| Delete user | DELETE /users/id | users.delete(id) |
| Login | POST /users/login | users.login |
| Calculate shipping fee | GET /orders/shipping/fee | orders.calculateShipping |

While one might choose to implement the last two rows differently in REST, it comes to show that for [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) operations REST, especially HTTP-REST, is very obvious.
However when there is operations beyond those basic operations, REST isn't as obvious (is "login" a `POST` to `/sessions` or rather a separate operation on `/users`?).

For RPC, on the other hand, the freedom in how you name and structure your API might be overwhelming and can easily lead to inconsistency.

Also, depending on the implementation of RPC, you may not fully leverage the transport mechanism - but if you have to serve different transport mechanisms at the same time, this may not be a big downside either.

**In short: REST is concerned with resources, RPC with operations** - pick what suits your application and domain best.

## JSON-RPC

JSON-RPC is an RPC-mechanism that uses JSON to encode the procedure call.
[The specification](http://www.jsonrpc.org/specification) is rather short and easy to digest.
It outlines how to call an operation on the server, how messages should look like and how to handle errors.

JSON-RPC is also transport-agnostic so you can transmit these messages by any means of your liking, e.g. HTTP, Web Sockets or messenger pidgeon depending [on what's the fastest in your region](http://news.bbc.co.uk/2/hi/africa/8248056.stm).

It also allows another nice thing: Batch requests.
Batch requests means that a single message can contain multiple procedure calls in one batch and the response will contain the results for each of the calls, again as one batch. This really comes to shine, if all methods can work in parallel and thus the time until the response can be generated is limited to the slowest procedure.

### Message content

Each message has to be valid JSON, containing the following elements:

* `jsonrpc` with a value of `2.0` to mark this as a valid JSON-RPC 2.0 message
* `method` with any string that identifies a valid procedure on the server

In addition to these two mandatory fields, there's two more optional ones:

* `id` that can be any string or integer (theoretically also `null` but that's discouraged)
* `params` which can be a dictionary with parameter names and corresponding values or an array of unnamed parameters

### Notifications

The fact that `id` is optional might be surprising at first, but the reason is rather simple:
If you need to call a procedure but you do not care about the result, you can send a so-called *notification*, which is a JSON-RPC message without the `id`.

The result of a JSON-RPC call with an ID will be answered by the server with a response containing the same ID.
A *notification* on the other hand (JSON-RPC call without ID) must never be getting a response from the server.

### Response: Result or error

#### The response message format

Any response has two mandatory fields:

* `jsonrpc` with the value "2.0" to indicate a JSON-RPC v2.0 message
* `id` which has the same value as the corresponding procedure call message

#### Success or error

Success or error responses are defined by two simple parameters in the response message:

* `result` for successful calls
* `error` for anything else

Only one of the two can be present in the response - it's either an error or a result.

#### Results

The `result` field can contain any data, including a dictionary, like the `params` field. This holds the result of the called procedure.

#### Errors

Errors have a predefined format, but still allow for free-form data along the predefined fields.

The contents of the `error` field should look like this:

* `code` is an (usually negative) integer (see below for reserved error codes)
* `message` a short (usually a single sentence) human-readable error message
* `data` is a free-form field that can contain any data you'd like to pass along with the error response

#### Error codes

There are predefined, reserved values for the `code` field:

| Value | Meaning | Description |
| ----- | ------- | ----------- |
| -32700 | Parse error | The message could not be parsed as JSON |
| -32600 | Invalid message | The message is not a valid JSON-RPC request |
| -32601 | Invalid method | The requested method does not exist or isn't available |
| -32602 | Invalid params | The specified parameters are invalid or do not fit this method |
| -32603 | Internal error | An internal server error has happened |
| -32000 to -32099 | Implementation-defined | The JSON-RPC implementation can define these freely |

All other error codes can be used as application-specific error codes.

### Implementations

If this all sounded promising, you might be happy to find that not only the specification is [rather short and comprehensible](http://www.jsonrpc.org/specification), but there's also many implementations to pick from.

Alternatively, especially when you use a subset of JSON-RPC 2.0 for internal purposes, implementing a custom client isn't that much effort.

[The npm module for server and client, including websocket and raw socket support](https://www.npmjs.com/package/json-rpc2) for instance has ~43k lines of code, but the simplistic client I am using in an internal project has 50 lines of javascript.

[The incomplete list of implementations](https://en.wikipedia.org/wiki/JSON-RPC#Implementations) covers you for most of the programming languages and use cases, so go ahead and try it out!
