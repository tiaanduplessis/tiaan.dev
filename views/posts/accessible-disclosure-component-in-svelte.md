---
title: Accessible Disclosure component in Svelte
date: 2020-09-22
tags: ["front-end", "svelte"]
layout: layouts/post.njk
---

According to the [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices/#disclosure) a disclosure component is a button that controls the visibility of a section of content. This can frequently be seen in the FAQs section of a site and is often used to provide additional contextual information to a piece of media.

The basic mark up required consists of a button element to trigger the functionality and a container for the content. A button element should be used as the trigger as the keyboard interactions are required to be compliant with the pattern. As a rule of thumb, buttons should be your go-to for any on-page interactivity and Links for navigation.

```
<button type="button">Click me</button>
<div id="content">Content</div>
```

Note that we add an ID to the content. This is so the correct relationship can be set up with the trigger element using the `aria-controls` attribute. As the name implies, `aria-controls` is used to indicate that an element controls another.

```
<button type="button" aria-controls="content">Click me</button>
<div id="content">Content</div>
```

Now that the relationship has been established functionality needs to be added to toggle the visible state of the content. This can be achieved by setting the `aria-expanded` attribute **on the button element** and using a boolean variable to set the hidden state of the content. This results in our final implementation.

```
<script>
  let hidden = true;
  const handleClick = () => {
    hidden = !hidden;
  };
</script>

<button
  type="button"
  on:click="{handleClick}"
  aria-controls="content"
  aria-expanded="{!hidden}"
>
  Click me
</button>
<div id="content" {hidden}>
  Content
</div>
```

## Progressive enhancment

When using SSR for your Svelte components, the result is static HTML and CSS which then becomes hydrated afterward with JS. However, if JS is disabled this hydration will never take place which might lead to broken functionality if not handled correctly. For our disclosure component to still function, we can borrow from [the approach described by Andy Bell](https://hankchizljaw.com/wrote/a-progressive-disclosure-component/).

We are switching the default hidden state for the button and content respectively. Making the button hidden by default and the content visible. Switching it only when the JS executes.

```
<script>
  import { onMount } from "svelte";
  let hidden = false;
  let mounted = false;

  onMount(() => {
    hidden = true;
    mounted = true;
  });

  const handleClick = () => {
    hidden = !hidden;
  };
</script>

<button
  hidden="{!mounted}"
  on:click="{handleClick}"
  aria-controls="content"
  aria-expanded="{!hidden}"
>
  Button
</button>

<div id="content" {hidden}>
  Content
</div>
```

The complete implementation can also be viewed [in the Svelte REPL](https://svelte.dev/repl/7504bc6ce00e4331b7ecd4481cbcf6a2?version=3.25.1).

## React

If you are using [React](https://reactjs.org/) as your UI library of choice, [Reakit](https://reakit.io/docs/disclosure/) and [Reach UI](https://reach.tech/disclosure) provide excellent unstyled Disclosure components that can be slotted into any project.
