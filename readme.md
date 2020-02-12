# React Test [![npm install react-test](https://img.shields.io/badge/npm%20install-react--test-blue.svg)](https://www.npmjs.com/package/react-test) [![test badge](https://github.com/franciscop/react-test/workflows/tests/badge.svg)](https://github.com/franciscop/react-test/blob/master/.github/workflows/tests.yml)

> Early package! Please [watch it in Github](https://github.com/franciscop/react-test/watchers) for updates and [feel free to open issues](https://github.com/franciscop/react-test/issues).

> This project is [looking for beginner Open Source contributors](./Contributing.md)! ❤️

A complete and expressive testing library for React:

```js
import $ from "react-test";

it("increments the counter when clicked", async () => {
  const counter = $(<Counter />);
  expect(counter.text()).toEqual("0");
  await counter.click();
  expect(counter.text()).toEqual("1");
});
```

The interface is a subset of jQuery so you can navigate the DOM as usual:

```js
const Counter = () => {
  const [counter, setCounter] = useState(0);
  const increment = () => setCounter(counter + 1);
  return <div><button onClick={increment}>{counter}</button></div>;
};

it("Also works with nested events", async () => {
  const dom = $(<Counter />);
  expect(dom.text()).toEqual("0");
  await dom.find("button").click();
  expect(dom.text()).toEqual("1");
});
```

## Getting Started

You need a React project already working. That's on you, but we recommend [Create React App](https://create-react-app.dev/):

```bash
npx create-react-app my-app
cd my-app
```

Then you install `react-test`, only for development:

```bash
npm install react-test --save-dev
```

Now you can write tests, let's say you have this component:

```js
// src/Counter.js
import React, { useState } from "react";

export default function Counter () {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  return <button onClick={increment}>{count}</button>;
};
```

You can write the following test to make sure it's working:

```js
// src/Counter.test.js
import React from "react";
import $ from "react-test";
import Counter from "./Counter";

describe("Counter.js", () => {
  it("is initialized to 0", () => {
    const counter = $(<Counter />);
    expect(counter.text()).toBe("0");
  });

  it("can be incremented with a click", async () => {
    const counter = $(<Counter />);
    await counter.click();
    expect(counter.text()).toBe("1");
  });

  it("can be incremented multiple times", async () => {
    const counter = $(<Counter />);
    await counter.click();
    await counter.click();
    await counter.click();
    expect(counter.text()).toBe("3");
  });
});
```
