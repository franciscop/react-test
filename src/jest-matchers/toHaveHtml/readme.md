### .toHaveHtml()

Checks whether the selected elements have the passed HTML

```js
const $div = $(
  <div>
    <span>I am a span</span>
  </div>
);

expect($div).toHaveHtml('<span>I am a span</span>');
```

Checks whether the selected elements **do not** have the passed HTML

```js
const $div = $(
  <div>
    <span>I am a span</span>
  </div>
);

expect($div).not.toHaveHtml('<li>I am a list item</li>');
```

Trims the passed HTML to check for

```js
const $div = $(
  <div>
    <span>I am a span</span>
  </div>
);

expect($div).toHaveHtml('<span>I am a span</span>     ');
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

Validates all substrings of inner HTML

```js
const $div = $(
  <div>
    <span>I am a span</span>
  </div>
);

expect($div).toHaveHtml('span');
expect($div).toHaveHtml('spa');
expect($div).toHaveHtml('<spa');
```

For a list of elements, checks if **all** the elements have the HTML

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
expect($body.find('div')).toHaveHtml('span text');

// DO NOT PASS
expect($body.find('div')).toHaveHtml('<li>');
expect($body.find('div')).toHaveHtml('span t3xt');
```

For a list of elements, checks if **any** of the elements **do not** have the HTML

```js
const $body = $(
  <body>
    <div>
      <span>span</span>
    </div>
    <div>
      <p>list item</p>
    </div>
  </body>
);

// PASS
expect($body.find('div')).not.toHaveHtml('<span$');
expect($body.find('div')).not.toHaveHtml('<li>');

// DO NOT PASS
expect($body.find('div')).not.toHaveHtml('span');
expect($body.find('div')).not.toHaveHtml('p'); // second div has a p tag
```
