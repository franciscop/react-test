### .array()

```js
.array(callback) -> Array
```

Get all of the currently matched nodes as a plain array:

```js
it("can get the text of the children", () => {
  const list = $(
    <ul>
      <li>A</li>
      <li>B</li>
    </ul>
  );
  const texts = list.children().array("textContent");
  expect(texts).toEqual(["A", "B"]);
});
```

#### Parameters

`callback`: it can be either of these:

- `Function`: a function that will behave like `.map()`
- `String`: the key to extract the value from each node.

#### Return

A plain array, with the nodes if there's no callback, with the value the callback returns if it's a function or with the values for the given keys passed as a string.

#### Examples

It's very useful to make plain assertions for groups of items:

```js
it("can use a key for each of the nodes", () => {
  const list = $(
    <ul>
      <li>A</li>
      <li>B</li>
    </ul>
  );
  const items = list.children().array("textContent");
  expect(items).toEqual(["A", "B"]);
});
```

With a callback you can perform more expressive methods:

```js
it("can use a function to return more complex data", () => {
  const list = $(
    <ul>
      <li>A</li>
      <li>B</li>
    </ul>
  );
  const items = list
    .children()
    .array((node) => node.nodeName + " " + node.textContent);
  expect(items).toEqual(["LI A", "LI B"]);
});
```
