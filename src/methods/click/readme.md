### .click()

Calls a click event on all of the matched nodes

```js
.click(selector?: string) -> promise
```

For `.click()`, you can pass an optional css selector. It returns a promise that must be awaited to ensure it works.

#### _string_ `.click('button')`

The child element that receives the click. Leave it empty to click the current element. This is a shorthand of `.find(selector).click()` for convenience.

```js
it('clicks the current element', async () => {
  const counter = $(<Counter />);
  expect(counter.text()).toEqual("0");
  await counter.click();
  expect(counter.text()).toEqual("1");
});

it('clicks all buttons inside', async () => {
  const counter = $(<Counter />);
  expect(counter.text()).toEqual("0");
  await counter.click('button');
  expect(counter.text()).toEqual("1");
});
```

#### Advanced

It is internally wrapping the call with [`act()`](#act), so there's no need for you to also wrap it. Just make sure to `await` for it.
