### .closest()

Find the first ancestor that matches the selector for each element:

```js
.closest(selector: string)
```

#### Parameters

`selector`: Expression to match elements against

#### Returns

An instance of `react-test` with the new elements as nodes

#### Usage

Since we return an instance of `react-test`, we have to use `.toArray()` to convert it to an array so that we can iterate through them.

```js
import $ from "react-test";

const List = () => (
  <ul>
    <li>
      <a>Hello</a>
    </li>
    <li>
      <a>World</a>
    </li>
  </ul>
);

const names = $(<List />)
  .find("a")
  .closest("li")
  .toArray()
  .map((node) => node.nodeName);

expect(names).toEqual(["LI", "LI"]);
```
