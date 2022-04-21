## Helpers

### until()

This is a very useful function. It's really flexible on what it does, the basics is that it keeps waiting until some condition is met. For example, let's say that you have a timer that changes its class to `active` after 2s:

```js
const timer = $(<Timer />);

expect(timer).not.toHaveClass("active");
await until(() => timer.is(".active")); // Wait until it becomes active
expect(timer).toHaveClass("active");
```

However it's very flexible. It is triggered and continues executing when:

- Receiving a callback, that callback returns `true` or a `truthy` value.
- Receiving a component, we can execute actions like `.is('.active')` afterwards.
- Receiving a component, we can execute actions like `.find('.active')` and it'll be truthy when it finds at least 1 that matches the query.

Some examples:

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
