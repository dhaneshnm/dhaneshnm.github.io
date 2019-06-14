---
layout: post
title:  "Thoughts on React Hooks"
date:   2018-11-11 17:50:54
categories: javascript
---

React Hooks, the experimental feature is out. These are my thoughts on how hooks may or may not make building apps with React Better.

The hooks allows functional components, to access states, life cycle methods and context. That sounds great and provides a lot of obvious benefits already documented in a lot of talks and articles like [this one](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889).
 
The most attractive feature here is the ability to create custom hooks.Using custom hooks one can combine the state, effects and context hooks provided by the API (among other hooks). I am looking forward to see all the interesting design patterns and libraries that developers will come up with custom hooks.

Another interesting aspect is to see how hooks will affect the use libraries like redux in react ecosystem. Hooks API provides a [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer) hook. This helps to "hook" the redux or similar state manager to any functional component. I expect there to be a wave of interesting use cases and patterns around the usage of useReducer hook.

Now it is easy to make any functional component a "state full" component that has side effects. I am concerned about evolution of a bunch of anti-patterns around this ability. This for sure is giving some serious power to the developers and there will be some abuse of hooks for sure.

To conclude, I am exited to use React Hooks and looking forward to see all the emerging use cases and patterns that comes with it.





