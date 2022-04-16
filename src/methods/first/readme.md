### .first()

Retrieve the first of the matched nodes:

```js
.first();
```

```js
const $list = $(
  <ul>
    <li>Bananas</li>
    <li>Oranges</li>
  </ul>
);

const item = $list.find("li").first();
expect(item.textContent).toBe("Bananas");
```

#### Parameters

This method doesn't accept any parameters

#### Return

The first html node or `null` if there is none.

#### Examples

Retrieve the first element of a list:

```js
const $list = $(
  <ul>
    <li>Bananas</li>
    <li>Oranges</li>
  </ul>
);

const item = $list.find("li").first();
expect(item.textContent).toBe("Bananas");
```

#### Related

[.last()](#last) retrieve the last matched element
