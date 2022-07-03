### .not()

```js
.not(selector) -> $
```

Remove the matched nodes from the collection. It's the opposite of [`.filter()`](#filter):

```js
it("can get just the users", () => {
  const list = $(
    <ul>
      <li className="user">John</li>
      <li className="group">Ibiza</li>
      <li className="user">Sarah</li>
    </ul>
  );
  const people = list.children().not(".group");
  expect(people.array((node) => node.textContent)).toEqual(["John", "Sarah"]);
});
```

#### Parameters

`selector`: any one of these:

- a string containing the CSS selector that nodes must **not** match
- a ReactTest instance containing a number of nodes. All the matched nodes must **not** be in the ReactTest instance nodes

> A callback is not allowed, instead use `.filter(node => true|false)` and negate the condition for better testing clarity.

#### Return

An instance of React Test with only the nodes that did not match the selector.

#### Examples

Get a list of non-important items:

```js
it("can get all non-important list items", () => {
  const List = () => (
    <ul>
      <li>A</li>
      <li className="important">B</li>
      <li>C</li>
    </ul>
  );

  // Find the text of each element
  const text = $(<List />)
    .children()
    .not(".important")
    .array((item) => item.textContent);

  expect(text).toEqual(["A", "C"]);
});
```

Get all the rows except the headers (first row):

```js
it("can get all children except the first", () => {
  const Table = () => (
    <table>
      <tbody>
        <tr>
          <th>Col A</th>
          <th>Col B</th>
        </tr>
        <tr>
          <td>A1</td>
          <td>B1</td>
        </tr>
        <tr>
          <td>A2</td>
          <td>B2</td>
        </tr>
      </tbody>
    </table>
  );

  // Find the text of each element
  const text = $(<Table />)
    .find("tr")
    .not(":first-child")
    .array((item) => item.textContent);

  expect(text).toEqual(["A1B1", "A2B2"]);
});
```

#### Related

- [`.filter(selector)`](#filter): a method that returns a new collection only with nodes that pass the matcher.
- [`.is(selector)`](#is): a method to determine whether all of the nodes match the selector.
