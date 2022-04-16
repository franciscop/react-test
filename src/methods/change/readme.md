### .change()

```js
.change(value) -> promise
```

Simulates a change in an element, like an input. It should be awaited for the side effects to run and the component to re-rendered:

```js
it("can change the current element value", async () => {
  const input = $(<input defaultValue="hello" />);
  expect(input).toHaveValue("hello");
  await input.change("world");
  expect(input).toHaveValue("world");
});
```

It works on elements of type `<input>`, `<textarea>` and `<select>`.

> `.change()` already wraps the call with act(), so there's no need for you to also wrap it. Just make sure to await for it.

#### Parameters

`value`: the new value for the element. If it's a text input, textarea or select, it should be a `string`. If it's a `checkbox` or `radio`, it should be a true/false `boolean`.

#### Returns

A promise that must be awaited before doing any assertion.

#### Examples

Simple way to test that the input text can be changed:

```js
it("works with inputs", async () => {
  const input = $(<input defaultValue="hello" />);
  expect(input).toHaveValue("hello");
  await input.change("Francisco");
  expect(input).toHaveValue("Francisco");
});
```

For checkboxes it should receive a true/false:

```js
it("works with inputs", async () => {
  const input = $(<input type="checkbox" />);
  expect(input.get(0).checked).toBe(false);
  await input.change(true);
  expect(input.get(0).checked).toBe(true);
});
```

#### Notes

**Expect this component to change** in the future, since its behavior now is complex and inconsistent. So in the future we will do either of these:

- Make it more complex AND consistent, e.g. accept numbers for `<input type="number" />`, a text option for `type="radio"` (with validation), etc.
- Split into different methods, each one being simpler, e.g. `.text(newValue)` for text inputs, `.check`, `.check(false)` or `.uncheck()` for checkboxes, `.pick(opt)` for selects, etc.
- Other?

It is internally wrapping the call with [`act()`](#act), so there's no need for you to also wrap it. Just make sure to `await` for it.
