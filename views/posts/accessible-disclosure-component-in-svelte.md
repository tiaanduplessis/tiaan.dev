---
title: Accessible Disclosure component in Svelte
date: 2020-09-22
tags: ["front-end", "svelte"]
layout: layouts/post.njk
eleventyExcludeFromCollections: true
---

According to the https://www.w3.org/TR/wai-aria-practices/#disclosure a disclosure component is a button that controls the visibility of a section of content. This can frequently be seen in the FAQs section of a site and is often used to provide additional contextual information to a media. The complete implementation can be viewed [in the Svelte REPL](https://svelte.dev/repl/7504bc6ce00e4331b7ecd4481cbcf6a2?version=3.25.1).

The basic mark up required consists of a button element to trigger the functionality and a container for the content. A button element should always be used as the trigger as the keyboard interactions are required to be compliant to the pattern.

```html
<button type="button">Click me</button>
<div id="content">Content</div>
```

Note that we add a ID to the content. This is so the correct relationship can be set up with the trigger using the `aria-controls` attribute. As the name implies, `aria-controls` is used to indicate that a element controls another.

```html
<button type="button" aria-controls="content">Click me</button>
<div id="content">Content</div>
```

Now that the relationship has been established functionality needs to be added to toggle the visibile state of the content. This can be achieved by setting the `aria-expanded` attribute **on the button element** and using boolean variable to set the hidden state of the content. This results in our final implementation.

```html
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

It is possible to SSR your Seltve components which results in the static HTML and CSS required to render static pages which then becomes hydrated afterwards. This is ideal for use cases where no JS is the default. In order for our disclosure component to still function correctly even without JS enabled, we can barrow from [the approach discribed by Andy Bell](https://hankchizljaw.com/wrote/a-progressive-disclosure-component/).

We are switching the default hidden state for the button and content respectively. Making the button hidden by default and the content visible. Switching it only when the JS executes.

```html
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

## React implementation

https://reakit.io/docs/disclosure/
reach ui link
