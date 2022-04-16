### \<Counter /\>

Let's say that we have a simple counter. Every time you click it, its value increments by one:

```js
// Counter.js
import React, { useState } from "react";

export default function Counter() {
  const [counter, setCounter] = useState(0);
  const increment = () => setCounter(counter + 1);
  return <button onClick={increment}>{counter}</button>;
}
```

All of our tests must be wrapped by `describe()` and need to import at least `React`, `react-test` and the component that we want to test:

```js
// Counter.test.js
import React from "react";
import $ from "react-test";
import Counter from "./Counter";

describe("Counter.js", () => {
  // Write your tests here
  // All of the examples below should go here
});
```

First, we might want to check the initial value of this counter. We will render it and use [`.toHaveText()`](#tohavetext) to check the plain-text content. Please note how this is text `"0"` and not a number ~`0`~:

```js
it("starts with 0", () => {
  const counter = $(<Counter />);
  expect(counter).toHaveText("0");
});
```

Great, this passes our test.

Now let's try clicking it once. Any user action **must** be treated as asynchronous, so we create a new `async` test for this.

We are also going to be using [the `.click()` method](#click) and awaiting for this click to be resolved:

```js
it("increments when clicked", async () => {
  const counter = $(<Counter />);
  await counter.click();
  expect(counter).toHaveText("1");
});
```

Let's repeat this with multiple clicks as well:

```js
it("can be incremented multiple times", async () => {
  const counter = $(<Counter />);
  await counter.click();
  await counter.click();
  await counter.click();
  expect(counter).toHaveText("3");
});
```

This component is working; the user clicks it, the value increments. That's awesome and most of the cases we would be done 🎉

But I also want to make sure there's not an issue where the state is shared. While in here the implementation is trivial, but in some cases it's not. So let's create two components and only _one_ of them:

```js
it("remains independent of other components", async () => {
  const counter1 = $(<Counter />);
  const counter2 = $(<Counter />);
  await counter2.click();
  expect(counter1).toHaveText("0");
  expect(counter2).toHaveText("1");
});
```

These also remain independent, great! I am sure this simple counter is working as expected. Let's see it all put together:

```js
// Counter.test.js
import React from "react";
import $ from "react-test";
import Counter from "./Counter";

describe("Counter.js", () => {
  it("starts with 0", () => {
    const counter = $(<Counter />);
    expect(counter).toHaveText("0");
  });

  it("increments when clicked", async () => {
    const counter = $(<Counter />);
    await counter.click();
    expect(counter).toHaveText("1");
  });

  it("can be incremented multiple times", async () => {
    const counter = $(<Counter />);
    await counter.click();
    await counter.click();
    await counter.click();
    expect(counter).toHaveText("3");
  });

  it("remains independent of other components", async () => {
    const counter1 = $(<Counter />);
    const counter2 = $(<Counter />);
    await counter2.click();
    expect(counter1).toHaveText("0");
    expect(counter2).toHaveText("1");
  });
});
```
