### until()

This is a very useful function. It's really flexible on what it does, the basics is that it keeps waiting until some condition is met. For example, let's say that you have a timer that changes its class to `active` after 3s:

```js
import $, { until } from "react-test";

const timer = $(<Timer />);

expect(timer).not.toHaveClass("active");
await until(() => timer.is(".active")); // Wait until it becomes active
expect(timer).toHaveClass("active");
```

#### Parameters

`checker`: it receives either a callback or a component and only resolves when:

- Receiving a callback, that callback returns `true` or a `truthy` value.
- Receiving a component, we call data methods like `.is('.active')` that will resolve when it's "true".
- Receiving a component, we can execute actions like `.find('.active')` and it'll be truthy when it finds at least 1 node that matches the query.

#### Returns

It returns a composite response that behaves both as a React Instance **and** as a Promise. So it can be awaited straight away, concatenated until you use a ["data" method](#methods) which will behave as a promise or transversing the DOM in which case it'll resolve when it's not empty:

```js
// Plain callback, resolves when it returns truthy
await until(() => button.text() === "Hello!");

// Wait until it has the class "active"
await until(button).is(".active");

// Wait until the collection returns a non-empty list
await until(list).find("li");
```

#### Examples

```js
// Keep pinging until the callback returns a truthy value
await until(() => timer.is(".active"));

// DATA methods, when one becomes "true" (or non-empty) it finishes executing
await until(timer).is(".active"); // Same, finish when timer gets the class
await until(timer).text(); // When the timer returns any text, finish

// DOM MANIPULATION methods; when it returns a non-empty collection it finishes
await until(timer).filter(".active"); // Same, finish when timer gets the class
await until(timer).children("li"); // Finishes when the first <li> is appended

// DOM MANIPULATION + chaining with DATA methods
// Finish when the container becomes active
await until(timer).find(".container").is(".active");
// Any child becomes active
await until(timer).children().is(".active");

// DOM MANIPULATION + chaining with other DOM MANIPULATION methods:
// Finishes when finding an active link
await until(timer).find("a").filter(".active");
// Finishes when one important child becomes active
await until(timer).children().filter(".important.active");
```

When there is a "DOM Manipulation" method, it'll finish executing when it returns a non-zero collection of items.

When it's reading data, it'll finish executing when it returns truthy.
