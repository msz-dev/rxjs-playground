//-------------------General usage stuff---------------------------

const { Observable } = require('rxjs');
const { map, tap} = require('rxjs/operators');


// Promise usage - Handlers work asynchronous
function handler1(value) {
    console.log(`I am handler 1 with value '${value}'`);
}

function handler2(value) {
    console.log(`I am handler 2 with value '${value}'`);
}

// Observable usage - Handlers work synchronous and asynchronous
function nextFunc(value) {
    console.log(`I am the 'next' function with value ${value}:`);
  }
  
  function anotherNextFunc(value) {
    console.log(`I am another 'next' function with value ${value}:`);
  }
  
  function errorFunc(error) {
    console.log("Caught error: " + error);
  }
  
  function completeFunc() {
    console.log("Completed");
  }

//-------------------Callback---------------------------
// let math = 0;

// function doSomething(value, callback) {
//     console.log(`received a value '${value}' and just using a callback!`);
//     callback();

// }
// function myCallback() {
//     setTimeout(() => {
//         console.log('calling the first callback!');
//     }, 2000);
// }

// function doSomeMath(a, b) {
//     setTimeout(() => {
//         math = a + b;
//         console.log(`doSomeMath finished ${math}`);
//     }, 4000);
// }

// doSomething(10, myCallback);

// doSomeMath(10, 20);
// console.log(`I know how to do math, yaaay ${math}`);
// console.log('Exiting main');


//-------------------Promise---------------------------


//-------------------just executing
// Eager
// const promise = new Promise(resolve => {
//     console.log("Executing...");
//     resolve(Math.random());
// });
// promise.then(result => console.log(result));
// promise.then(result => console.log(result));


//-------------------registering a handler
// console.log("- Creating promise");
// const promise = new Promise(resolve => {
//     console.log("- Promise running");
//     resolve(1);
// });
// console.log("- Registering handler");
// promise.then(handler1);
// promise.then(handler2);
// console.log("- Exiting main");


//-------------------not cancellable
// const promise = new Promise(resolve => {
//     setTimeout(() => {
//         console.log("Async task done");
//         resolve();
//     }, 2000);
// });
// promise.then(() => console.log("Handler"));


//-------------------multicast
// const promise = new Promise(resolve => {
//     console.log("Executing...");
//     // throw new Error('java.lang.NullPointerException BOOOOM!!');
//     resolve(Math.random());
// });

// promise.then(result => console.log(result)).catch(error => console.log(`Oh noes! ${error}`));
// promise.then(result => console.log(result)).catch(error => console.log(`Oh noes! ${error}`));


//-------------------Observables---------------------------


//-------------------just executing
// Lazy 
// const observable = new Observable(observer => {
//     console.log("Executing...");
//     observer.next(Math.random());
// });
// observable.subscribe(result => console.log(result));
// observable.subscribe(result => console.log(result));


//-------------------registering a handler

// console.log("- Creating observable");
// const observable$ = new Observable(observer => {
//     console.log("- Observable running");
//     observer.next(1);
// });

// console.log("- Registering handler");
// observable$.subscribe(handler1);
// observable$.subscribe(handler2);
// console.log("- Exiting main");


//-------------------piping

// const piped = observable$.pipe(
//     tap(e => console.log('little tap')),
//     map(e => console.log('look, a map!'))
// );

// piped.subscribe(nextFunc, errorFunc, completeFunc);
// piped.subscribe(anotherNextFunc, errorFunc, completeFunc);

//-------------------cancellable

// const observable = new Observable(observer => {
//     setTimeout(() => {
//         console.log("Async task done");
//         observer.next();
//     }, 2000);
// });
// subscription = observable.subscribe(() => console.log("Handler"));
// subscription.unsubscribe();

//-------------------unicast
// const observable = new Observable(observer => {
//     console.log("Executing...");
//     observer.next(Math.random());
// });
// observable.subscribe(result => console.log(result));
// observable.subscribe(result => console.log(result));


// Remarks

// In a nutshell, the main differences between a Promise and an Observable are as follows:

// a Promise is eager, whereas an Observable is lazy,
// a Promise is always asynchronous, while an Observable can be either synchronous or asynchronous,
// a Promise can provide a single value, whereas an Observable is a stream of values (from 0 to multiple values),
// you can apply RxJS operators to an Observable to get a new tailored stream.

function fetchUsers() {
    const users = [];
    for (let i = 0 ; i < 10 ; i++) {
        users.push(`User ${Math.floor(Math.random() * 101)}`);
    }
    return users;
}

const observable$ = new Observable(observer => {
    console.log("Executing...");
    const users = fetchUsers();
    
    //async
    setTimeout(() => {
        users.forEach(user => observer.next(user));
        observer.complete();
    }, 3000);
    //sync
    // users.forEach(user => observer.next(user));
    // observer.complete();
});

const piped$ = observable$.pipe(map(e => `${e} on ${new Date()}`));
piped$.subscribe((e) => console.log(`Now viewing 'e': ${e}`), () => {}, () => console.log('eba, acabou!'));
console.log('Finished!');