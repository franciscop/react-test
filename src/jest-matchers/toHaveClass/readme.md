### .toHaveClass()

Check whether all of the matched elements have the expected class name:

```js
const $button = $(<button className="primary">Click me</button>);

expect($button).toHaveClass("primary");
expect($button).not.toHaveClass("secondary");
```

For list of items, it checks whether **all of them match** or **none of them match**:

```js
const $list = $(
  <ul>
    <li className="item main">a</li>
    <li className="item secondary">b</li>
  </ul>
);

// All of them have the class item
expect($list.find("li")).toHaveClass("item");

// None of them has the class "primary"
expect($list.find("li")).not.toHaveClass("primary");
```

For the same React code, these **do not pass**:

```js
// ERROR! Only one of them has the class "main"
expect($list.find("li")).toHaveClass("main");
// Expected <li class="item secondary"> to include class "main"

// ERROR! At least one of them has the class "main"
expect($list.find("li")).not.toHaveClass("main");
// Expected <li class="item main"> not to include class "main"
```
