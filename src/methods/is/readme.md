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

`selector`: any one of these:

- a string containing the CSS selector that nodes must match
- a ReactTest instance containing a number of nodes. All the matched nodes must be in the ReactTest instance nodes
- a callback that will keep the element if it returns `true`. It receives:
  - `node`: the current node being iterated on.
  - `index`: the index of the current node in the matched list.
  - `list`: an array with all of the nodes that are being iterated over.

#### Return

A boolean, `true` to indicate all of the selector matches all of the nodes, `false` to indicate at least one (or more) fail the condition. An empty array will always return `true`.

#### Notes

For a given selector, if you apply `.filter(selector).is(selector)` (both being the same CSS selector) it will **always** return true.

#### Examples

> TODO

```js
// Check that the important class belongs to a direct list item
expect(list.find(".important").is(list.children())).toBe(true);
```

#### Related

- [`.filter(selector)`](#filter): a method that returns a new collection only with nodes that pass the matcher.
