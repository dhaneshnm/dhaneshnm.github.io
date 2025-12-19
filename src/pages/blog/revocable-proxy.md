---
layout: "../../layouts/BlogPost.astro"
title: "Revocable References"
description: "Revocable References using Proxy API"
pubDate: "Nov 4 2022"
heroImage: "/hero2.jpg"
---

In this post we look in to the idea of revokable references and how to implement them with proxies.

Revocable reference is a pattern where, access to a resource is granted inderectly through a reference. Once the resource is accessed, the refrence can be revoked. Once revoked, the resource can no longer be accessed through that refrence. As you can see, this is a way of implementing access control.

[Proxy](https://en.wikipedia.org/wiki/Proxy_pattern) is a well known design pattern. A proxy is an object that can be used as a substitute for another object. In ES6 we have proxy API that enables us to implement proxy pattern.

## Basic Proxy Example

[ES6 Proxy API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) has various "traps" that allows the proxy to intercept the basic operations of the wrapped object and redefine them if necessery. Proxy takes two arguments. A target and the handler. Target is the object that we want to wrap in the prpxy. handler holds various 'traps' that can intercept and modify the basic operations of the target. There a lot of traps available in the proxy API. For this usecase we will look in to apply, set and get.

```javascript
const profile = {
  name: "John Doe",
  birthYear: 1986,
};
const ageProxy = new Proxy(profile, {
  get: (target, prop, receiver) => {
    if (prop === "birthYear") {
      const birthYear = target[prop];
      const age = Number(new Date().getFullYear()) - birthYear;
      return {
        age,
        birthYear,
      };
    }
    return target[prop];
  },
});
```

In the above example, we have an object called profile which has a name and a year properties. We have set up a proxy called ageProxy. ageProxy has a get interceptor in its handler. The get inteceptor modifies the behaviour of the get call on the property 'birthYear'. Instead of just returning the value, it now computes the age of the person and returns a object with both age and birth year.
So,

```javascript
console.log(profile.birthYear); // 1986
console.log(ageProxy.birthYear); // { age: 36, birthYear: 1986 }
```

## Revocable Proxy

The proxy API has a static method, [Porxy.revocable()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/revocable). Along with a proxy, it also creates a "revoke" call back. Calling revoke will disable all the traps in the proxy and any further call will result in a type error.

```javascript
const profile = {
  name: "Lauren Isi Markov",
  age: 21,
  occupation: "Craft Leaves Picker",
};

const handlerFactory = (callback) => {
  return {
    set(obj, prop, value) {
      callback(obj, prop, value);
      return Reflect.set(...arguments);
    },
  };
};
const myCallBack = (obj, prop, value) => {
  console.log(obj.name, prop, value);
};

const revokable = Proxy.revocable(profile, handlerFactory(myCallBack));

revokable.proxy.name = "Lei Zhi Matsubara"; // Lauren Isi Markov name Lei Zhi Matsubara
console.log(profile.name); // "Lei Zhi Matsubara"
revokable.revoke();
revokable.proxy.name = "Kelechi Māui Bennet"; // TypeError: Cannot perform 'set' on a proxy that has been revoked
profile.name = "Kelechi Māui Bennet"; // Works with out an error.
```

In the above example we have revokable proxy created on the profile object. The proxy has a "Set" trap, wich calls a call back. For the purpose of this example, the callback does not do anything fancy. It just logs the changes in to the console. Whene ever we set a value through the proxy, we get the console about the change.
But once the revoke is called, the next set operation through the proxy throws a type error.

As you can see, Proxy API makes it very easy to implement a revocable reference in just a couple of lines of code. The object exposed through a revocable proxy can be made garbage collectable even when the user still holds a reference to the object.
Revokable proxy can also be used to implement complex patterns like the membrane pattern.
