### .render()

```js
.render(newComponent) -> $
```

Rerender the component as specified with the new value, or unmount/mount the new component.

```js
const Demo = (props) => <div {...props}>world</div>;

it("can force-update the props on the root", () => {
  const demo = $(<Demo className="hello" />);
  expect(demo).toHaveHtml(`<div class="hello">world</div>`);
  // Rerender with a new className on the top component:
  demo.props(<Demo className="bye" />);
  expect(demo).toHaveHtml(`<div class="bye">world</div>`);
});
```

> Note: if you only want to re-render changing the props, you might prefer using [`.props()`](#props).

#### Parameters

`newComponent`: the new component to render in place of the old one. If it's the same component, it'll trigger a re-render, otherwise it'll unmount the old one and mount the new one.

#### Return

An instance of React Test that has re-rendered with the new component.

#### Examples

Rerender with a new prop:

```js
const Demo = ({ className }) => <div className={className}>world</div>;

it("can inject new props", async () => {
  const demo = $(<Demo className="hello" />);
  expect(demo).toHaveHtml(`<div class="hello">world</div>`);
  demo.render(<Demo className="bye" />);
  expect(demo).toHaveHtml(`<div class="bye">world</div>`);
});

it("can render a different component", () => {
  const demo = $(<div>Hello</div>);
  expect(demo).toHaveHtml(`<div>Hello</div>`);
  demo.render(<span>Bye</span>);
  expect(demo).toHaveHtml(`<span>Bye</span>`);
});
```

#### Notes

Do not reuse a root node (by using this `.render()`) more than necessary (e.g. testing rerenders); instead create a raw instance of a component with `$()` as usual for testing new components.
