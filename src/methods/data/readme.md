### .data()

```js
.data(name) -> String|null
```

Read the data-attribute value of the first node and return its value:

```js
it("can read the data attributes", () => {
  const card = $(
    <div data-id="25" data-selected>
      Card
    </div>
  );
  expect(card.data("id")).toBe("25");
  expect(card.data("selected")).toBe("true"); // T_T 🤷‍♂️ gh/facebook/react/24812
  expect(card.data("name")).toBe(null);
});
```

#### Parameters

`name`: the data-\* attribute that we want to get from the first matched element.

#### Return

A string containing the value stored in the targeted data-\* attribute.

#### Examples

Find the value of the attribute `data-id`:

```js
const hello = $(<div data-id="0">Hello World!</div>);
expext(hello.data("id")).toBe("0"); //0
```
