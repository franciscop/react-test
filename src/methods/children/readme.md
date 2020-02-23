### .children()

Get the direct children of all of the nodes with an optional filter. Inspired by [UmbrellaJS's .children()](https://umbrellajs.com/documentation#children)

```js
.children(filter: string)
```

#### Parameters

`filter`: A selector expression to match elements against

#### Returns

An instance of `react-test` with the new children as nodes

#### Usage

Since we return an instance of `react-test`, we have to use `.toArray()` to convert it to an array so that we can iterate through them.

```js
import $ from 'react-test'

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
  .map(item => $(item).text());

expect(text).toEqual(["A", "B"]);
```