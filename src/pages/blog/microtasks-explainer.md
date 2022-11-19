---
layout: "../../layouts/BlogPost.astro"
title: "Microtasks and queueMicrotask"
description: "A short guide on microtasks"
pubDate: "Nov 14 2022"
heroImage: "/placeholder-hero.jpg"
---

Let us say, on our web page we have a form with submit button. And we have an “OnSubmit” callback associated with the submit button. Within the “OnSubmit” we have a network call that sends the form data to a server and waits for a response. This being an asynchronous operation we use a promise here. The promise gets resolved upon getting the response from the server. We display a “Success” or “Failure” message based on the response.

Let us see how the JS event loop and micro task queue are involved in getting this button click operational.

Javascript is a single threaded language. When a piece of JS code runs, it runs in an execution context. There is the main execution context. It is the context for all code outside of any function body. Then there is the function context. This context is created when a function is called with in the main context. When ever a code segment starts getting executed a context is created . The context is destroyed once the execution is over.

Now in order to run your code, the browser keeps many agents. Each agent has the following things,

- A main thread. This may be shared with other agents.
- A set of execution context.
- An execution context stack.
- Additional threads to handle workers.
- A task queue
- A microtask queue

When a user open our above mentioned web page in a tab, the javascript code in that page is handled by an agent. After the initial task (that are available in the js code from the script tag), the agent waits for an event to happen. And when that happens, it starts a new iteration of the event loop.

In our case, the click of the submit button is such an event. Each line of the call back function is executed by the event loop. When it gets to the promise, the call back of the promise is added as microtask in to the microtaskqeue. Then the execution continues from the Task queue. When all the tasks from tasks queue is complete, the agent will start executing from the micrtask quue. In our example, after onSubmit call back is done, there will be only one microtask in the micro task queue. It will the promise call back. Once that is also completed , the agent will start doing the rendering work. And our little success message will appear on the screen.

If there were more promises in the button click call back, they will be enqueued in the microtask queue and the control will return to the agent only after all the mocrotasks in the queue are done.

This may cause problems, if a microtask creates more microtasks. Since control will return only after all microtasks are done, this may cause a delay in the rendering.

## **queueMicrotask**

We saw that when you have a promise, its success/failure callback is treated as microtask. Mutation Observer API also uses microtasks queue internally. For a while, programmers where using promises to access microtask queue becuase there were no direct way to access it.

queueMicrotask was introduced to give programmers access to the microtaskqeue directly. It takes a function/callback as an arguemnt. And when called, adds this function to the microtaskqueue

```javascript
const queuedToSend = [];

function sendData(data) {
  queuedToSend.push(data);

  if (queuedToSend.length === 1) {
    queueMicrotask(() => {
      const stringToSend = JSON.stringify(queuedToSend);
      queuedToSend.length = 0;

      fetch("/endpoint", stringToSend);
    });
  }
}
```

Let us look at this example from the <a href='https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#microtask-queuing' target='_blank'>queueMicrotask spec</a>.
Here, if even when sendData is called multiple times, with in one synchronous JS execution, the network call happens only once. The multiple calls are getting batched together using a microtask. Compared to using setTimeout approach, here there is no intervening event loop tasks preempting the fetch.

<a herf='https://tanstack.com/query/v4/docs/adapters/solid-query' target='_blank'>Solid-Query uses <a> the above pattern to batch execute tasks. Here is how the code in solitquery looks like,

```javascript
let taskQueue: Array<() => void> = [];

const unsubscribe = observer.subscribe((result) => {
  taskQueue.push(() => {
    batch(() => {
      const unwrappedResult = { ...unwrap(result) };
      if (unwrappedResult.data === undefined) {
        // This is a hack to prevent Solid
        // from deleting the data property when it is `undefined`
        // ref: https://www.solidjs.com/docs/latest/api#updating-stores
        // @ts-ignore
        unwrappedResult.data = emptyData;
      }
      setState(unwrap(unwrappedResult));
      mutate(() => unwrap(result.data));
      refetch();
    });
  });

  queueMicrotask(() => {
    const taskToRun = taskQueue.pop();
    if (taskToRun) {
      taskToRun();
    }
    taskQueue = [];
  });
});
```

You ca read more about it in this <a href='https://github.com/TanStack/query/pull/4211/files#diff-714a59e79c53679067f732913ea8f89b7f04541556ca1787b73c6a7091838e87' target='_blank'>PR</a>.

queueMicrotask can also be used to ensure consistent ordering. Let us consider the following code,

```javacript
MyElement.prototype.loadData = function (url) {
  if (this._cache[url]) {
    this._setData(this._cache[url]);
    this.dispatchEvent(new Event("load"));
  } else {
    fetch(url).then(res => res.arrayBuffer()).then(data => {
      this._cache[url] = data;
      this._setData(data);
      this.dispatchEvent(new Event("load"));
    });
  }
};
```

The code is dispatching a load event, after the data is set. But the ordering may not be consistent, if the data comes from the cache vs data is coming from the network call. This becuase, the call back from fetch goes in to the microtaskqueue and is executed only after the main task is finished. But, when it is from cache there is no promise call back, so the load event is immedeatly dispatched. This can be solved using queueMicrotask as follows,

```javascript
MyElement.prototype.loadData = function (url) {
  if (this._cache[url]) {
    queueMicrotask(() => {
      this._setData(this._cache[url]);
      this.dispatchEvent(new Event("load"));
    });
  } else {
    fetch(url)
      .then((res) => res.arrayBuffer())
      .then((data) => {
        this._cache[url] = data;
        this._setData(data);
        this.dispatchEvent(new Event("load"));
      });
  }
};
```
