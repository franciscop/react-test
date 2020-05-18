### .toHaveHtml()

Checks whether the selected elements have HTML

```js
const $div = $(
  <div>
    <span>I am a span</span>
  </div>
);

expect($div).toHaveHtml('<span>I am a span</span>');
```

Checks whether the selected elements **do not** have HTML

```js
const $div = $(
  <div>
    <span>I am a span</span>
  </div>
);

expect($div).not.toHaveHtml('<li>I am a list item</li>');
```

Validates parent element HTML

```js
const $div = $(
  <div>
    <span>I am a span</span>
  </div>
);

expect($div).toHaveHtml('<div>');
```

Validates across different depth levels of inner HTML

```js
const $div = $(
  <div>
    <span>I am a span</span>
  </div>
);

expect($div).toHaveHtml('<span>');
expect($div).toHaveHtml('<span>I am a span</span>');
```

Throws error for invalid HTML

```js
const $div = $(
  <div>
    <span>I am a span</span>
  </div>
);

// THROWS ERROR -> Invalid HTML. Please input valid HTML.
expect($div).toHaveHtml('<spa');
expect($div).toHaveHtml('plain text');
expect($div).toHaveHtml('<random>'); // random is not an official HTML tag
```

For a list of elements, checks if **all** the elements have HTML

```js
const $body = $(
  <body>
    <div>
      <span>span text</span>
    </div>
    <div>
      <span>span text</span>
    </div>
  </body>
);

// PASS
expect($body.find('div')).toHaveHtml('<span>');
expect($body.find('div')).toHaveHtml('<span>span text</span>');

// DO NOT PASS
expect($body.find('div')).toHaveHtml('<li>');
expect($body.find('div')).toHaveHtml('<p>');
```

For a list of elements, checks if **any** of the elements **do not** have HTML

```js
const $body = $(
  <body>
    <div>
      <span>span</span>
    </div>
    <div>
      <p>paragraph</p>
    </div>
  </body>
);

// PASS
expect($body.find('div')).not.toHaveHtml('<h1>');
expect($body.find('div')).not.toHaveHtml('<li>');
expect($body.find('div')).not.toHaveHtml('<span>random text</span>');

// DO NOT PASS
expect($body.find('div')).not.toHaveHtml('<span>');
expect($body.find('div')).not.toHaveHtml('<p>');
expect($body.find('div')).not.toHaveHtml('<p>paragraph</p>');
```
