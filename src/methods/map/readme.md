### .map()

```js
.map(callback) -> $
```

Iterates over each of the nodes and returns a new collection with the nodes that were returned from the callback:

```js
it("can get a new collection", () => {
  const list = $(
    <ul>
      <li>A</li>
      <li>B</li>
    </ul>
  );
  // Same as .find('li')
  const items = list.map((node) => node.querySelectorAll("li"));
  expect(items.array((node) => node.nodeName)).toEqual(["LI", "LI"]);
});
```

#### Parameters

`callback`: the function that receives each of the nodes currently matched. It receives (similarly to JS' `.forEach()`):

- `node`: the current node being iterated on.
- `index`: the index of the current node in the matched list.
- `list`: an array with all of the nodes that are being iterated over.
- returns the new nodes

#### Return

An instance of React-Test with the new collection of nodes. Nested arrays (or NodeLists) are flattened and empty and duplicates items are also removed.

#### Related

- `.each(callback)`: Similar to `.map()`, but returns the original collection.
