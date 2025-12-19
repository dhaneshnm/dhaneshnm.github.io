---
layout: "../../layouts/BlogPost.astro"
title: "Source Code Rejuvenation is not refactoring: Paper summary"
description: "Source Code Rejuvenation is not refactoringd: Paper summary"
pubDate: "Oct 20 2022"
heroImage: "/hero2.jpg"
---

Whenever I had to work on projects with old/legacy code, I eventually run in to the following situation. The engineers often complain about the outdated dependencies and out dated coding patterns in the code base. They then come up with wish list of things to “migrate” and then try to convince the management and the product team to allocate time for it. From the product team’s perspective they are fixing a bug or developing a feature, so they can’t seem to find value in this exercise.

And dev team in turn finds it hard and frustrating to explain the value of their ask in a way that product can understand. In some cases, I could convince the product of the value of the migration project and in some cases I joined the frustration of my fellow team members of failing to convince the product.

I came across this very interesting paper( and famous?) that describes the difference between source code rejuvenation and refactoring.

The paper’s core ideas can be summarised in the following table.
<img src='/source-code.png' />

The large scale code migrations and updating the core dependencies to the latest versions comes in the category of Rejuvenation. But product often understands this as “refactoring”. We need to understand the rejuvenation efforts as something that is essential to keep the software healthy. Once we have that awareness in the team, we can have ongoing rejuvenation plan and allocate a certain amount of developer time every sprint towards that. This is much better than allowing software to go stale over a period of time and then ask for a sprint or two to focus exclusively on migrations. Ideas discussed in this paper can help to frame the discussions in that direction
