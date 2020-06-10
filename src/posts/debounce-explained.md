---
title: Debounce Explained
date: 2017-07-18
tags: ["javascript", "debounce"]
layout: layouts/post.njk
---

One of the often overlooked performance optimizations that can be made when working with user interactions is the implementation of a debounce function. This function prevents a overzealous user from killing the performance of your application.

The gist of what a debounce function does, is limiting the number of times a function can be invoked within a specified period. We can break this down into steps:

- We provide the debounce function with a wait period. This returns a function that accepts a another function, the one we want to debounce, as an argument.

- When we then provide the returned function with a argument, a timer is then set for the wait period specified.

- If the created debounce function is then called again before the timer has expired, the timer will be reset and started again.  Otherwise, the function is invoked.

These steps can be shown using a trivial debounce function I implemented called [picobounce](https://github.com/tiaanduplessis/picobounce):

```js
// 1. create the debounce function with half a second wait period
const debounce = picobounce(500)

const log = function log() {
  console.log('Boom!')
}

// 2. We invoke the debounce function
debounce(log)

// 3. Here we invoke it again. Interupting the timer. This causes it to reset
debounce(log)

// 3. Here we invoke it again, but since we will not interupt it again. "Boom!" will be logged
debounce(log) // Boom!

```

### Usage

For example, say you want to implement a real-time search in your application. As the user enters text, you shoot of a request to your API to retrieve the relevant results. The question then arises when this request should be made? A naive approach may be to perform the request on every keystroke, but a better one would be to use a debounce function:

```js

const getSearchInfo = function getSearchInfo() {
  // ... Some network stuff done here
  console.log('Request made!')
}

const debounce = picobounce(1000) // Waiting for 1 second

document.getElementById('searchInput').addEventListener('input', () => debounce(getSearchInfo))

```

By wrapping the execution of your request in a debounce function, you force a period to pass where no user interaction takes place . This is the ideal, since you want the user to finish typing their query before retrieving the results.

### Conclusion

This simple addition to your code can make a huge difference. Choosing the ideal wait period is dependent on your use case. As with most things, it's best to try out different wait periods and compare. Setting to long a period will make interactions feel more sluggish. In contrast, setting to short period will yield less  of a performance gain.
