### .toHaveStyle()

Check whether all of the matched elements have the expected styles applied:

```js
const $button = $(<button></button>);
// Check for presence of styles using style object as an argument
expect($button).toHaveStyle({ backgroundColor: "red", textAlign: "center" });
expect($button).toHaveStyle({ textAlign: "center" });

// Check for presence of styles using style string as an argument
expect($button).toHaveStyle("background-color: red; text-align: center;");
expect($button).toHaveStyle("text-align: center;");

// Check for absence of particular styles
expect($button).not.toHaveStyle("display: none;");
expect($button).not.toHaveStyle({ display: "none" });
```

```js
const $list = $(
  <ul>
    <li style={{ ...styleObj, color: "red" }}></li>
    <li style={{ ...styleObj, color: "red" }}></li>
  </ul>
);

// All of the elements have the searched for styles
expect($list.find("li")).toHaveStyle({ color: "red" });
expect($list.find("li")).toHaveStyle("color: red");

// None of the elements have the searched for styles
expect($list.find("li")).not.toHaveStyle({ color: "green" });
expect($list.find("li")).not.toHaveStyle("color: green");
```
