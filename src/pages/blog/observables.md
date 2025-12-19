---
layout: "../../layouts/BlogPost.astro"
title: "Observables/Observer pattern in Javascript"
description: "Various ways to implement observables in JavaScript."
pubDate: "Nov 5 2022"
heroImage: "/hero2.jpg"
---

Observer pattern is a well known design pattern. In this post we look in to couple of different ways to implement Observer pattern in Javascript.

## Observer pattern

> In observer pattern, the observable object maintains a list of dependents called observers.Observable object notifies the obserevers when ever a state changes occurs in the observable. The notification usually happens by calling a allback function from the observer.

## A basic implementation

```javascript
class Observable {
  constructor(value) {
    this.observers = new Set();
    this.value = value;
  }

  observe(callback) {
    this.observers.add(callback);
  }

  disregard(callback) {
    this.observers.delete(callback);
  }

  notify(changes) {
    this.observers.forEach((c) => {
      c.call(this, changes);
    });
  }

  getValue() {
    this.notify(["get"]);
    return this.value;
  }

  setValue(value) {
    this.notify(["set", this.value, value]);
    this.value = value;
  }
}

const obs = new Observable({
  name: "Diana",
  occupation: "Cult Leader",
});

const copyObs = {
  name: "Diana",
  occupation: "Cult Leader",
};

const callback = (changes) => {
  if (changes[0] === "get") {
    console.log("Value is read");
    return;
  }
  copyObs.name = changes[2].name;
  copyObs.occupation = changes[2].occupation;
  return;
};

obs.observe(callback);

obs.getValue(); // Value is read
obs.setValue({
  name: "Khan",
  occupation: "Actor",
});
console.log(copyObs);
/* 
{
  name: "Khan",
  occupation: "Actor",
}
*/

obs.disregard(callback);
obs.setValue({
  name: "Ivan",
  occupation: "Traveller",
});

console.log(obs.getValue());
/* 
updated.
{
  name: "Khan",
  occupation: "Actor",
}
*/
console.log(copyObs);

/* 
No change.
{
  name: "Khan",
  occupation: "Actor",
}
*/
```

Here we have a class called Observable. It takes a value property in its constructor. Value can be any object. It also keeps a set called Observers. Observers are a set of callbacks that will be called when there is a read or write to the "value". Value is managed by getValue for reads and setValue for writes.

To observe the observable object, we just need to register a call back with observe method. Internally, this will add the call back to the observers set. To stop observing we call disregard with the same call back. Internally, this will remove the callback from the observers set.

The getValue and setValue call an internal method called "notify". Notify will call all the callbacks available in the observers with parameters indicating what change has occured.

This is a very basic implementation of observer apttern in javascript. This implementation is very limited and can only be used to undertstand the basic concept. The [tc39 proposal](https://github.com/tc39/proposal-observable) for observabale that came out a few years go, gives a more complete picture.

## Observer like pattern with revocable Proxy

We looked at Proxy API and revocable proxies in a previous <a href='/blog/revocable-proxy' target='_blank'>post </a>. Here we try to use Proxy API to implement an observable like pattern. This purely an exploration to see what is possible and not a serious attempt to produce any production grade code. With that disclaimer out of the way, let us dive in to the code.

```javascript
const profile = {
  name: "John Smith",
  age: 42,
  occupation: "farm leasing consultant",
};

const callBack = (change) => {
  console.log(`${change} was made`);
};

const callBackProxy = Proxy.revocable(callBack, {});

const observableHandlerFactory = (callBacks) => {
  return {
    set: (target, prop, value) => {
      callBacks.forEach((c) => {
        try {
          c.call(this, [target, prop, value]);
        } catch (ex) {
          // console.error(ex);
        }
      });
    },
  };
};

const observableProfile = new Proxy(
  profile,
  observableHandlerFactory([callBackProxy.proxy])
);

observableProfile.age = 43;
callBackProxy.revoke();
observableProfile.age = 44;
```

We have regular profile object with some attributes like name, age, occupation etc. Now we want to subscribe to any attempt to change any of the properties of the profile object.

So we create a callBackProcy. It takes a function, which is to be used as the function to be called on subscription. callBackProxy wraps this function in a revocable proxy.

Now we create a factory for generating handlers with the revocable proxies. observableHandlerFactory, takes an array of callBackProxies. It add a set trap and in the trap calls the callBackProxies with all the arguments passed in to the set method.

Then finally, we create a proxy for profile object, with a handler created with observableHandlerFactory. Now when ever we try to set a property in profile all the callbacks passed in to the observableHandlerFactory will be called.

Since each callBackProxy (in the example we have only one), has a revoke assosiated with it, we can unsubscribe by calling the revoke method. This will throw an error in the handler, but we are cathing it. We can even remove the revoked callback so that it does not throw an error the second time.

These two are very basic and not so clean implementations of the observer pattern. There are many different and better ways to do observer pattern. We will explore them in one of the future posts.
