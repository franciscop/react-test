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

  const text = list.children().array((item) => $(item).text());
  expect(text).toEqual(["A", "B"]);
});
```

#### Parameters

`callback`: a function that will behave like `.map()`.

#### Return

A plain array, with the nodes if there's no callback or with whatever the callback value returns.

#### Examples

It's very useful to make plain assertions for groups of items:

```js
it("extracts an array of Strings from a list", () => {
  const list = $(
    <ul>
      <li>A</li>
      <li>B</li>
    </ul>
  );
  const items = list.children().array((node) => node.textContent);
  expect(items).toEqual(["A", "B"]);
});
```
