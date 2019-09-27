Main diffs

Promise is eager, whereas an Observable is lazy,
Promise is always asynchronous, while an Observable can be either synchronous or asynchronous,
Promise can provide a single value, whereas an Observable is a stream of values (from 0 to multiple values),
You can apply RxJS operators to an Observable to get a new tailored stream.

Avoiding memory leaks

To consume a stream we need to subscribe to that stream. When we subscribe to that stream a subscription will be created. That subscription will keep on living until the stream is completed or until we unsubscribe manually from that stream. Managing subscriptions is very important and in a number of cases we will have to manually unsubscribe an existing subscription to avoid memory leaks. Take this example for instance:

Avoiding nested subscribes

Nesting subscribes is something that needs to be avoided as much as possible. It makes the code unreadable, complex, and introduces side effects. It basically forces you to NOT think reactively. Take this Angular example for instance:

