---
layout: "../../layouts/BlogPost.astro"
title: "Hydration and Rendering"
description: "A brief introduction to various hydration techniques in the web."
pubDate: "Nov 22 2022"
heroImage: "/placeholder-hero.jpg"
---

## Introduction

In this post, we take a brief look at the various type of “rehydration” techniques used in web applications. Before we get into the rehydration techniques, let us see why rehydration is necessary and what type of web pages or apps needs rehydration.

### Server Rendering

A decade ago, the majority of web pages in the web were server-rendered. By rendering we mean the process of getting the data necessary for that particular page and then constructing the page using the HTML, by adding the data to the HTML template for the page. In server rendering (old school rails, PHP, asp.net etc), the server-side code gets the data from the database, uses that data to create an HMTL page and sends that HTML back to the user. When a user needs more data, a new request is made, the entire page is again sent back (with new data) to the browser and as result the page reloads. This is how things worked a while ago.

### Client Side Rendering

Then came client-side rendering. In client-side rendering, All logic, data fetching, templating, and routing are handled on the client rather than the server. When the page loads, the client will have a very basic HTML. It will have a script tag that loads the JS code. The JS code then fetches the data, uses the template to construct the HTML, and then updates the DOM to reflect the changes.

All modern JS frameworks pretty much work on CSR, with some variations. As you can see, CSR is way slower to load than the classic Server rendering. With core web vitals and google’s push to reward pages that perform better on their metrics, CSR became a problem. A few variations of CSR developed over time to make CSR more “performant”.

<img src="/hydration-1.png" alt='SSR vs CSR'/>

### Static Rendering

Static rendering is good for pages that do not have any interactivity. The page is built during build time. The data fetching and building of nodes all happen during the build time. And then the entire app is deployed to a CDN. As you can imagine, this will make the website blazing fast as no data fetching and node construction happening in the server or the client.
The downside here of course is that the pages are static. Every time we have a change, we will need to go through the build and deploy cycle.

### Server Side Rendering

Universal rendering or Server Side Rendering (SSR) is an attempt to balance the trade-offs between CSR and server rendering. In SSR, full page loads and reloads are handled by the server. The server creates the full HTML and sends it back to the browser. The javascript and data for rendering are also embedded in the HTML. With SSR, we can have very fast first contentful paint(FCP). Once FCP is done, the page still needs to continue the rendering using the javascript. This is where “Rehydration” comes into the picture. With Rehydration, we add application state and interactivity to the server-rendered HTML. Even though the page may appear to be ready, due to the need for rehydration, the page won’t be ready for interaction until rehydration is complete.

There are a few rehydration methods that aim to improve this situation,

- Streaming server-side Rendering
- Progressive Rehydration
- Trisomorphic Rendering
- Selective Hydration
- Island Architecture

For the rest of the article, we will explore each of these items in detail.

## Streaming server-side Rendering

As we have seen before, the key problem with SSR is the delay in page being ready to interact(Time to Interactive/TTI). Streaming SSR attempts to solve this problem by sending the application in smaller chunks to the browser, such that the browser can start rendering as soon as it receives the first chunk. Node streams allows us to stream the chunks to the browser. React has the “**`renderToReadableStream`**" to help with Streaming SSR.

### Progressive (and selective) Re-Hydration

Progressive hydration is another way to reduce the TTI in SSR. Here the trick is to hydrate the page before all the code has loaded. Instead of hydrating all the nodes at one go, we re-hydrate the nodes progressively, using certain conditions. For example, we may only hydrate the nodes that are visible in the viewport.

In order to do that, we will have to split our js bundle into multiple chunks and lazy load the chunks based on how we want to hydrate the app.

In React, the “hydrate” method from the react-dom is used to implement progressive hydration. React.lazy and Suspense are the other two features that will help with progressive Re-Hydration.

### Trisomorphic Rendering

In this technique, initial rendering is done with Streaming SSR. Subsequent rendering happens through service workers for navigation links. ie, When the user navigates to a new view, that view is loaded from the service worker instead of the server. The service worker will fetch and cache this view while the initial view was getting installed.

In order for this to work, the client, server, and service worker should all use the same routing and templating.

### Island Architecture

We have looked at Island Architecture in a previous Article. Here we render HTML pages in the server and inject slots in them that can be hydrated in the client. In frameworks like astro, we can also use static rendering (compile time) with slots for “islands” of interactivity that can be hydrated in the client. Here we don’t have any re-hydration at all. The static parts that come from the server, do not have any interactive bits. So they remain static. The islands are entirely hydrated in the client, like in the case of CSR. That is why Jason Miller described it as <a href="https://jasonformat.com/islands-architecture/#:~:text=The%20general%20idea%20of%20an,output%20from%20their%20corresponding%20widget." target="_blank">“progressive hydration for free”.</a>

## References

- [https://dev.to/this-is-learning/why-efficient-hydration-in-javascript-frameworks-is-so-challenging-1ca3](https://dev.to/this-is-learning/why-efficient-hydration-in-javascript-frameworks-is-so-challenging-1ca3)

- [https://thenewstack.io/javascript-hydration-is-a-workaround-not-a-solution/](https://thenewstack.io/javascript-hydration-is-a-workaround-not-a-solution/)

- [https://www.patterns.dev/posts/progressive-hydration/](https://www.patterns.dev/posts/progressive-hydration/)

- [https://medium.com/@ryanflorence/welcome-to-future-of-web-application-delivery-9750b7564d9f](https://medium.com/@ryanflorence/welcome-to-future-of-web-application-delivery-9750b7564d9f)

- [https://www.builder.io/blog/hydration-is-pure-overhead](https://www.builder.io/blog/hydration-is-pure-overhead)

- [https://dev.to/this-is-learning/conquering-javascript-hydration-a9f](https://dev.to/this-is-learning/conquering-javascript-hydration-a9f)

- [https://freecontent.manning.com/caching-in-react/](https://freecontent.manning.com/caching-in-react/)

- [https://web.dev/rendering-on-the-web/](https://web.dev/rendering-on-the-web/)

- [https://www.patterns.dev/posts/rendering-introduction/](https://www.patterns.dev/posts/rendering-introduction/)

- [https://frontarm.com/james-k-nelson/static-vs-server-rendering/](https://frontarm.com/james-k-nelson/static-vs-server-rendering/)

- [https://github.com/reactwg/react-18/discussions/37](https://github.com/reactwg/react-18/discussions/37)
