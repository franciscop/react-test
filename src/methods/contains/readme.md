### .contains()

```js
.contains(text) -> $
```

Keep only the nodes whose text contains the given text:

```js
it("can start the game", async () => {
  const $app = $(<App />);
  await $app.find("button").contains("Start").click();
  expect($app).toHaveText("Playing");
});
```

The text is read like [`.text()`](#text) does: it includes nested elements and collapses whitespace, so `.contains("Save changes")` matches `<button><b>Save</b> changes</button>`.

#### Parameters

`text`: either of these:

- a string that the node text must include
- a regex that the node text must match. Use it for exact matches, like `/^Include$/`, or to ignore the case, like `/start/i`

#### Return

An instance of React Test with only the matching nodes.

#### Examples

Pick the exact button, since "Exclude" also contains "clude":

```js
const $include = $app.find("button").contains(/^Include$/);
await $include.click();
```

Wait until some text appears, since [`until()`](#until) keeps waiting while the selection is empty:

```js
await until($app).contains("Loaded");
```

Every node whose text includes the given text is kept, including the parents of the element that holds it. Use a selector to pick the right level:

```js
$app.find("*").contains("Start"); // The button and every element around it
$app.find("button").contains("Start"); // Only the button
```

#### Related

- [`.filter(selector)`](#filter): keep only the nodes that match a selector or a callback.
- [`.text()`](#text): read the text of the first node.
