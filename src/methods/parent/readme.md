### .parent()

Get the direct parent of all of the elements with an optional selector:

```js
.parent(selector: string)
```

#### Parameters

`selector`: A selector expression to match elements against parents

#### Returns

An instance of `react-test` with the new parents as itst elements.

#### Usage

Since we return an instance of `react-test`, in case that we are having too generic selector like `li`
return will contains list of parents for each `li`

```js
import $ from "react-test";

const List = () => (
  <ul>
    <li>A</li>
    <li>B</li>
  </ul>
);

// Find the text of each element
const parentNode = $(<List />)
  .parent("li")
  .first().nodeName;

expect(parentNode).toEqual(["UL"]);
```
