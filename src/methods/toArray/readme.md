### .toArray()

```js
.toArray(callback) -> Array
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

  const text = list.children().toArray((item) => $(item).text());
  expect(text).toEqual(["A", "B"]);
});
```
