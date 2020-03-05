### .data()

Reads the data-attribute value for the matched element.

```js
.data(name);
```

#### Parameters

`name`: the data-\* attribute that we want to get from the first matched element.

#### Return

A string containing the value stored in the targeted data-\* attribute.

#### Examples

Find the value of the attribute `data-id`:

```js
const Hello = () => <div data-id="0">Hello World!</div>;
```

```js
$(<Hello />)
  .first()
  .data("id"); //0
```
