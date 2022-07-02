### .parent()

```js
.parent() -> $
```

Return a new collection with the direct parent of the current nodes. It also removes duplicates:

```js
it("can go down and up again", () => {
  const list = $(
    <ul>
      <li>A</li>
      <li>B</li>
    </ul>
  );
  const items = list.children(); // <li>A</li>, <li>B</li>
  const listB = items.parent(); // <ul>...</ul>
  expect(listB.html()).toEqual(list.html());
});
```

#### Parameters

None.

> TODO? an optional filter?

#### Return

An instance of React Test with the parent node(s).

#### Examples

Find the parent node of all anchor tags:

```js
const list = $(
  <ul className="boo">
    <li className="bar">
      <a href="#" className="baz">
        Link 1
      </a>
    </li>
    <li className="foo">
      <a href="#" className="bar">
        Link 2
      </a>
    </li>
  </ul>
);

const parents = list.find("a").parent();
expect(parents.nodes).toHaveLength(2);
```
