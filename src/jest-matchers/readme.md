## Jest Matchers

These helpers are automatically available if you are using [**jest**](https://jestjs.io/):

```js
const $button = $(<button className="primary">Click me!</button>);

expect($button).toMatchSelector("button");
expect($button).toHaveClass("primary");
expect($button).toHaveText("Click me!");
```

This will give much more meaningful errors when failing compared to doing things manually:

```js
// With the Jest Helpers:
expect($button).toHaveClass("secondary");
// Expected <button class="primary"> to include class "secondary"

// Without the helpers:
expect($button.attr("class")).toBe("secondary");
// Expected "primary" to be "secondary"
```

These `expect()` matchers work with either a single element or multiple elements, but it's important that you understand the differences in behavior.

When there's a single element in the expect(), then the `.not` Jest negation makes them a perfect opposite:

```js
// Make sure the button has the class "primary"
expect($button).toHaveClass("primary");

// Make sure the button does NOT have the class "secondary"
expect($button).not.toHaveClass("secondary");
```

However when there are **multiple** elements in the `expect()`, the test follows the English meaning instead of plainly negating the affirmative statement:

```js
// All of them have this class
expect($list.find("li")).toHaveClass("item");

// NONE of the items have the given class
expect($list.find("li")).not.toHaveClass("hidden");
```

React Test makes Jest's `not` behave as "NONE" instead of ~not all~, since we found most of the times this is the desired behavior.
