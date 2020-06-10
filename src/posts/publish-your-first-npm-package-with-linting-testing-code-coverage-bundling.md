---
title: Publish your first npm package with Linting, Testing, Code Coverage & bundling
date: 2018-10-15
tags: ["javascript"]
layout: layouts/post.njk
---

In this tutorial I’ll will be taking you through:

* Setting up a new package repository.

* Adding and configuring bundling with [microbundle](https://github.com/developit/microbundle).

* Adding and configuring testing and code coverage with [Jest](https://github.com/facebook/jest).

* Adding and configuring with [Standard JS](https://standardjs.com/).

* Lastly, publishing the package to the [npm registry](https://www.npmjs.com/).

## Setup

Head over to [npmjs](https://www.npmjs.com/) and register a new account. This will be needed later when you actually publish the package to the registry. Remember to verify your email address.

After completing registration, we need to make sure that your environment is set up. Run the following to check your [node](https://nodejs.org/en/) & [npm](https://www.npmjs.com/) versions:

```bash
$ node -v && npm -v
v10.9.0
6.4.1
```

If you have a very old version installed please update it, otherwise, if [npm](https://www.npmjs.com/) & [node](https://nodejs.org/en/) are not currently installed you can use the excellent [n](https://github.com/tj/n) [node](https://nodejs.org/en/) version manager:

```bash
$ curl -L https://git.io/n-install | bash
```

After all that we are ready to create the package. In your terminal, create a new directory and cd into it. You should also initialise a new git repository:

```bash
$ mkdir publishing-npm-pkgs
$ cd publishing-npm-pkgs
$ git init
```

The name you choose for your package isn’t important, just be sure that it hasn’t already been taken on [the registry](https://www.npmjs.com/) by searching for it.

Once in the directory, we can initialize our package. [npm](https://www.npmjs.com/) will then ask you a couple of questions about the package:

```bash
$ npm init

This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (publishing-npm-pkgs)
version: (1.0.0)
description: How to publish npm packages with linting, testing, code coverage & bundling
entry point: (index.js) dist/index.js
test command: jest
git repository:
keywords: pkg
author: Tiaan du Plessis
license: (ISC) MIT
```

You should now have a package.json file within the directory. Next, you should create a .gitignore file:

```bash
$ touch .gitignore
```

And add the following to it:

```
node_modules
coverage
dist
```

Here we ignore the node_modules directory of dependencies, the coverage directory that is generated when running our code coverage script as well as the dist directory for our bundled files. Next, we are going to install the development dependencies required for our package. These are:

* [microbundle](https://github.com/developit/microbundle) — A Zero-configuration bundler for tiny modules. Allowing us to make our package available in different formats

* [jest](https://github.com/facebook/jest) — A delightful JavaScript testing framework which we will use for running our unit tests & getting code coverage

* [babel-preset-env](https://www.npmjs.com/package/babel-preset-env) — Used by [jest](https://github.com/facebook/jest) in our case to understand the new module syntax.

* [standard](https://standardjs.com/) — A preconfigured Javascript linter & formatter we will run on our files.

This may take a while depending on your connection:

```bash
npm install --save-dev microbundle jest babel-preset-env standard
```

Now comes the fun part of configuring our development dependencies.

## Setup [microbundle](https://github.com/developit/microbundle)

Firstly, we need to add a build script to our package.json file:

```
...
"scripts": {
    ...
    "build": "microbundle --name getPkg"
},
```

Note that I’m also specifying the name that [microbundle](https://github.com/developit/microbundle) should use for the [UMD format](https://github.com/umdjs/umd). Next, we need to tell [microbundle](https://github.com/developit/microbundle) what the entry-point is for our package as well as to where the bundled files should be generated. Add this to your package.json file:

```
...
  "main": "dist/index.js",
  "umd:main": "dist/index.umd.js",
  "module": "dist/index.mjs",
  "source": "src/index.js",
  ...
```

We will create src/index.js file shortly after setting up the rest of our dependencies.

## Setup [standard](https://standardjs.com/)

Next, we need to add a lint script to our package.json file:

```
...
"scripts": {
    ...
    "lint": "standard --fix"
},
```

The --fix flag tells [standard](https://standardjs.com/) it should attempt to fix linting issues automatically if possible. We also need to configure [standard](https://standardjs.com/) to recognize [jest](https://github.com/facebook/jest) as part of the environment by adding this to our package.json file:

```
...
  "standard": {
    "env": {
      "jest": true
    }
  }
```

## Setup [jest](https://github.com/facebook/jest)

Next, we need to add a couple of testing related scripts to our package.json file:

```
"scripts": {
    ...
    "test": "jest",
    "coverage": "jest --coverage",
    "watch": "jest --watch"
},
```

These scripts are used to run tests, generate coverage reporting and start [jest](https://github.com/facebook/jest) in watch mode.

A last bit of setup is adding .babelrc file so [jest](https://github.com/facebook/jest) knows how to handle the new module syntax:

```bash
$ touch .babelrc
```

Your .babelrc file should contain the following:

```
{
    "presets": [
        "env"
    ]
}
```

## Writing Source

Since the focus is on the tooling and the publishing process, we will keep our code simple. Create an index.js file as well as an index.test.js file in the src directory:

```
$ mkdir src
$ touch src/index.js
$ touch src/index.test.js
```



Now the moment of truth, add the following to `src/index.js`:

```js
// src/index.js
export default function getPkg() {
    return 'This package has been published'
}
```

Indeed the next [React](https://reactjs.org/) has just been created. Add the following basic test to src/index.test.js file:

```js
// src/index.test.js
import getPkg from './'

test('should get the pkg', () => {
    // Arrange
    const expected = 'This package has been published'

    // Act
    const actual = getPkg()

    // Assert
    expect(actual).toBeDefined()
    expect(actual).toBe(expected)
})
```

## Running Scripts

Now we can run our different scripts. Since this is a basic module there shouldn’t be any issues. We start with linting:

```bash
$ npm run lint
```

Then move on to testing:

```bash
$ npm test
```

For the sake of interest, we can check the code coverage:

```bash
$ npm run coverage
```

And finally, we build our dist directory.

```bash
$ npm run build
```

If you encounter any issues when running these commands, [Google](https://www.google.com/) is your best bet.

## Publish Time!

Now that we have everything configured nicely, we are ready to publish version 1.0.0 of our package. Start by signing in with the user you created on [npm](https://www.npmjs.com/):

```bash
$ npm adduser
```

And then finally publish the package:

```bash
$ npm publish
```

Congrats! You just published your first module.

## Next steps

* Add [husky](https://github.com/typicode/husky) so your linting, testing & build process runs as a git hook.

* Create a Github repo and push up your new package.

*A special thanks to [Richard](https://github.com/Executioner1939), [Mardu](https://github.com/marduSwanepoel) & [Pedre](https://github.com/pedreviljoen) for reviewing this post.*
