### .toHaveAttribute()

Check whether the matched elements all **contain the attribute && value**

```js
it('has attribute and value', () => {
  const $button = (
    <button type="submit" disabled>
      click
    </button>
  );

  expect($button).toHaveAttribute('type', 'submit');
  expect($button).toHaveAttribute('disabled');
});
```

It checks whether the matched elements **do not contain the attribute**

```js
it('does not have the attribute and value', () => {
  const $button = (
    <button type="submit" disabled>
      click
    </button>
  );

  expect($button).not.toHaveAttribute('onclick');
  expect($button).not.toHaveAttribute('type', 'reset');
});
```

It checks whether the matched elements **contain the attribute and the matched regex value**

```js
it('checks if attribute has given regex value', () => {
  const $button = (
    <button type="submit" disabled>
      click
    </button>
  );

  // Positive assertions: all the given regex values match
  expect($button).toHaveAttribute('type', /submit/);
  expect($button).toHaveAttribute('type', /su?b.+/);
  expect($button).toHaveAttribute('type', /.*/);

  // Negative assertions: all the given regex values do not match
  expect($button).not.toHaveAttribute('type', /sub/);
  expect($button).not.toHaveAttribute('type', /su?b/);
  expect($button).not.toHaveAttribute('type', /.*q/);
});
```

For a list of items, it checks whether **all have the same attribute && value or regex**

```js
const $list = $(
  <ul>
    <li value="1" title="list-item">
      apple
    </li>
    <li value="2" title="list-item">
      apple
    </li>
  </ul>
);

// Passes; all of them have the given attribute
expect($list.find('li')).toHaveAttribute('value');

// Passes; all of them have the given attribute && value
expect($list.find('li')).toHaveAttribute('title', 'list-item');

// Passes; all of them have the given attribute && value
expect($list.find('li')).toHaveAttribute('title', /list-item/);
expect($list.find('li')).toHaveAttribute('title', /^li.t-.*/);

// DO NOT PASS

// ERROR! Because none of the list elements have attribute id
expect($list.find('li')).toHaveAttribute('error');

// ERROR! Because only all the list item elements do not have an attribute apple
expect($list.find('li')).toHaveAttribute('id');

// ERROR! Because only one of the list item elements have a value of 1
expect($list.find('li')).toHaveAttribute('value', '1');

// ERROR! Because none one of the list item elements match the regex value
expect($list.find('li')).toHaveAttribute('title', /list/);
```

For a list of items, it checks whether **do not have the same attribute && value or regex**

```js
const $list = $(
  <ul>
    <li id="first" value="1" title="list-item">
      apple
    </li>
    <li value="2" title="list-item">
      apple
    </li>
  </ul>
);

// Passes; none of them have the given attribute
expect($list.find('li')).not.toHaveAttribute('error');

// Passes; not all of them have the given attribute && value
expect($list.find('li')).not.toHaveAttribute('value', '1');

// Passes; not all of them have the given attribute && match the regex value
expect($list.find('li')).not.toHaveAttribute('title', /list/);

// DO NOT PASS

// ERROR! Because both list item elements have attribute value
expect($list.find('li')).not.toHaveAttribute('value');

// ERROR! Because at least one list item element has attribute value that equals 1
expect($list.find('li')).not.toHaveAttribute('value', '1');

// ERROR! Because at least one list item element has attribute value that equals 1
expect($list.find('li')).not.toHaveAttribute('title', /^list-.*/);
```
