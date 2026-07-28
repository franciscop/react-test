### .last()

```js
.last() -> $
```

Reduce the matched nodes to the last one. It's the same as [`.eq(-1)`](#eq):

```js
const list = $(
  <ul>
    <li>A</li>
    <li>B</li>
    <li>C</li>
  </ul>,
);
expect(list.find("li").last()).toHaveText("C");
```

#### Parameters

None.

#### Return

An instance of React Test with a single node, or with no nodes if there was nothing matched.

#### Examples

Check the item that was just added to a list:

```js
it("appends the new todo at the end", async () => {
  const todos = $(<Todos />);
  await todos.find("input").type("Buy milk");
  await todos.find("form").submit();
  expect(todos.find("li").last()).toHaveText("Buy milk");
});
```

#### Related

- [`.eq(index)`](#eq): keep only the node at the given index.
- [`.first()`](#first): keep only the first of the matched nodes.
