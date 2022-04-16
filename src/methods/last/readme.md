### .last()

Retrieve the last of the matched nodes

```js
.last();
```

```js
const $list = $(
  <ul>
    <li>Bananas</li>
    <li>Oranges</li>
  </ul>
);

const item = $list.find("li").last();
expect(item.textContent).toBe("Oranges");
```

#### Parameters

This method doesn't accept any parameters

#### Return

The last html node or `null` if there is none.

#### Examples

Retrieve the last element of a list:

```js
const $list = $(
  <ul>
    <li>Bananas</li>
    <li>Oranges</li>
  </ul>
);

const item = $list.find("li").first();
expect(item.textContent).toBe("Oranges");
```

#### Related

[.first()](#first) retrieve the last matched element
