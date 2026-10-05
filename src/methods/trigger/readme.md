### .trigger()

```js
.trigger(name, extra?) -> Promise
```

Simulates an event happening on all the matched elements. It should be awaited for the side effects to run and the component to re-rendered:

```js
it("can simulate clicking a div in a specific place", async () => {
  const fn = jest.fn();
  const canvas = $(<canvas onClick={fn}></canvas>);
  await canvas.trigger("click", { clientX: 10, clientY: 20 });
  const event = fn.mock.calls[0][0];
  expect(event).toMatchObject({ clientX: 10, clientY: 20 });
});
```

The event is a real DOM event, so it reaches React like it would in a browser: `stopPropagation()`, capture handlers and `window` or `document` listeners all work, and the promise also waits for async handlers to finish. As in a browser, `e.target` is the live element and React clears `e.currentTarget` once the handler returns, so read those inside the handler instead of from a stored event.

#### Parameters

- `name`: the event name without the `on`, like `"click"`, `"keydown"`, `"mouseenter"` or `"pointermove"`.
- `extra = {}`: properties for the event, like `clientX` and `clientY` or `key`. A `target` can be another element or `window` to dispatch the event there, or a plain object like `{ value: "hello" }` whose fields are set on the element before the event.

#### Returns

A promise that must be awaited before doing any assertion.

#### Examples

You can test `window.addEventListerner()` the same way, since events bubble up to the global window by default:

```js
const Demo = ({ onDown }) => {
  useEffect(() => {
    window.addEventListener("keydown", onDown);
    return () => window.removeEventListener("keydown", onDown);
  }, [onDown]);
  return <div>Hello</div>;
};

it("can trigger clicks even from the window", async () => {
  const onDown = jest.fn();
  const demo = $(<Demo onDown={onDown} />);
  expect(onDown).not.toBeCalled();

  await demo.trigger("keydown", { key: "x" });
  expect(onDown).toBeCalled();

  const event = onDown.mock.calls[0][0];
  expect(event.key).toBe("x");
});
```

But you might want to customize the event more to make it more realistic, like changing the `target` manually (same `Demo` as above):

```js
it("can customize the target to window", async () => {
  const onDown = jest.fn();
  const demo = $(<Demo onDown={onDown} />);
  expect(onDown).not.toBeCalled();

  await demo.trigger("keydown", { key: "x", target: window });
  expect(onDown).toBeCalled();

  const event = onDown.mock.calls[0][0];
  expect(event.key).toBe("x");
  expect(event.target).toBe(window);
});
```
