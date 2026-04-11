### .toHaveValue()

Check whether a form element (`<input>`, `<textarea>`, or `<select>`) has the expected value. Only works on a **single element** at a time.

```js
const $text = $(<input type="text" value="hello" readOnly />);
const $number = $(<input type="number" value="42" readOnly />);
const $textarea = $(<textarea value="some text" readOnly />);

expect($text).toHaveValue("hello");
expect($number).toHaveValue(42); // number inputs are compared as numbers
expect($textarea).toHaveValue("some text");
```

Works with `defaultValue` too:

```js
const $input = $(<input type="text" defaultValue="initial" />);
const $textarea = $(<textarea defaultValue="initial textarea" />);

expect($input).toHaveValue("initial");
expect($textarea).toHaveValue("initial textarea");
```

For `<select>`, calling `.toHaveValue()` without an argument checks that any option is selected. Pass a string to match the selected option's value:

```js
const $select = $(
  <select defaultValue="second">
    <option value="first">First</option>
    <option value="second">Second</option>
    <option value="third">Third</option>
  </select>,
);

expect($select).toHaveValue(); // any option is selected
expect($select).toHaveValue("second"); // "second" is selected
```

Negative assertions work as expected:

```js
expect($text).not.toHaveValue("world");
expect($number).not.toHaveValue(0);
expect($select).not.toHaveValue("first");
expect(<select />).not.toHaveValue(); // no option selected
```

`.toHaveValue()` does not support `input[type="checkbox"]` or `input[type="radio"]` — use `.toHaveAttribute("checked")` for those. It also does not work on non-form elements like `<button>` or `<a>`, and will throw if passed multiple elements.
