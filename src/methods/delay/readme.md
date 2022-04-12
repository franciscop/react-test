### .delay()

Makes the component to wait for a determined period of time for async actions to happen. It will be called wrapped in "act()" inside.

```js
.delay(time);  // milliseconds
```

#### Parameters

`time`: the amount of time the component will wait in milliseconds.

#### Return

A plain promise that needs to be awaited.

#### Examples

A component that changes after 1 second:

```js
const Updater = () => {
  const [text, setText] = useState('initial');
  useEffect(() => {
    setTimeout(() => setText('updated'), 1000);
  }, []);
  return <div>{text}</div>
};
```

For testing, we check the initial value and the value after 2 seconds:

```js
const updater = $(<Updater />);
expect(updater.text()).toBe('initial');
await updater.delay(2000);
expect(updater.text()).toBe('updated');
```
