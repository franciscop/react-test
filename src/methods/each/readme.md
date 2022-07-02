### .each()

```js
.each(callback) -> $
```

Iterates over each of the nodes and returns _the same_ collection of nodes as there was before:

```js
it("can iterate over the items", () => {
  const list = $(
    <ul>
      <li>A</li>
      <li>B</li>
      <li>C</li>
    </ul>
  );
  const texts = [];
  const out = list.find("li").each((node) => texts.push(node.textContent));
  expect(texts).toEqual(["A", "B", "C"]);
  expect(out.get().textContent).toBe("A");
});
```

#### Parameters

`callback`: the function that receives each of the nodes currently matched. It receives (similarly to JS' `.forEach()`):

- `node`: the current node being iterated on.
- `index`: the index of the current node in the matched list.
- `list`: an array with all of the nodes that are being iterated over.

#### Return

An instance of React-Test with the same collection as before calling `.each()`.
