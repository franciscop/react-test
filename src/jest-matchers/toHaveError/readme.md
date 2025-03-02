### .toHaveError()

Check that the React component threw an error:

```js
function MyComponent() {
  throw new Error("hello world");
}

const $button = $(<MyComponent />);

expect($button).toHaveError();
expect($button).toHaveError("hello world");
expect($button).not.toHaveError("bye");
```
