### .children()

Get the direct children of all of the elements with an optional filter:

```js
.children(filter: string)
```

#### Parameters

`filter`: A selector expression to match elements against

#### Returns

An instance of `react-test` with the new children as itst elements.

#### Usage

Since we return an instance of `react-test`, we have to use `.toArray()` to convert it to an array so that we can iterate through them.

```js
import $ from "react-test";

const List = () => (
  <ul>
    <li>A</li>
    <li>B</li>
  </ul>
);

// Find the text of each element
const text = $(<List />)
  .children()
  .toArray()
  .map((item) => $(item).text());

expect(text).toEqual(["A", "B"]);
```
