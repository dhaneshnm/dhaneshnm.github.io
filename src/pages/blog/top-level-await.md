---
layout: "../../layouts/BlogPost.astro"
title: "Top level await"
description: "Top level await"
pubDate: "Nov 14 2022"
heroImage: "/hero2.png"
---

<a href='https://github.com/tc39/proposal-top-level-await' target='_blank'>Top level await</a> is a new feature added to javascript in ES2022.We have been using async … await syntax for a while in JS. With that, await was only available with functions that were marked with the ‘async’ keyword. With top-level await, we can use await at the module level.

The syntax of the await is the same when it is used at the module level. We have an “await” keyword followed by an expression. This expression needs to be a promise, a thenable object, or something to wait for.

A module may have child modules that use top-level await. In that case, the parent module will wait for the child modules(that use await) to execute first. And it will not block other child modules from loading while waiting.

### Some use cases

Of course, like the function level await, top-level await can be used to fetch data. But that does not seem to be the primary use case for the top-level await. The most interesting use cases seem to be around lazy loading or dynamic import of modules.

We can use the await synatx to dynamically import a module.

```javascript
const params = new URLSearchParams(location.search);
const location = params.get("location");
const map = await import(`./map-${location}.mjs`); // (A)

console.log(map.currentMap);
```

There are also a couple interesting variations of this usecase.

```javascript
let moduleA;
try {
  moduleA = await import("https://first.example.com/moduleA");
} catch {
  moduleA = await import("https://second.example.com/moduleA");
}
```

In the above example, if the module fails to load with the first url, we try a second url with in the catch block.

```javascript
const moduleA = await Promise.any([
  fetch("http://example.com/one.txt").then((response) => response.text()),
  fetch("http://example.com/two.txt").then((response) => response.text()),
]);
```

Here we try to load a module from a few different sources. And import the module from which ever module that loads the fastest.

### Conclusion

Like the function level await, top level wait can make asynchronicity transparent. It also ensures that, asynchrnous imports are not accessed before a module is fully intialized.

But the <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#control_flow_effects_of_await' target='_blank'>Control flow effects of await</a> are applicable to top level await as well. It can block imports and delay the initialization of a module. So we should use it with caution.
