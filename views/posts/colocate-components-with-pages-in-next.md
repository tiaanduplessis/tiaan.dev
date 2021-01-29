---
title: Colocate components with pages in Next.js
date: 2021-01-29
tags: ["next", "react"]
layout: layouts/post.njk
---

After recently using Sapper for a couple of applications, I found that I really enjoy the [underscored file naming convention](https://sapper.svelte.dev/docs#File_naming_rules) they provide for colocating services, utilities and components with pages/routes.

```bash
|____ reset-password
| |____ index.json.js
|____ sign-in
| |____ index.svelte
| |____ index.json.js
|____ _components
| |____ reset-modal.svelte
| |____ checkbox.svelte
| |____ copyright.svelte
| |____ input.svelte
| |____ forgot-modal.svelte
|____ sign-out
| |____ index.json.js
|____ _layout.svelte
|____ forgot-password
| |____ index.json.js
```

A bit hard to see from the tree, but I can add a _components directory within a route directory. Forming a nice tree. If I need a component to be shared among multiple pages, I can just move it up a directory.

Going back to working with Next.js, I found myself longing for a directory structure. Having my components in a separate directory felt a bit disjointed.

Scanning the Next.js issues for folks that might want something similar, I stumbled upon [this issue](https://github.com/vercel/next.js/issues/8454) where [shynome](https://github.com/shynome) gave a nice little workaround.

It boils down to using the `pageExtensions` [configuration option](https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions) and specifying a different page extension for your pages:

```
module.exports = {
    pageExtensions: ["page.js"],
}
```

Adding this to your `next.config.js` will make Next.js view `page.js` as the extension for pages. Meaning that any other JS files will be ignored. Making this possible:

```bash
|____ index.page.js
|____ other
| |____ index.page.js
| |____ components
| | |____ button.js
| | |____ heading.js
```

One thing to note is that this will also cause API routes to be ignored, so you should include another extension for them if applicable:

```js
module.exports = {
    pageExtensions: ["page.js", "api.js"],
}
```
