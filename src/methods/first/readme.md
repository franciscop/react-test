### .first()

```js
.first() -> $
```

Reduce the matched nodes to the first one. It's the same as [`.eq(0)`](#eq):

```js
const list = $(
  <ul>
    <li>A</li>
    <li>B</li>
    <li>C</li>
  </ul>,
);
expect(list.find("li").first()).toHaveText("A");
```

#### Parameters

None.

#### Return

An instance of React Test with a single node, or with no nodes if there was nothing matched.

#### Examples

Click the first item of a list:

```js
it("can open the first chat room", async () => {
  const rooms = $(<ChatRooms />).children();
  await rooms.first().click();
  expect(rooms.first()).toHaveClass("active");
});
```

#### Related

- [`.eq(index)`](#eq): keep only the node at the given index.
- [`.last()`](#last): keep only the last of the matched nodes.
