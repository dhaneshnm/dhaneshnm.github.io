---
layout: post
title: "Grokking Simplicity (Summary & Notes)"
date: 2022-07-18 09:50:54
categories: books
---

# Grokking Simplicity (Summary & Notes)

### Chapter 4

- Functions can have implicit and explicit inputs and outputs. A function is an action if it has implicit input or output. Eliminating implicit i/o will turn the function into a calculation.
- implicit inputs can be turned in to function’s input arguments and implicit output can be replaced with return values.
- Extract subroutine is a refactoring technique that will help turn an action in to one or more calculations by eliminating implicit i/o.
- copy on write : Copy a mutable value before modifying it to keep the immutability.
- By turning code in to more functional, the ratio of code in calculations will increase and ratio of code in actions will decrease.

### Chapter 5

- Functional design is about pulling things apart and organising the code in to small (single responsibility) functions that can be used to compose larger things.
- There is mention about how functional design renders layering of the code in to things business rules, utility methods etc.
- Functional design also helps with re-usability.
- The capter mostly has code examples and refactor walk through to help the reader understand the first point. ([https://www.notion.so/Grokking-Simplicity-5252e3df46aa410ebdbbc75ad03722a0#16a4e4c265934d558abc53687a7ebad9](https://www.notion.so/Grokking-Simplicity-5252e3df46aa410ebdbbc75ad03722a0)).

### Chapter 6 (Immutability)

- It is difficult to do immutable operations when data is deeply nested, but it is possible.
- Operations can be categorised in to read, write or both.
- Out of this, write and read/write modify the data. Here we need to apply copy-on-write to keep immutability of the data.
- Three steps of copy on write:
  - Make a copy.
  - Modify the copy.
  - return the copy.
- copy-on-wrote **_converts writes in to reads_**.
- When a function modifies an item and then returns a value, it is a read/write function. In order to make it immutable, we split it in two (read and write) and then apply copy on write to the write function.
- Other approach is to return an object with both values.
- Reads to mutable data structures are Actions, but reads to immutable DS is a calculation.
- structural sharing: Two nested data structures referencing the same inner data structure.
- shallow copy: Copying only the top level data structure in nested data.
- Javascript utilities for copy on write
  - Object.assign
  - .slice (in case of array, to create a copy)
  -

### Chapter 7 (Staying immutable with untrusted code)

- There may be situations where refactoring a piece of code that mutates the data, is not possible.
- In the above case, we use **_defensive copying._**
- In defensive copying, you make a **_deep copy for_** the object before passing it to the lgacy/untrusted code. And then you make a deep copy after the object is returned from the legacy/untrusted code.
- We can create a wrapper function to wrap the following three steps
  - make a deep copy before passing data to untrusted code.
  - call untrusted code.
  - make a copy of data again and use the copy for the rest of the program.

### Chapter 8 (Stratified Design Part 1)

- Software Design : _“using one’s aesthetic sense to guide programming choices to improve the ease of coding, testing, and maintaining software”._
- Stratified Design: A technique of building software in layers. (Layered Architecture).
- Four patterns of stratified Design:
  - **Straightforward implementation** : “When we read a function with a straightforward implementation, the problem the function signature presents should be solved at the right level of detail in the body”
  - **Abstraction Barrie**r: Layers provide an interface that hides implementation details
  - **Minimal interface**: Limited to a small, powerful set of operations.
  - **Comfortable layers**: It should help programmers and meet their needs.
- Visualising functions with a **call graph** can help us identify the layers and make it more straight forward.
- With **Straightforward implementation** a function will call other functions with in it, but all those functions will be of similar level of abstractions. ie, It won’t call a low level function and then in next line a high level function.
- In SI, all function in the same layer should serve the same purpose. (eg: from the book, function in cart layers, do ops like adding/removing/checking items etc on the cart).
- Zoom levels to identify layers:
  - Interaction between layers.
  - Implementation of one layer.
  - Implementation of a function.

### Chapter 9 (Stratified Design Part 2)

- **_“An abstraction barrier is a layer of functions that hide the implementation so well that you can completely forget about how it is implemented even while using those functions.”_**
- Abstraction barrier lets us ignore implementation details.
- Abstraction barrier guide lines. (Use abstraction barrier for /to ..)
  - To facilitate changes of implementation.
  - To make code easier to read and write.
  - To reduce coordination between teams.
  - To mentally focus on the problem at hand. (By hiding unimportant details for that level, the level above can focus on a different problem).
- Minimal interface: function that implement an abstraction barrier is its interface. Principle of Minimal interface states that, we should keep the interfaces in an abstraction barrier to a minimum. (as small as possible).
- Advantages of keeping interfaces minimal:
  - More code will require more work when we change the implementation.
  - Lower level code is harder to under stand.
  - More functions in a barrier means more coordination between teams.
  - Larger interface is harder to keep in the head.
  - For the consumers of a barrier, the code inside the barrier is of lower level. It is more likely to have bugs compared to the higher level code (comment: I don’t understand this point).
- Comfortable layers: The layers should be comfortable, ie, For the users of then layers it should be practical and useful. In other words, don’t create useless abstractions.
- Call graph can throw light of the non functional requirements of the software. Looking at the call graph can let us figure of testability, maintainability and reusability of the software.
  - “Rule: The fewer functions on the path to the top of the graph, the easier a function is to change.”
  - “Rule: The more functions on the path to the top of the graph, the more valuable its tests will be.”
  - “Rule: The fewer functions underneath a function, the more reusable it is.”

### Chapter 10 (First class functions : Part1)

- first class values are the values passed in to function or returned by a function.
- fist class functions are functions that can be passed as an argument to another function.
- higher order functions are function that take another function as its argument.
- There are three ways in which you can define a function:
  - Global : “function” key word in JS
  - with in a scope by assigning it to a variable. (const ,let and arrow syntax).
  - Inline (using arrow syntax of using function key word).
- The following code smells and refactoring make use of first class values:
  - code smell : Implicit argument in function name. _“If you are referring to a value in the body of a function, and that value is named in the function name, this smell applies. The solution is the next refactoring.”._
  - Refactoring: Express implicit argument
    - Identify the implicit argument in the name of the function.
    - Add explicit argument.
    - Use new argument in body in place of hard-coded value.
    - Update the calling code.
  - Refactoring: Replace body with callback.
    - Identify the before, body, and after sections.
    - Extract the whole thing into a function.
    - Extract the body section into a function passed as an argument to that function.

### Chapter 11 (First class functions part2)

- Higher order function can also return a function just like it accepts a function as an argument. This pattern can be used to wrap function in a higher order function to give it additional powers (such as ability to log data to an external service)

### Chapter 12 (Functional Iteration)

- Introduces thee functional tools to loop through an array: map, reduce and filter.
- Use cases for reduce:
  - Concatenating strings
  - Undo/Redo : “ If you imagine your current state as applying reduce() to a list of user interactions, undo just means removing the last interaction from the list”.
  - Replaying User Interaction for testing:
  - Time travelling debugger.
  - Audit trails.

### Chapter 13 (Chaining functional tools)

- What is functional chaining? provide few examples?
- Clarifying chains
  - Method 1: Name the steps.
  - Method 2: Name the call backs.
- Refactoring existing for loops to functional tools:
  - Strategy 1: Understand and rewrite: Understand what the loop does and rewrite it completely using map, filter or reduce.
  - Refactor from clues: Pick apart the existing for loop and turn it in to functional chains.
    - Tip 1: Make data
    - Tip 2:Operate on the whole array at once.
    - Tip 3: Take many small steps
- Other functional tools
  - Pluck (pull out a filed from each object in an array)
  - Concat (unnest array inside and array)
  - frequenciesBy (counting)
  - groupBy (grouping)

### Chapter 14 (Functional tools for nested data)

- update : a higher order function that takes the object, field and modify function that will modify the value of the given filed. update isa functional tool that operates on an object, unlike map, reduce, filter that operates on an array.
- recursive update: We can create a recursive version of update, in order to address the updates in a nested object.
- Abstraction barrier can be used to handle issues emerging from deep nesting. **_“You can apply abstraction barriers to key data structures so that you don’t have as much to remember. This can make working with deep structures easier.”_**

### Chapter 15 (Isolating timelines)

- The time line diagrams shows what happens over time when the code is executed.
  - A time line is a sequence of action.
  - “A timeline diagram graphically represents a sequence of actions over time”.
  - If two actions occur in order, put them in the same time line.
  - If two actions cam happen at the same time or out of order, put them in different time lines.
- Gotcha: Arguments are executed before the function is called.
- Steps in drawing time line digram:
  - Identify actions.
  - Draw each action, whether sequential or parallel.
  - Simplify using platform specific knowledge.
- Principles of working with timelines:
  - Fewer timelines are easier.
  - Shorter times lines are easier.
  - Sharing fewer resources are easier.
  - Coordinate when resources are shared.
  - Manipulate time as a first-class concept: “Create re-usable objects that manipulate time line.
- Eliminating global variables shared by action with interleaving time lines is way to avoid bugs created by async code in JS.

### Chapter 16 & 17 (Sharing resources between time lines & Coordinating time lines).

**Key words: Share Resources, Queues, Concurrency primitives**

- “A race condition occurs when the behaviour depends on which timeline finishes first.”
- We can use concurrency primitives to solve resource sharing problems between time lines.
- In this book, Queue is used as an example for concurrency primitive.
- Promise.all is another JS concurrency primitive.
- Examples of concurrency primitives:
  - Queue: “Items added to the queue are processed in a separate, single timeline”
  - Cut: “Call a callback in a new timeline only after all timelines have completed”
  - JustOnce: “An action wrapped in JustOnce() will only be executed once, even if the wrapped function is called multiple times”.
  - DroppinQueue: “This is like a Queue(), but will skip tasks if they build up quickly:”

“In JavaScript, the time model is quite simple:

Sequential statements execute in sequential order. _
Steps in two different timelines can occur in left-first or right-first order. _
Asynchronous events are called in new timelines. \*
An action is executed as many times as you call it.\*\*”

### Chapter 18 (Reactive and Onion Architecture)

Key words: Onion Architecture, Reactive Architecture, Common Mutable State, Interaction Layer.

- Reactive Architecture:
  - Helps to decouple cause from effect.
  - Treats a series of steps as a pipeline.
  - Creates flexibility in the time line.
  - Watcher/Observer/Listeners/Event handlers/Call back are similar ideas. They help to make the code “reactive”.
  - ValueCells/Atoms/Agents/Redux Store/ TVars etc are similar concepts that implement Watcher pattern with in them.
- Onion Architecture

  - It is drawn a set of concentric circles.
  - Divides the app in to three layers, Interaction (Actions), Domain (Calculations only) and Language.
  - Rules:

    - Interaction with the world is done exclusively in the interaction layer.
    - layers call in towards the centre.
    - Layers don’t know about layers outside of themselves.
    - Can a domain rule be an action?
      - Examine the terms used to place the rule in a layer.
      - Analyse readability and awkwardness.

  - “The onion architecture is fractal. It can be found at every level of abstraction in your actions”

### Chapter 19 (The functional journey ahead)

- Two tracks to mastery:
  - Sandbox
    - Practise excercises
    - Side projects
    - throw way branch of prod code.
  - Production
    - Refactoring existing code.
    - New features in an existing product
    - A new, greenfield product.
    - Teaching others.
- Math for functional programmers.
  - Lambda calculas
  - Combinators
  - Type theory
  - category theory.
  - Effect systems.
