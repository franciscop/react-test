### .siblings()

```js
.siblings(selector?) -> $
```

Return a new collection with the direct parent of the current nodes with an optional filter:

```js
const list = $(<List />);
const items = list.find("li.active").siblings();
expect(items.array("className")).toEqual(["", ""]);
```

#### Parameters

`selector`: a string containing a selector that nodes must pass or a function that return a boolean. See [.filter()](#filter) for a complete explanation of how selectors work.

#### Return

An instance of React Test with the new siblings as nodes

#### Examples

Find all the items in the list that are not active:

```js
const list = $(<List />);
const items = list.find("li.active").siblings();
expect(items.array("className")).toEqual(["", ""]);
```
