### .html()

```js
.html() -> String
```

Retrieve the OuterHTML of the first element matched:

```js
it("can extract the plain html", () => {
  const card = $(<div className="card">Hello</div>);
  expect(card.html()).toBe(`<div class="card">Hello</div>`);
});
```

#### Parameters

None

#### Return

A String with the HTML of the first element.
