### .get()

```js
.get(index) -> NodeElement
```

Get a native DOM Node given its index. Defaults to the first element:

```js
const list = $(
  <ul>
    <li>A</li>
    <li>B</li>
    <li>C</li>
    <li>D</li>
  </ul>,
);
expect(list.find("li").get()).toHaveText("A");
expect(list.find("li").get(1)).toHaveText("B");
expect(list.find("li").get(-1)).toHaveText("D");
```

#### Parameters

`index`: the index of the element to get. It defaults to `0`, and you can also set a negative indexes. Any overflowing index will be wrapped around. If there's only a single top-level element, that will be returned.

#### Return

A single NodeElement representing the content that was matched by the index.

#### Notes

This is very useful if you want to use the browser DOM API for testing different properties, like:

- `<input type="checkbox" />` can be tested with `expect(input.get().checked).toBe(true);`
- `<input required ... />` can be tested with `expect(input.get().valid).toBe(true);`
- Type of HTML element can be tested with `expect(component.get().nodeName).toBe("FORM")`
- etc.

Basically any time that you are would like to fall back to the native DOM API for testing, you can use `.get().`.

> Treat the ReactTest instance => Node as a one way operation. When you want to keep chaining on a single element, use [`.eq(index)`](#eq) instead, which returns a React Test instance rather than a Node.

#### Examples

Get the form element to make assertions with FormData:

```js
const form = $(<SignupForm />);
const data = new FormData(form.get());
expect(data.get("firstname")).toBe("");
```

Return a nested element of a list:

```js
const list = $(
  <ul>
    <li>A</li>
    <li>B</li>
  </ul>,
);
const first = list.get(0);
expect(first.textContent).toBe("A");
```

#### Related

- [`.eq(index)`](#eq): the same selection by index, but keeping the node wrapped so it can be chained.
- [`.array()`](#array): get ALL of the current nodes as a plain array.
