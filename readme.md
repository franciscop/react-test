# react-test [![npm install react-test](https://img.shields.io/badge/npm%20install-react--test-blue.svg)](https://www.npmjs.com/package/react-test) [![test badge](https://github.com/franciscop/react-test/workflows/tests/badge.svg)](https://github.com/franciscop/react-test/blob/master/.github/workflows/tests.yml)

> Early package! Please [watch it in Github](https://github.com/franciscop/react-test/watchers) for updates and [feel free to open issues](https://github.com/franciscop/react-test/issues) ❤️

An expressive testing library for React:

```js
import React, { useState } from "react";
import $ from "react-test";

const Counter = () => {
  const [counter, setCounter] = useState(0);
  const increment = () => setCounter(counter + 1);
  return <div onClick={increment}>{counter}</div>;
};

it("Increments the counter one at a time", async () => {
  const $counter = $(<Counter />);
  expect($counter.text()).toEqual("0");
  await $counter.click();
  expect($counter.text()).toEqual("1");
  await $counter.click();
  expect($counter.text()).toEqual("2");
});
```

The interface is a subset of jQuery, where you can navigate the DOM once it has been created:

```js
const Counter = () => {
  const [counter, setCounter] = useState(0);
  const increment = () => setCounter(counter + 1);
  return <div><button onClick={increment}>{counter}</button></div>;
};

it('Also works with nested events', async () => {
  const $dom = $(<Counter />);
  expect($dom.text()).toEqual("0");
  await $dom.click();
  expect($dom.text()).toEqual("0");
  await $dom.click('button');
  // Same as: await $dom.find('button').click();
  expect($dom.text()).toEqual("1");
});
```

For `.click()`, you can pass a selector and/or a running time:
- `.click('button')` (string): the child element that receives the click. Leave it empty to click the current element. This is a shorthand of `.find(selector).click()` for convenience.
- `.click(100)` (number): the time to *wait* after the click for the effect to be settled. If they are not immediate (API call, timeouts, transitions, etc) make sure that the time is longer than the effect. Internally this will wrap the effect with an [act()](https://reactjs.org/docs/test-utils.html#act) that works for the specified time.

You can combine them as well:

```js
it('clicks all buttons inside and wait 200ms', async () => {
  const $dom = $(<Counter />);
  expect($dom.text()).toEqual("0");
  await $dom.click('button', 200);
  expect($dom.text()).toEqual("1");
});
```



## API

Unknown: `.size()`, `.value()`, `.checked`

### $() ✅

### .attr() ✅

### .children() ❌

### .click() ✅

### .closest() ❌

### .data() ❌

### .each() ❌

### .filter() ❌

### .find() ✅

### .first() ✅

### .html() ✅

### .is() ❌

### .last() ✅

### .map() ✅

### .parent() ❌

### .siblings() ❌

### .text() ✅

### .trigger() ✅
