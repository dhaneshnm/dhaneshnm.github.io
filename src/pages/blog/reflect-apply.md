---
layout: "../../layouts/BlogPost.astro"
title: "Apply method in Reflect"
description: "Apply method in Reflect"
pubDate: "Oct 30 2022"
heroImage: "/placeholder-hero.jpg"
---

Reflect is a built in global object in JavaScript. It was introduced in ES6 along with Proxy. In this post, we look into the Reflect.apply method.

Apply method is available in function.prototype.apply as of ES5. In ES6, we have another apply available with Reflect. It behaves the same way with a couple of minor differences.
function.prototype.apply() method calls the specified function with a given this value, and arguments provided as an array (or an array-like object). The first argument is the "this" value and the second is arguments in an array-like object.
In Reflect.apply, you need to pass the function as the first argument, this value, and an array of arguments to follow

Let us consider the following code.

```javascript
class add {
  constructor(x, y) {
    this.sum = x + y;
  }
}

const first = new add(1, 2);
const second = new add(3, 4);

const a = multiply.apply(first, [10]);
const b = multiply.apply(second, [10]);
console.log(a); // 30
console.log(b); // 70
```

Here the first invocation will give you 30 and the second will give you 70. If we consider the same example with Reflect,

```javascript
class add {
  constructor(x, y) {
    this.sum = x + y;
  }
}

const first = new add(1, 2);
const second = new add(3, 4);

const a = Reflect.apply(multiply, first, [10]);
const b = Reflect.apply(multiply, second, [10]);
console.log(a); // 30
console.log(b); // 70
```

Now let us consider a bit more complicated and may be, useful example. apply, be it in function.prototype or Reflect, allows you to **_apply_** a function in a new context. The "this" passed in as an argument to the apply provides that new context.

Let us say we have an array of Profile objects. And a profile object has a first name, last name, job title and salary. Now we want to let our code modify the salary of all the employees by a fixed number, except for employess with a particular title.

```javascript
const profile1 = {
  firtsNamename: "John",
  lastName: "Smith",
  jobTitle: "Dynamic Factors Planner",
  salary: 110,
};
const profile2 = {
  firtsNamename: "Jean",
  lastName: "Wang",
  jobTitle: "Forward Markets Analyst",
  salary: 100,
};

const profileArray = [profile1, profile2];
```

In following example, we use Reflect and Object.freeze to accomplish that. First we create a function called conditional freeze. It will check the job title of the (this) object and if it is same as the value passed in as the parameter _toFreeze_ , it will freeze the (this) object preventing any further modification.

```javascript
function conditionalFreeze(toFreeze) {
  if (this.jobTitle && this.jobTitle === toFreeze) {
    Object.freeze(this);
  }
}
```

Then we loop through the array and apply the conditionalFreeze to each object.

```javascript
const toFreeze = "Dynamic Factors Planner";

profileArray.forEach((p) => Reflect.apply(conditionalFreeze, p, [toFreeze]));
```

And then we loop through the array again and increment the salary.

```javascript
profileArray.forEach((p) => (p.salary += 10));
console.log(profile1.salary); // 110, no changes.
console.log(profile2.salary); // 110, increased.
```

Now putting it all together.

```javascript
function conditionalFreeze(toFreeze) {
  if (this.jobTitle && this.jobTitle === toFreeze) {
    Object.freeze(this);
  }
}

const profile1 = {
  firtsNamename: "John",
  lastName: "Smith",
  jobTitle: "Dynamic Factors Planner",
  salary: 110,
};
const profile2 = {
  firtsNamename: "Jean",
  lastName: "Wang",
  jobTitle: "Forward Markets Analyst",
  salary: 100,
};

const profileArray = [profile1, profile2];

const toFreeze = "Dynamic Factors Planner";

profileArray.forEach((p) => Reflect.apply(conditionalFreeze, p, [toFreeze]));
profileArray.forEach((p) => (p.salary += 10));
console.log(profile1.salary); // 110, no changes.
console.log(profile2.salary); // 110, increased.
```
