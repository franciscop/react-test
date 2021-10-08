### .type()

```js
.type(value) -> promise
```

Simulates changing the text on all the matched elements. It should be awaited for the side effects to run and the component to re-rendered:

```js
const $input = $(<Input />);
expect($input).toHaveValue("");
await $input.type("Francisco");
expect($input).toHaveValue("Francisco");
```

> `.type()` already wraps the call with act(), so there's no need for you to also wrap it. Just make sure to await for it.

#### Parameters

- `value`: the new value to be sent to the callback as part of the event.

#### Returns

A promise that must be awaited before doing any assertion.

#### Examples

A simple controlled input:

```js
const Input = () => {
  const [text, setText] = useState("");
  return <input value={text} onChange={e => setText(e.target.value)} />;
};

const $input = $(<Input />);
expect($input).toHaveValue("");
await $input.type("Francisco");
expect($input).toHaveValue("Francisco");
```

A full component greeting whoever it's there:

```js
const Greeter = () => {
  const [name, setName] = useState("");
  return (
    <div>
      Hello {name || "Anonymous"}
      <input value={name} onChange={e => setName(e.target.value)} />
    </div>
  );
};

it("clicks the current element", async () => {
  const $greet = $(<Greeter />);
  expect($greet.text()).toBe("Hello Anonymous");
  await $greet.find("input").type("Francisco");
  expect($greet.text()).toBe("Hello Francisco");
});
```

#### Notes

It is internally wrapping the call with [`act()`](#act), so there's no need for you to also wrap it. Just make sure to `await` for it.

It doesn't work with uncontrolled inputs (yet!).
