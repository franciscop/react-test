### .toHaveValue()

- Checks whether the element has the given value.
- Only works for input, textarea, and select tags.
- For input types of checkbox and radio, please use .checked instead.

Checks whether the form element has the given value:

```js
const $input = $(<input type="text" value="textValue" onChange={} />);
expect($input).toHaveValue('textValue');
```

Checks defaultValue if set on element:

```js
const $input = $(<input type="text" defaultValue="initial text" />);
const $textarea = $(<textarea defaultValue="initial textarea" />);

expect($input).toHaveValue("initial text");
expect($textarea).toHaveValue("initial textarea");
```

It only works on the input, textarea, and select tags:

```js
const $textInput = $(<input type="text" value="text" onChange={} />);
const $numberInput = $(<input type="number" value="10" onChange={} />);
const $textarea = $(<textarea value="text description" onChange={} />);
const $select = $(
  <select value="second" onChange={}>
    <option value="first">first</option>
    <option value="second">second</option>
    <option value="third">third</option>
  </select>
);

// POSITIVE ASSERTIONS
expect($textInput).toHaveValue('text');
expect($numberInput).toHaveValue(10);
expect($textarea).toHaveValue('text description');
expect($select).toHaveValue('second');

// NEGATIVE ASSERTIONS
expect($textInput).not.toHaveValue(10);
expect($numberInput).not.toHaveValue('text');
expect($textarea).not.toHaveValue('random');
expect($select).not.toHaveValue('first');
```

Please use `.checked` for inputs of type checkbox and radio:

```js
const $checkbox = $(<input type="checkbox" checked readOnly />);
const $radio = $(<input type="radio" value="something" checked readOnly />);

// ERROR: Cannot check .toHaveValue() for input type="checkbox" or type="radio".
expect($checkbox).toHaveValue("check");
expect($radio).toHaveValue("radio");
```

Element that don't contain the value attribute will throw errors:

```js
const $button = $(<button>click</button>);
const $link = $(<a href="hello.com">click</a>);

// ERROR: 'Not a valid element that has a value attribute. Please insert an element that has a value.'
expect($button).toHaveValue("button");
expect($link).toHaveValue("link");
```
