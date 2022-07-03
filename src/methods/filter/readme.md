### .filter()

```js
.filter(selector) -> $
```

Keep only the nodes that match the selector, removing the others:

```js
it("can get just the users", () => {
  const list = $(
    <ul>
      <li className="user">John</li>
      <li className="group">Ibiza</li>
      <li className="user">Sarah</li>
    </ul>
  );
  const people = list.children().filter(".user");
  expect(people.array((node) => node.textContent)).toEqual(["John", "Sarah"]);
});
```

#### Parameters

`selector`: any one of these:

- a string containing the CSS selector that nodes must match
- a ReactTest instance containing a number of nodes. All the matched nodes must be in the ReactTest instance nodes
- a callback that will keep the element if it returns `true`. It receives:
  - `node`: the current node being iterated on.
  - `index`: the index of the current node in the matched list.
  - `list`: an array with all of the nodes that are being iterated over.

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

#### Related

- [`.not(selector)`](#filter): a method that returns a new collection only with nodes that pass the matcher.
