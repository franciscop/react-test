### .click()

Calls a click event on all of the matched nodes

```js
.click(selector?: string, time?: number)
```

For `.click()`, you can pass a selector and/or a running time:

#### _string_ `.click('button')`

The child element that receives the click. Leave it empty to click the current element. This is a shorthand of `.find(selector).click()` for convenience.

#### _number_ `.click(100)`

The time to *wait* after the click for the effect to be settled. If they are not immediate (API call, timeouts, transitions, etc) make sure that the time is longer than the effect. Internally this will wrap the effect with an [act()](https://reactjs.org/docs/test-utils.html#act) that works for the specified time.

You can combine them as well:

```js
it('clicks all buttons inside', async () => {
  const $dom = $(<Counter />);
  expect($dom.text()).toEqual("0");
  await $dom.click('button', 100);
  expect($dom.text()).toEqual("1");
});
```