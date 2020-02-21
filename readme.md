# React Test [![npm install react-test](https://img.shields.io/badge/npm%20install-react--test-blue.svg)](https://www.npmjs.com/package/react-test) [![test badge](https://github.com/franciscop/react-test/workflows/tests/badge.svg)](https://github.com/franciscop/react-test/actions)

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

Its syntax follows a similar schema to jQuery so it's very easy to write expressive tests. The best way to test declarative code is with an imperative library.


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



### Frequently Asked Questions

**Is this an official React library?**

No, it's not. This follows the community convention of calling a library related to React as `react-NAME`. It is made [by these contributors](https://github.com/franciscop/react-test/graphs/contributors) without any involvement of Facebook or [React](https://reactjs.org/).

**How can I contribute?**

Please read the [Contributing Guide](./Contributing.md) where we explain how to get started with the project. Right now there are [some issues labelled for beginners](https://github.com/franciscop/react-test/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) so please feel free to implement those!
