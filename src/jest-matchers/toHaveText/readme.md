### .toHaveText()

Check whether the matched elements all contain the text ([see the Counter example](#counter)):

```js
it("can be clicked", async () => {
  const $counter = <Counter />;
  expect($counter).toHaveText("0");
  await $counter.click();
  expect($counter).toHaveText("1");
});
```

It normalizes whitespace so that multiple spaces or enters are collapsed into a single one:

```js
it("normalizes whitespace", () => {
  const $text = $(
    <div>
      Hello <br /> world!
    </div>
  );
  expect($text).toHaveText("Hello world!");
});
```

For list of items, it checks whether **all of them match** or **none of them match**:

```js
const $list = $(
  <ul>
    <li>apple</li>
    <li>apple</li>
  </ul>
);
// Passes; all of them have the given text
expect($list.find("li")).toHaveText("apple");

// Passes; none of them has the given text
expect($list.find("li")).not.toHaveText("banana");
```

These examples **do not pass**:

```js
const $list = $(
  <ul>
    <li>apple</li>
    <li>banana</li>
  </ul>
);

// ERROR! Because only one of them has the text "apple"
expect($list.find("li")).toHaveText("apple");
// Expected <li> to have text "apple" but it received "banana"

// ERROR! Because at least one of them has the text "apple"
expect($list.find("li")).not.toHaveText("apple");
// Expected <li> not to have the text "apple"
```
