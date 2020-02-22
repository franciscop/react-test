## Jest Matchers

These are helpers for that are automatically available if you are using [**jest**](https://jestjs.io/):

```js
const $button = $(<button className="primary">Click me!</button>);

expect($button).toMatchSelector('button');
expect($button).toHaveClass('primary');
expect($button).toHaveText('Click me!');
```

This will give much more meaningful errors when failing compared to doing things manually:

```js
// With the Jest Helpers:
expect($button).toHaveClass('secondary');
// Expected <button class="primary"> to include class "secondary"

// Without the helpers:
expect($button.attr('class')).toBe('secondary');
// Expected "primary" to be "secondary"
```
