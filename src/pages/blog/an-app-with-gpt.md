---
layout: "../../layouts/BlogPost.astro"
title: "I built something useful with chat GTP"
description: "A little expirement on building apps start to end with AI."
pubDate: "Jan 24 2025"
heroImage: "/placeholder-hero.jpg"
---

I have been using GPT through github copilot since it was available on beta (2022 ?). It was little more than an annoyance initially. The LLMs has become much better with coding since. Now with the rise of reasonling AI, some say that we won't need software engineers as much as we used to. AI would really do the coding for us.
So far I had only used AI to improve the low level implementation. It would help me write a function, come up with algorithm or improve the code qulaity while I lcean up the code.  
I wanted to find a usecase where I could use the AI code from start to end. I got an oppurtunity today as I wanted to use chrome extenntion to block the social media sites. I spend tooo much time in reddit and instagram and I wanted to put an end to it. I looked around for something simple and free to use in chrome store. There were a few good options and they were all payed.
It occured to me that this has to be something simple that I can build with chat gpt. So I navigated to chat gpt and asked it nicley.

> "What code can I add to chrome so that I can block websites in chrome? I want to add my own code and not use an extension."

I know. Not the best prompt. But chatgpt did not mind. It gave me a manifest file and a rules file. And directed me how to add that in to my local chrromebrowser. The list of sites to block was in the rules.json, hardcoded. I did as directed and it worked!! I could no longer access twitter, reddit etc. from my browser.

I wanted to improve it by adding a UI. This would help me to add or remove urls as I like. I asked the following prompt:

> "I want to add a UI to this so that the list of blocked urls can be updated by a user. What is the best way to do that? "

Gpt refactored its earlier code to addd an HTML file and javascript file. Now the urls will be stored in local storage and we can add or remove it from the options page of the extention. Nothing dramatic. But I am quite pleased to see that we can build something start to end with GPT.

<img src="/blocksite.png" alt="UI of the block site app" />

I added some CSS and saved the code in a github repo. You can see it <a href='https://github.com/dhaneshnm/blocksite' target="_blank">here</a>. I guess, if we set up an AI agent, it can commit and deploy the code too.

So we really don't need a Software Engineer to build an app any more. AI can do it all by it self.
