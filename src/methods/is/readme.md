### .is()

```js
.is(selector) -> Boolean
```

Check whether all of the nodes match the selector:

```js
it("can properly match the button", () => {
  const button = $(<a className="button active">Click me</a>);

  expect(button.is("a")).toBe(true);
  expect(button.is(".active")).toBe(true);
  expect(button.is(".inactive")).not.toBe(true);
});
```

#### Parameters

`selector`: the CSS selector to run against each of the matched nodes.

#### Return

A boolean, `true` to indicate all of the selector matches all of the nodes, `false` to indicate at least one (or more) fail the condition. An empty array will always return `true`.

#### Notes

For a given selector, if you apply `.filter(selector).is(selector)` (both being the same selector) it will **always** return true.

#### Examples

> TODO

#### Related

- [`.filter(selector)`](#filter): a method that returns a new collection only with nodes that pass the matcher.
