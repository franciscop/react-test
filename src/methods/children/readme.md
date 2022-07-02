### .children()

```js
.children(selector) -> $
```

Get the children nodes of all of the current elements, with an optional selector:

```js
it("can select all list items", async () => {
  const list = $(
    <ul>
      <li>A</li>
      <li>B</li>
    </ul>
  );
  expect(list.children().text()).toBe("A");
  expect(list.children(":last-child").text()).toBe("B");
});
```

#### Parameters

`selector`: A CSS selector expression to match elements against

#### Return

An instance of `react-test` with the new children as itst elements.

#### Usage

Since we return an instance of `react-test`, we have to use `.toArray()` to convert it to an array so that we can iterate through them.

```js
it("can get the children", () => {
  const List = () => (
    <ul>
      <li>A</li>
      <li>B</li>
    </ul>
  );

  // Find the text of each element
  const text = $(<List />)
    .children()
    .toArray((item) => item.textContent);

  expect(text).toEqual(["A", "B"]);
});
```
