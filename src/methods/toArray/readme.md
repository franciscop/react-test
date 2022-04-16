### .toArray()

Get all of the currently matched nodes as a plain array:

```js
const List = () => (
  <ul>
    <li>A</li>
    <li>B</li>
  </ul>
);

// Find the text of each node
const text = $(<List />)
  .children()
  .toArray()
  .map((item) => $(item).text());

expect(text).toEqual(["A", "B"]);
```
