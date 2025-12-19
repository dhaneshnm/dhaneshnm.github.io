---
layout: "../../layouts/BlogPost.astro"
title: "Extreme programming with an AI agent"
description: "A thought expirement on the design of an AI agent that can build useful software."
pubDate: "Jan 27 2025"
heroImage: "/hero2.jpg"
---

Extreme Programming(XP) is an agile software development methodology. It has a lot of reccomendation for all parts of Software development life cycle. For this post let us focus on the "developement" part of the life cycle. On development phase XP recommends the following:

1. Pair Programming: Two developers work together on the same piece of code—one writes while the other reviews.
2. Test-Driven Development (TDD): Writing automated tests before writing the actual code.
3. Continuous Integration: Code is integrated and tested frequently, often multiple times a day.
4. Frequent Releases: Delivering small, incremental updates to customers regularly.
5. Refactoring: Continuously improving and simplifying the code without altering its behavior.
6. Collective Code Ownership: Any team member can modify any part of the code, fostering shared responsibility.
7. Customer On-Site: Having a real customer (or representative) available for immediate feedback and clarifications.
8. Sustainable Pace: Avoiding burnout by working at a consistent, reasonable pace

An over simplified version of steps 1 through 5 may look like the following. Two engineers work together: one writes the test while the other writes code to pass that test. And when both agree, the code gets committed, pushed and deployed through the CI/CD pipleline.

I was catching up on how AI agents work and it immedeatly reminded me of XP. This worklow is very much adaptable for an AI based softeare development. Imagine replacing the code-writing engineer with an AI agent, while the human engineer writes tests in plain English. And then the agent commits and deploys the code when human engineer approves it. That is pretty much all we need to make AI based Software development happen.

I was aware of Devin, the AI agent who can create the Pull requests on github. Devin works based on slack and github. It takes it prompts on a slack channel and outputs its code as PR in github. I looked around a founf that there are half a dozen open source alternates for devin. SWE agent, Devika, MetaGPT, OpenDevin and Goose to name a few. They all look very promising.

I am not sure what this means for the job security of the Software Engineers. But this sure is exciting. I am looking forward to develop code end to end with an AI.
