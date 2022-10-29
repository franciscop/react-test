### .find()

```js
.find(selector) -> $
```

Get all of the descendants of the nodes with an optional filter

#### Parameters

`selector`: a string containing a selector that nodes must pass or a function that return a boolean. See [.filter()](#filter) for a complete explanation of how selectors work.

#### Return

An instance of React Test with the new children as nodes

#### Examples

Find all the links in the contact page:

```js
$(<ContactPage />).find("a");
```
