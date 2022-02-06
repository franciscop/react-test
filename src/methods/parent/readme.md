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
const $list = $(
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

const parents = $list.find('a').parent();
expect(parents.nodes).toHaveLength(2);
```
