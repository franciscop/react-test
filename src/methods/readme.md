## Library API

The main export is a function which we call `$` and accepts a React element or fragment:

```js
import $ from "react-test";
const $button = $(<button>Hello world</button>);
expect($button).toHaveText("Hello world");
```

Since the API is inspired on jQuery we call React Test `$`, but you can call it `render` or anything you prefer.

You _cannot_ modify the DOM directly with this library, but you _can_ trigger events that, depending on your React components, might modify the DOM:

```js
const Greeter = () => {
  const [name, setName] = useState();
  return (
    <div>
      Hello {name || "Anonymous"}
      <input onChange={e => setName(e.target.value)} />
    </div>
  );
};

it("can type in an input", async () => {
  const $greet = $(<Greeter />);
  expect($greet.text()).toBe("Hello Anonymous");
  await $greet.find("input").type("Francisco");
  expect($greet.text()).toBe("Hello Francisco");
});
```
