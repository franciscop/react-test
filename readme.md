# react-query-test [![npm install react-query-test](https://img.shields.io/badge/npm%20install-react--query--test-blue.svg)](https://www.npmjs.com/package/react-query-test)

> Warning: this is an early/experimental release

An expressive testing library for React:

```js
import React, { useState } from "react";
import $ from "react-query-test";

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

it('Also works with nested events', () => {
  const $dom = $(<Counter />);
  expect($dom.text()).toEqual("0");
  await $dom.click();   // No event on the root <div />
  expect($dom.text()).toEqual("0");
  await $dom.find('button').click();  // Now it works
  expect($dom.text()).toEqual("1");
});
```


## API

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

### .size() ?

### .text() ✅

### .trigger() ✅
