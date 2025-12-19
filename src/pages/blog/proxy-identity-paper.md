---
layout: "../../layouts/BlogPost.astro"
title: "On Proxy identity crisis : Paper summary"
description: "On Proxy identity crisis : Paper summary"
pubDate: "Nov 6 2022"
heroImage: "/hero2.jpg"
---

I came across this paper while looking up materials to better understand Javascript Proxy API. Here are some notes I made while reading the paper.

Source: [http://matthias-keil.de/papers/pos2013-proxy.pdf](http://matthias-keil.de/papers/pos2013-proxy.pdf)

- Javascript proxies are opaque: each proxy object has its own identity different from all other
  (proxy) objects and this difference is observable with the
  JavaScript equality operators == and ===
- Use cases
  - Access Control: Proxy helps to implement access control with Revocable References and Membranes. An example is a host application allowing Mashup to have access to a resource and then revoking the access once mashup is done with its use.
  - Contracts: Contracts impose restrictions, that are preconditions to the correct execution of the program. This may be useful during maintenance and refactoring, where additional restrictions such as limiting a function to a certain type can be useful.
- Assessment: In javascript proxies are opaque. They are not equal to the target object with “===” or “==”. This is Ok for the access control use case, but not Okey for the Contract use case.
- Alternative Design:
  - Proxy Aware Equality: Add Porxy.isEqual and Proxy.isIdentical to replace all uses of “==” and “===”. This will help to retain the existing behavior. This will help the proxies to be transparent.
  - Transparent Proxies:
  - More equality operators: Add more equality operators such as “:==:” and “:===:” to deal with the case of proxies.
  - Trapping the equality operator: Trapping equality operators are generally not a good idea. But if we modify the handlers, with a flag such as “IsTransparent”, trapping may work. When the flag is false the proxy can behave opaque and otherwise it behaves transparently and the equality trap is active.
- Conclusion: The paper explored various solutions to work with opaque proxies, when they need to be transparent.
