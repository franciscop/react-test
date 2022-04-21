### \<Signup /\>

We are going to see now how we can simulate interactions with a form. This goes from the basics of typing text, validating the output, to more advanced features like validating _as we type_. We are going to use the library [`form-mate`](https://form-mate.dev/) to greatly simplify our code, our base form is this:

```js
export default function Signup({ onSubmit = () => {} }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formToObject(e.target));
      }}
    >
      <input name="username" type="text" />
      <input name="tos" type="checkbox" />
      <input name="option" type="radio" value="a" defaultChecked />
      <input name="option" type="radio" value="b" />
      <button>Send</button>
    </form>
  );
}
```

All of our tests must be wrapped by `describe()` and need to import at least `React`, `react-test` and the component that we want to test:

```js
// Signup.test.js
import React from "react";
import $ from "react-test";
import Signup from "./Signup";

describe("Signup.js", () => {
  // Write your tests here
  // All of the examples below should go here
});
```

First let's check what happens if the user presses the submit button without changing anything:

```js
it("can be submitted empty", async () => {
  const cb = jest.fn();
  const form = $(<Signup onSubmit={cb} />);

  expect(cb).not.toBeCalled();
  await form.submit();
  expect(cb).toBeCalledWith({ username: "", option: "a" });
});
```

Perfect, we define a callback with Jest to mock the onSubmit action, and we see that the data is parsed correctly and submitted as an empty username and the option "a" which is selected by default.

Now let's simulate that the user modifies the form, we use `.type()` for the text fields and just `.click()` for the `checkbox` and `radio`:

```js
it("can modify each of the fields properly", async () => {
  const cb = jest.fn();
  const form = $(<Signup onSubmit={cb} />);

  await form.find('[type="text"]').type("hello");
  await form.find('[type="checkbox"]').click();
  await form.find('[type="radio"][value="b"]').click();
  await form.submit();
  expect(cb).toBeCalledWith({ username: "hello", tos: "on", option: "b" });
});
```
