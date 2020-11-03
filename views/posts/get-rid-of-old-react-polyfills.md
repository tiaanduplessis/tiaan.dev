---
title: Get Rid of Old React Polyfills using Webpack
date: 2020-10-21
tags: ["react"]
layout: layouts/post.njk
---

While looking for possible optimizations to our [Webpack](https://webpack.js.org/) configuration, I came across [this gem](https://github.com/GoogleChromeLabs/webpack-libs-optimizations/pull/17/commits/a0a9bb580941fff3a0640444400135f9e0432a2d) from [
Porfirio](https://github.com/porfirioribeiro). With this neat little Webpack aliasing trick we can remove the need of depending on outdated polyfills for [React](https://reactjs.org/). In this case [react-lifecycles-compat](https://github.com/reactjs/react-lifecycles-compat) and [create-react-context](https://github.com/jamiebuilds/create-react-context).

This aliasing will work for [React 16.4](https://reactjs.org/) and above as the functionality being polyfilled is now part of core. To see if your project will benefit from this optimization, run `npm ls` to find any dependencies using these polyfills:

```bash
npm ls create-react-context react-lifecycles-compat
```

for our project I had both polyfills as sub dependencies:

```bash
  │ └─┬ react-popper@1.3.7
  │   └── create-react-context@0.3.0
  └─┬ react-modal@3.11.2
    └── react-lifecycles-compat@3.0.4
```

As suggested in the pull request, we can get around using these polyfills by creating an alias file, `aliases.js` in this case, which replicates the expected API for the sub dependencies:

```js
// create-react-context
export { createContext as default } from "react";

// react-lifecycles-compat
export function polyfill(Component) {
  return Component;
}
```

We now need to update our Webpack configuration to resolve to these aliases:

```js
//...
config.resolve.alias["create-react-context"] = path.join(__dirname, "aliases");
config.resolve.alias["react-lifecycles-compat"] = path.join(
  __dirname,
  "aliases"
);
//...
```

As mentioned in the Pull request, the aliasing resulted in around 5 kB in easy savings.
