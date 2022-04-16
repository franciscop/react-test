### .toMatchSelector()

Checks whether the matched elements **match** the selector

```js
const $button = $(
  <button id="the-button" className="a-button">
    click
  </button>
);

expect($button).toMatchSelector("#the-button");
expect($button).toMatchSelector(".a-button");
```

Checks whether the matched elements **do not match** the selector

```js
const $button = $(
  <button id="the-button" className="a-button">
    click
  </button>
);

expect($button).not.toMatchSelector("#hello");
expect($button).not.toMatchSelector(".world");
```

For a list of items, it checks if **all** the elements match the provided selector

```js
const $list = $(
  <ul>
    <li id="first-list-item" className="list-item">
      apple
    </li>
    <li className="list-item">apple</li>
  </ul>
);

// PASS
expect($list.find("li")).toMatchSelector("li");
expect($list.find("li")).toMatchSelector(".list-item");

// DO NOT PASS
expect($list.find("li")).toMatchSelector(".item");
expect($list.find("li")).toMatchSelector("#first-list-item");
```

For a list of items, it checks if **any** of the elements **do not** match the provided selector

```js
const $list = $(
  <ul>
    <li id="first-list-item" className="list-item">
      apple
    </li>
    <li className="list-item">apple</li>
  </ul>
);

// PASS
expect($list.find("li")).not.toMatchSelector("div");
expect($list.find("li")).not.toMatchSelector(".hello");
expect($list.find("li")).not.toMatchSelector("#first-list-item");

// DO NOT PASS
expect($list.find("li")).not.toMatchSelector("li");
expect($list.find("li")).not.toMatchSelector(".list-item");
```
