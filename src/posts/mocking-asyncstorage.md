---
title: Mocking AsyncStorage in React Native
date: 2018-06-10
tags: ["react-native", "react", "javascript"]
layout: layouts/post.njk
---

Being long overdue, I wanted to add tests to a [simple AsyncStorage wrapper library](https://github.com/tiaanduplessis/react-native-modest-storage) of mine. After some struggle, I got a [jest mock](https://facebook.github.io/jest/docs/en/mock-functions.html) setup for [AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage.html#multimerge) which I'm happy with. To save others the headache, the steps I followed where:

- Install the following dependencies (assuming your starting from scratch):

```bash
yarn add --dev jest babel-jest babel-preset-react-native react-native
```

- Add configuration to `package.json` for [jest](https://facebook.github.io/jest/en/) and [babel](https://babeljs.io/). Remember to update the `setupFiles` path to where you keep yours:

```json
  "jest": {
    "setupFiles": [
      "./jest/setup.js"
    ]
  },
  "babel": {
    "presets": [
      "react-native"
    ]
  }
```

- Finally, add the mock to your `setup.js`. It is mostly based on [this StackOverflow answer](https://stackoverflow.com/a/41469576/7027045):

```js
jest.mock('react-native', () => {
    let items = {};

    return {
        AsyncStorage: {
            setItem: jest.fn((item, value) => {
                items[item] = value;
                return Promise.resolve(value);
            }),
            multiSet: jest.fn((item, value) => {
                item.forEach(([key, value]) => {
                    items[key] = value
                })
                return Promise.resolve(value);
            }),
            getItem: jest.fn((item, value) => {
                return Promise.resolve(items[item]);
            }),
            multiGet: jest.fn((keys) => {
                const result = keys.map(key => [key, items[key]])
                return Promise.resolve(result);
            }),
            removeItem: jest.fn((item) => {
                return Promise.resolve(delete items[item]);
            }),
            getAllKeys: jest.fn(() => {
                return Promise.resolve(Object.keys(items));
            }),
            clear: jest.fn((() => {
                items = {}
                return Promise.resolve()
            }))
        }
    }
});
```

After the configuration, your tests should be good to go.
