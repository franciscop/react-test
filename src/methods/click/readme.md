### .click()

Simulates a click on all the matched elements and waits for them to resolve:

```js
.click() -> promise
```

#### Usage

It needs to be awaited to ensure the side effects are run and the component re-rendered:

```js
it('clicks the current element', async () => {
  const counter = $(<Counter />);
  expect(counter.text()).toEqual("0");
  await counter.click();
  expect(counter.text()).toEqual("1");
});
```

#### Parameters

None. Any parameters passed will be ignored.

#### Returns

A promise that must be awaited before doing any assertion.

#### Examples

We might want to click a child element and not the top-level one:

```js
it('clicks all buttons inside', async () => {
  const counter = $(<Counter />);
  expect(counter.text()).toEqual("0");
  await counter.find('button').click();
  expect(counter.text()).toEqual("1");
});
```

#### Notes

It is internally wrapping the call with [`act()`](#act), so there's no need for you to also wrap it. Just make sure to `await` for it.
