{
  "title": "JSON RPC 2.0 - for simple and powerful APIs"
  "date": "2016-03-07 16:25:00 GMT"
}

# JSON RPC 2.0
## For simple and powerful APIs

## TL;DR

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

Here's the basics:



## Implementations

## The good, the bad, the ugly
