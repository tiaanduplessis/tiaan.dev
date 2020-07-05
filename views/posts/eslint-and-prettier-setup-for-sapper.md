---
title: ESLint and Prettier setup for Sapper
date: 2020-07-05
tags: ["svelte"]
layout: layouts/post.njk
---

I recently started to get very into [Svelte](https://svelte.dev/). The [developer experience has been delightful]((https://github.com/feltcoop/why-svelte)), especially transitions and animations which have always felt a bit meh to me in [React](https://reactjs.org/) land.

In the world of [Svelte](https://svelte.dev/), the meta-framework of choice is [Sapper](https://sapper.svelte.dev). It draws a [close comparison to Next.js](https://sapper.svelte.dev/docs#Comparison_with_Next_js). I frequently use [Next.js](https://nextjs.org/) for projects at [Full Facing](https://www.fullfacing.com/). So it was an easy choice.

My first real [Svelte](https://svelte.dev/)/[Sapper](https://sapper.svelte.dev) application is a [marketing site for a development agency](https://github.com/and-cru/cru-web-marketing). As with any project, I consider it essential to have linting and formatting in place. It also forms the base of [the Testing Trophy](https://testingjavascript.com/). Unfortunately, I usually forget the configuration steps quite quickly so I decided to document them here. Yes, you have been reading documentation the whole time.

## Installing dependencies

```bash
npm install -D eslint prettier
```

We start by installing [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/). We will also need plugins to support [Svelte](https://svelte.dev/) and [Cypress](https://www.cypress.io/). [Cypress](https://www.cypress.io/) is included in the [default Sapper template](https://github.com/sveltejs/sapper-template-rollup) so I include it in the configuration. An [ESLint](https://eslint.org/) configuration will also be needed to disable all formatting related rules. So [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) can play together nicely.

```bash
npm install -D prettier-plugin-svelte eslint-plugin-svelte3 eslint-config-prettier eslint-plugin-cypress
```

## Configuration

We can now create the configuration files for [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) as well as a `.eslintignore` file to ignore the build output directory.

```bash
touch .prettierrc.js .eslintrc.js .eslintignore
```

A lot of the configuration options are my preference, so update as you see fit.

```js
// .prettierrc.js
module.exports = {
  svelteSortOrder: 'styles-markup-scripts',
  svelteStrictMode: true,
  svelteBracketNewLine: true,
  svelteAllowShorthand: false,
  plugins: ['prettier-plugin-svelte']
}
```

```js
// .eslintrc.js
module.exports = {
  "extends": ["eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  plugins: [
    'svelte3',
  ],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
    },
    {
      "extends": [
        "plugin:cypress/recommended"
      ],
      files: ["cypress/**/*"],
      env: {
        "cypress/globals": true
      },
      plugins:[
        "cypress"
      ]
    }
  ],
}
```

```
// .eslintignore
__sapper__
```

We should be good to go. Now we need to add the scripts to the `package.json`. I'm also making prettier format the markdown, JSON, CSS, and HTML file types.

```json
// package.json
"scripts": {
  ...
  "format": "prettier --write ./**/*.{js,svelte,md,html,css,json}",
  "prelint": "npm run format",
  "lint": "eslint './**/*.{js,svelte}'",
  "lint:fix": "eslint --fix './**/*.{js,svelte}'",
  "pretest": "npm run lint",
  ...
},
```

## Bonus points

After running the linter initially and fixing all the issues, you probably don't want this process to be manual every time you change a source file. Here is where [lint-staged](https://github.com/okonet/lint-staged) comes into play.

```bash
npx mrm lint-staged
```


Now [lint-staged](https://github.com/okonet/lint-staged) and [husky](https://github.com/typicode/husky) are installed. The command should configure both for you out of the box. Resulting in the options being added to your `package.json`. Now the linter will only run on staged files.

```json
 "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,svelte,md,html,css,json}": "prettier --write",
    "*.{js,svelte}": "eslint --cache --fix"
  }
```
