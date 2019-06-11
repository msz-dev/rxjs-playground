const { Observable } = require('rxjs');
const { map, tap} = require('rxjs/operators');
const fetch = require('node-fetch');

// Creation
const observable$ = new Observable(subscriberFunc);
const request$ = new Observable(request);

function request(observer) {
  return fetch('http://www.google.com')
  .then(res => res.text())
  .then(body => {
    console.log('Got a response body!');
    observer.next(body);
  }).catch(error => {
    console.log(error);
    throw error;
  });
}

function subscriberFunc(observer) {
  const teste = [];
  for (let i = 0 ; i < 10 ; i++) {
    teste.push(Math.random());
  }
  observer.next(teste);
}

// Usage
function nextFunc(value) {
  console.log("Got value: " + value.length + "\n");
  // value.forEach(e => console.log('I am a single value from array ', e));
}

function anotherNextFunc(value) {
  console.log("Another got value: " + value + "\n");
}

function errorFunc(error) {
  console.log("Caught error: " + error);
}

function completeFunc() {
  console.log("Completed");
}


const piped = observable$.pipe(
      tap(e => console.log('tapando aqui', e)),
      map(e => e)
);

request$.subscribe(nextFunc, errorFunc, completeFunc);
// piped.subscribe(nextFunc, errorFunc, completeFunc);
// piped.subscribe(anotherNextFunc, errorFunc, completeFunc);


// fetch('http://www.google.com')
//   .then(res => res.text())
//   .then(body => console.log(body));

// console.log("- Creating promise");
// const promise = new Promise(resolve => {
//     console.log("- Promise running");
//     resolve(1);
// });
// console.log("- Registering handler");
// promise.then(result => console.log("- Handling result: " + result));
// console.log("- Exiting main");
