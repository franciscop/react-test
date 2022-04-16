### .filter()

Return all of the given nodes that match the provided selector

```js
.filter(selector);
```

#### Parameters

`selector`: a string containing a selector that nodes must match.

#### Return

An instance of React Test with only the matching nodes.

#### Examples

Filter to select list items with child links from the contact page:

```js
$(<ContactPage />)
  .find("a")
  .parent()
  .filter("li");
```
