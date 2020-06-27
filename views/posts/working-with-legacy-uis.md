---
title: Working with legacy UIs
date: 2020-06-24
tags: ["front-end", "javascript", "css", "html"]
layout: layouts/post.njk
---

We all have those projects that fill us with complete dread to work on. Created by renowned developers that have long ago left the company. It is a shock that the project is still being used in production.

These projects usually consist of thousands of lines of [jQuery soup](http://radar.oreilly.com/2014/01/keeping-jquery-in-check.html) with heavily customized libraries and a [append-only main.css file](https://css-tricks.com/oh-no-stylesheet-grows-grows-grows-append-stylesheet-problem/) which makes your text editor act up. Most of the time, a rewrite of this project isn't feasible and [shouldn't be attempted](https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/).

What qualifies a project as legacy code isn't how old it is or the shortage of original team members, but the lack of testing. As [Michael Feathers](https://twitter.com/mfeathers) describes in his excellent book, [Working Effectively with Legacy Code](https://www.oreilly.com/library/view/working-effectively-with/0131177052/), legacy code is code without tests. I bet a lot of us just realized how much legacy code we actually have.

But why is this the case? Because code that isn't tested is hard to change. If you [don't have confidence that the change you implement won't result in another part of the system breaking](https://kentcdodds.com/blog/confidently-shipping-code) you get stuck in a loop of excessive manual testing for small updates.

Working with legacy code is a general problem we face in software development, but working specifically on frontend projects pose it's own unique set of challenges e.g:

- No usage of a module system. Just a bunch of link and script tags, sorted in some magic order.
- The never-ending stylesheets with !important everywhere.
- Highly custom solutions to do things like data fetching and populating the UI. Some projects I've seen have their own template language for this.
- Library code that has been customized for the project, making updates impossible.
- Strange development setups and environment requirements.

Let's assume you needed to get a feature working on such a project. How would you go about it? There are no tests, no documentation, and nobody to help. A true triangle of despair.

## Establish the baseline

Before even checking out the repository, you need to use the software. What is the expected behavior? Make notes and diagrams if you need to. This is also the time to read any documentation if you are lucky enough to have it.

## Get it running

You now need to get the project working. This could be quite the task in some cases, but unfortunately, you are on your own here.

Once up and running, you should be jumping around the codebase trying to familiarize yourself with how everything fits together. Don't start changing anything yet and don't expect to understand the project in its entirety. Focus on the section that you intend to work on.

## Formatting & static analysis

After you get the project up and running. Its time to implement formatting and linting. Using a combination of [Prettier](https://prettier.io/), [ESLint](https://eslint.org/) and [Stylelint](https://stylelint.io/) are sufficient. All these tools can be run independently of the current build process.

Formatting makes it easier to read the code as everything is now consistent and you will immediately feel more at home. The linters will probably need to be configured very lax or limited to the section you intend to work on, but you should still be able to get some quick wins like finding duplicate CSS properties and understanding how the scripts depend on each other via undefined errors.

## Testing and feature implementation

This is where the bulk of your work is. Normally an enormous amount of refactoring will be required to get unit tests to pass for the new feature.

Various refactoring techniques are detailed by [Michael Feathers](https://twitter.com/mfeathers) in [his book](https://www.oreilly.com/library/view/working-effectively-with/0131177052/) about how to do this. The purpose is to implement the absolute minimal, safest changes to the code to allow the unit tests to past.

But we will be going about this step a bit differently. Since this is frontend development, unit tests should be used sparingly and [most of your tests should be integration](https://kentcdodds.com/blog/write-tests). We will be testing software the way an actual user would use it. My recommended tool for this is [Cypress](https://www.cypress.io/). The documentation and overall developer experience are just amazing. You also have the benefit of knowing that you are testing on multiple browsers and your knowledge can be used for testing on new projects as well.

This is a conscious tradeoff we make of writing the tests for old code instead of refactoring it to a state to allow us to test new code. I prefer this approach because [the cost of creating the wrong abstraction when refactoring is far too high](https://kentcdodds.com/blog/aha-testing).

You will probably spend a significant amount of time writing tests for existing functionality, but it will all be worthwhile when implementing the feature. Remember to test the new feature as well! We are trying to remove legacy code. Not add to it.
