### .toHaveError()

Check whether a React component threw an error during rendering:

```js
function Broken() {
  throw new Error("something went wrong");
}

const $comp = $(<Broken />);

expect($comp).toHaveError();
```

Pass a string to check the exact error message, or a regex to match against it:

```js
expect($comp).toHaveError("something went wrong");
expect($comp).toHaveError(/went wrong/);
expect($comp).toHaveError(/^something/);
```

Use `.not` to assert no error was thrown, or that the error doesn't match a given string or regex:

```js
function Fine() {
  return <div>Hello</div>;
}

expect($(<Fine />)).not.toHaveError();
expect($comp).not.toHaveError("a different message");
expect($comp).not.toHaveError(/different/);
```
