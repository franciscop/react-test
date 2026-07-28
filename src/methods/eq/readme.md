### .eq()

```js
.eq(index) -> $
```

Reduce the matched nodes to the single one at the given index. Defaults to the first element:

```js
const list = $(
  <ul>
    <li>A</li>
    <li>B</li>
    <li>C</li>
    <li>D</li>
  </ul>,
);
expect(list.find("li").eq()).toHaveText("A");
expect(list.find("li").eq(1)).toHaveText("B");
expect(list.find("li").eq(-1)).toHaveText("D");
```

#### Parameters

`index`: the index of the element to keep. It defaults to `0`, and you can also use negative indexes to count from the end. An index outside the range returns an instance with no nodes.

#### Return

An instance of React Test with a single node, or with no nodes if the index is out of range.

#### Notes

This is the wrapped counterpart of [`.get()`](#get): both take an index, but `.eq()` returns a React Test instance that you can keep chaining and passing to `expect()`, while `.get()` returns the native DOM Node:

```js
list.find("li").eq(1).find("a").click(); // Keeps chaining
list.find("li").get(1).textContent; // Native DOM Node
```

#### Examples

Assert on one item of a list and then act on it:

```js
it("can open the second chat room", async () => {
  const rooms = $(<ChatRooms />).children();
  expect(rooms.eq(1)).toHaveText("Birthday");
  await rooms.eq(1).click();
});
```

Navigate down from a single item:

```js
it("links the last item to the archive", () => {
  const items = $(<Menu />).find("li");
  expect(items.eq(-1).find("a")).toHaveAttribute("href", "/archive");
});
```

#### Related

- [`.first()`](#first): keep only the first of the matched nodes.
- [`.last()`](#last): keep only the last of the matched nodes.
- [`.get(index)`](#get): get the native DOM Node at that index instead of a React Test instance.
- [`.filter(selector)`](#filter): keep the nodes that match a selector instead of an index.
