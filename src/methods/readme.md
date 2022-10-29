## Library API

The main export is a function which we call `$` and accepts a React element or fragment:

```js
import $ from "react-test";
const button = $(<button>Hello world</button>);
expect(button.text()).toBe("Hello world");
```

| DOM navigation           | Read data          | Promises (Events+timing) |
| ------------------------ | ------------------ | ------------------------ |
| [.children()](#children) | [.array()](#array) | [.change()](#change)     |
| [.closest()](#closest)   | [.attr()](#attr)   | [.click()](#click)       |
| [.each()](#each)         | [.data()](#data)   | [.delay()](#delay)       |
| [.filter()](#filter)     | [.get()](#get)     | [.submit()](#submit)     |
| [.find()](#find)         | [.html()](#html)   | [.trigger()](#trigger)   |
| [.not()](#not)           | [.is()](#is)       | [.type()](#type)         |
| [.parent()](#parent)     | [.text()](#text)   |                          |
| [.siblings()](#siblings) |                    |                          |

Others: [.props()](#props) and [.render()](#render).

Since the API is inspired on jQuery we call React Test `$`, but you can call it `render` or anything you prefer.

You _cannot_ modify the DOM directly with this library, but you _can_ trigger events that, depending on your React components, might modify the DOM:

```js
const Greeter = () => {
  const [name, setName] = useState();
  return (
    <div>
      Hello {name || "Anonymous"}
      <input onChange={(e) => setName(e.target.value)} />
    </div>
  );
};

it("can type in an input", async () => {
  const greet = $(<Greeter />);
  expect(greet.text()).toBe("Hello Anonymous");
  await greet.find("input").type("Francisco");
  expect(greet.text()).toBe("Hello Francisco");

  // ERROR! this or any similar workflow doesn't work as expected!
  greet.find("input").get(0).value = "John";
});
```

You can iterate over the matched elements with `for ... of`:

```js
const list = $(
  <ul>
    <li>A</li>
    <li>B</li>
    <li>C</li>
  </ul>
);

for (let node of list.children()) {
  expect(node.nodeName).toBe("LI");
}
```
