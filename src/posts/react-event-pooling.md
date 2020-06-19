---
title: React Event Pooling
date: 2019-04-04
tags: ["react", "js"]
layout: layouts/post.njk
---

When working with events in React, you're not working with the browsers native events, but rather with instances of `SyntheticEvent`. This is React's own event handling system . `SyntheticEvent` is a wrapper around native events to ensure consistent behavior across different browsers. If you really need to, you can still get to the native browser event via `.nativeEvent`:

```js
class Component extends React.Component {
  handleEvent = (event) => {
    console.log(event); // instance of SyntheticEvent
    console.log(event.nativeEvent); // Native browser event
  };

  render() {
    // ...
  }
}
```

One key difference between a `SyntheticEvent`'s and native events is that React creates a synthetic instance pool. This means whenever an event is triggered, React takes an instance of SyntheticEvent from the pool and populates the properties. Instances are thus reused. The pooling is done for performance reasons as creating an instance of SyntheticEvent for each browser event will be very costly.

## Asynchronous Caveat

Because a synthetic instance pool is used, instances have to be nullified after the handler has finished running. This means running asynchronous operations within the event handler will not work as expected:

```js
class Component extends React.Component {
  handleEvent = (event) => {
    setTimeout(() => {
      console.log(event); // null
    });
  };

  render() {
    // ...
  }
}
```

If you need to access the event in an asynchronous manner, you need to call `event.persist()` which will remove the SyntheticEvent from the pool.

## Reference

- [React Docs](https://facebook.github.io/react/docs/events.html)
