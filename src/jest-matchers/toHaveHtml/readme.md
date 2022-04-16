### .toHaveHtml()

Checks whether the selected elements have HTML

```js
const $div = $(
  <div>
    <span>I am a span</span>
  </div>
);

expect($div).toHaveHtml("<span>I am a span</span>");
```

Checks whether the selected elements **do not** have HTML

```js
const $div = $(
  <div>
    <span>I am a span</span>
  </div>
);

expect($div).not.toHaveHtml("<li>I am a list item</li>");
```

Trims passed HTML

```js
const $div = $(
  <div>
    <span>I am a span</span>
  </div>
);

expect($div).toHaveHtml("<span>I am a span</span>        ");
```

Validates across different depth levels of inner HTML

```js
const $div = $(
  <div>
    <span>
      I am a <b>span</b>
    </span>
  </div>
);

expect($div).toHaveHtml("<div><span>I am a <b>span</b></span></div>");
expect($div).toHaveHtml("<span>I am a <b>span</b></span>");
expect($div).toHaveHtml("<b>span</b>");
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
expect($body.find("div")).toHaveHtml("<span>span text<span>");
expect($body.find("div")).toHaveHtml("span text");

// DO NOT PASS
expect($body.find("div")).toHaveHtml("<li>item</li>");
expect($body.find("div")).toHaveHtml("<p>text</p>");
```

For a list of elements, checks if **any** of the elements **do not** have HTML

```js
const $body = $(
  <body>
    <div>
      <span>text</span>
    </div>
    <div>
      <p>text</p>
    </div>
  </body>
);

// PASS
expect($body.find("div")).not.toHaveHtml("<h1>header</h1>");
expect($body.find("div")).not.toHaveHtml("<li>item</li>");
expect($body.find("div")).not.toHaveHtml("<span>random text</span>");

// DO NOT PASS
expect($body.find("div")).not.toHaveHtml("<span>text</span>");
expect($body.find("div")).not.toHaveHtml("<p>text</p>");
expect($body.find("div")).not.toHaveHtml("text");
```
