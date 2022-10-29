### .props()

```js
.props(newProps) -> $
```

Rerender the component with the new props specified as a plain object:

```js
const Demo = (props) => <div {...props}>world</div>;

it("can force-update the props on the root", () => {
  const demo = $(<Demo className="hello" />);
  expect(demo).toHaveHtml(`<div class="hello">world</div>`);
  // Rerender with a new className on the top component:
  demo.props({ className: "bye" });
  expect(demo).toHaveHtml(`<div class="bye">world</div>`);
});
```

#### Parameters

`newProps`: the props to pass to the component in a new re-render. It can be either a plain object, or a function that will receive the old props and should return the new props.

#### Return

An instance of React Test that has re-rendered with the new props.

#### Examples

Update the prop className:

```js
const Demo = ({ className }) => <div className={className}>world</div>;

it("can inject new props", async () => {
  const demo = $(<Demo className="hello" />);
  expect(demo).toHaveHtml(`<div class="hello">world</div>`);
  demo.props({ className: "bye" });
  expect(demo).toHaveHtml(`<div class="bye">world</div>`);
});

it("can accept the old props", async () => {
  const demo = $(<Demo className="hello" />);
  expect(demo).toHaveHtml(`<div class="hello">world</div>`);
  demo.props((p) => ({ className: p.className + "-bye" }));
  expect(demo).toHaveHtml(`<div class="hello-bye">world</div>`);
});
```
