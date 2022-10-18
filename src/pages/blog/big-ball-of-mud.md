---
layout: "../../layouts/BlogPost.astro"
title: "The big ball of mud: Paper summary"
description: "The big ball of mud: Paper summary"
pubDate: "Oct 19 2022"
heroImage: "/placeholder-hero.jpg"
---

# The big ball of mud: Paper summary

A paper by Brian Foote and Joseph Yoder.

- “A BIG BALL OF MUD is haphazardly structured, sprawling, sloppy, duct-tape and bailing wire, spaghetti code jungle.”
- The authors presents six patterns:
  - BIG BALL OF MUD
  - THROWAWAY CODE
  - PIECEMEAL GROWTH
  - KEEP IT WORKING
  - SWEEPING IT UNDER THE RUG
  - RECONSTRUCTION
- Forces that leads to “big ball of mud”
  - Time
  - Experience
  - Turnover
  - Skill
  - Complexity
  - Change
  - Cost
- Big ball of mud
  - “Big ball of mud” is like shanty towns or slums or other unplanned urban growth.
  - it happens when you want to deliver quality software on time, under budget. Because architecture is a long term investment and easy to dismiss (for the management).
  - “**_Therefore_, focus first on features and functionality, then focus on architecture and performance”.**
    > “What does this muddy code look like to the programmers in the trenches who must confront it? Data structures may be haphazardly constructed, or even next to non-existent. Every shred of important state data may be global. Variable and function names might be uninformative, or even misleading. Functions themselves may make extensive use of global variables, as well as long lists of poorly defined parameters. The function themselves are lengthy and convoluted, and perform several unrelated tasks. Code is duplicated. The flow of control is hard to understand, and difficult to follow. The programmer’s intent is next to impossible to discern. The code is simply unreadable, and borders on indecipherable. The code exhibits the unmistakable signs of patch after patch at the hands of multiple maintainers, each of whom barely understood the consequences of what he or she was doing. Did we mention documentation? What documentation?”
  - This is not an anti-pattern, since this so prevalent.
  - “Make it work. Make it right. Make it fast”, Making it right is different. This is similar triangle to “CAP” in Data base design.
- THROWAWAY CODE
  - A prototype that stuck. (Remember front rush).
  - **You need an immediate fix for a small problem, or a quick prototype or proof of concept.**
  - “Therefore, produce, by any means available, simple, expedient, disposable code that adequately addresses just the problem at-hand”.
- PIECEMEAL GROWTH
  - “**Master plans are often rigid, misguided and out of date. Users’ needs change with time”**
  - “Therefore, incrementally address forces that encourage change and growth. Allow opportunities for
    growth to be exploited locally, as they occur.”
  - PIECEMEAL GROWTH can be undertaken in an opportunistic fashion, starting with the existing, living, breathing system, and working outward, a step at a time, in such a way as to not undermine the system’s viability. Broad advances on all fronts are avoided. Instead, change is broken down into small, manageable chunks.
  - The biggest risk associated with PIECEMEAL GROWTH is that it will gradually erode the overall structure of the system and inexorably turn it in to a BIG BALL O FMUD.
- KEEP IT WORKING
  - Maintenance needs have accumulated, but an overhaul is unwise, since you might break the system.
  - _Therefore_, do what it takes to maintain the software and keep it going. Keep it working.
  - Always beginning with a working system helps to encourage PIECEMEAL GROWTH.
- SWEEPING IT UNDER THE RUG
  - **Overgrown, tangled, haphazard spaghetti code is hard to comprehend, repair, or extend, and tends to grow even worse if it is not somehow brought under control.**
  - **Therefore, If you can’t easily make a mess go away, at least cordon it off. This restricts the disorder to a fixed area, keeps it out of sight, and can set the stage for additional refactoring.**
- RECONSTRUCTION
  - our code has declined to the point where it is beyond repair, or even comprehension.
  - Therefore, throw it away it and start over.
