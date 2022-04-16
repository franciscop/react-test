### .submit()

```js
.submit() -> promise
```

Simulates a form submission on all the matched forms. It should be awaited for the side effects to run and the component to re-rendered (if needed). For example, let's say that you have this form component:

```js
const CreateUser = ({ onSubmit }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault(); // <- this is required _when testing_
      onSubmit();
    }}
  >
    <input name="firstname" />
    <input name="lastname" />
    <input name="age" />
    <button>Submit</button>
  </form>
);
```

Then you can test that the form is properly submitted like this:

```js
it("can mock submitting a form", async () => {
  const onSubmit = jest.fn();
  const createUser = $(<CreateUser onSubmit={onSubmit} />);
  expect(onSubmit).not.toBeCalled();
  await createUser.submit();
  expect(onSubmit).toBeCalled();
});
```

> `.submit()` already wraps the call with act(), so there's no need for you to also wrap it. Just make sure to await for it.

> `onSubmit` should always call `e.preventDefault()`, since the browser behavior has not been imitated by this library.

#### Parameters

None. Any parameters passed will be ignored.

#### Returns

A promise that must be awaited before doing any assertion.

#### Examples

We can also test the submission by e.g. clicking on a button on a child node:

```js
const CreateUser = ({ onSubmit }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault(); // <- this is required _when testing_
      onSubmit();
    }}
  >
    <input name="firstname" />
    <input name="lastname" />
    <input name="age" />
    <button>Submit</button>
  </form>
);

it("submits the form when clicking the button", async () => {
  const onSubmit = jest.fn();
  const createUser = $(<CreateUser onSubmit={onSubmit} />);
  expect(onSubmit).not.toBeCalled();
  await createUser.find("button").click();
  expect(onSubmit).toBeCalled();
});
```

#### Notes

It is internally wrapping the call with [`act()`](#act), so there's no need for you to also wrap it. Just make sure to `await` for it.
