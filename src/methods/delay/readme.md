### .delay()

```js
.delay(time) -> Promise
```

Makes the component to wait for the specified period of time in milliseconds:

```js
it("can wait for an async action", async () => {
  const down = $(<CountDown />);
  expect(down.text()).toBe("3");
  await down.delay(4000); // 4 seconds
  expect(down.text()).toBe("Done!");
});
```

> `.delay()` already wraps the call with act(), so there's no need for you to also wrap it.

#### Parameters

`time`: the amount of time the component will wait in milliseconds.

#### Return

A plain promise that needs to be awaited.

#### Examples

A component that changes after 1 second:

```js
const Updater = () => {
  const [text, setText] = useState("initial");
  useEffect(() => {
    setTimeout(() => setText("updated"), 1000);
  }, []);
  return <div>{text}</div>;
};
```

For testing, we check the initial value and the value after 2 seconds:

```js
const updater = $(<Updater />);
expect(updater.text()).toBe("initial");
await updater.delay(2000);
expect(updater.text()).toBe("updated");
```
