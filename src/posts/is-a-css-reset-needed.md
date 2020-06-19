---
title: Is a CSS Reset Needed
date: 2017-06-23
tags: ["css"]
layout: layouts/post.njk
---

Recently I created a [CSS reset library](https://github.com/tiaanduplessis/nanoreset). Though there are [more established solutions](https://necolas.github.io/normalize.css/), this library was opinionated to my own preferences. With minor differences in the styling being applied.

A discussion emerged on [reddit](https://redd.it/6bvawd) on the actual value a CSS reset. I favor including it, but at different scales.

## The What and Why

If you open your browser's dev-tools and look at the styles applied to a random element, you my notice rules marked as `user agent stylesheet`. Browsers apply these styles for the sake of legibility. Ensuring that even if no CSS is used, the page is still readable. Unfortunately, they are not consistent across browsers.

That's where a CSS reset comes in. It's a set of CSS rules that apply styling to HTML elements with the purpose of providing a consistent baseline. It overrides the browsers base styles with defaults specified by the reset, thus preventing cross-browser differences as much as possible.

## Arguments Against

Some developers consider adding a reset to a project as a foundational step. Popular CSS frameworks such as [Bootstrap](https://getbootstrap.com) even include a reset.

Others however criticize it for introducing unneeded bloat. Adding a bunch of rules that will be overwritten anyway. It's understandable that you would want minimize the amount of CSS sent. If you feel this way, I recommend looking for tools and libraries in the ecosystem to help you cleanup your CSS as part of the build process. I have found [Purify CSS](https://github.com/purifycss/purifycss) to be useful in removing unused CSS from my projects.

The other argument against a reset is that some of the rules being applied can be to harsh. Even being considered harmful. if this is your argument, why not create your own reset? Apply your own thoughts on what a reset should contain and share it with others.

## My Opinion

I tend to include a reset in projects for my own peace of mind. However, the size of this reset often differs relative to the scope of the project and the intended users. For a small project, a simple reset does the trick:

```css
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
```

A lot of developers prefer this minimalist approach. As a project grows however, with more users using it on different browsers (check your analytics), I include a more comprehensive reset in the project.

## Conclusion

In the end, it's about your choice as a developer on whether including a reset into your project will be beneficial to your development efforts as well as the experience of users.
