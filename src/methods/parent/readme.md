### .parent()

Return the parent node(s) of the given node(s)

```js
.parent();
```

#### Parameters

None.

#### Return

An instance of React Test with the parent node(s).

#### Examples

Find the parent node of all anchor tags:

```js
$(<ContactPage />)
  .find('a')
  .parent();
```
