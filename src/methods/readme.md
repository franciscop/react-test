## Library API

The main export is a function which we call `$` and accepts a React element or fragment:

```js
import $ from "react-test";
const button = $(<button>Hello world</button>);
expect(button.text()).toBe("Hello world");
```

| DOM navigation           | Read data              | Promises (Events+timing) |
| ------------------------ | ---------------------- | ------------------------ |
| [.children()](#children) | [.attr()](#attr)       | [.change()](#change)     |
| [.closest()](#closest)   | [.data()](#data)       | [.click()](#click)       |
| [.each()](#each)         | [.get()](#get)         | [.delay()](#delay)       |
| [.filter()](#filter)     | [.html()](#html)       | [.submit()](#submit)     |
| [.find()](#find)         | [.is()](#is)           | [.trigger()](#trigger)   |
| [.first()](#first)       | [.text()](#text)       | [.type()](#type)         |
| [.last()](#last)         | [.toArray()](#toarray) |                          |
| [.parent()](#parent)     |                        |                          |
| [.siblings()](#siblings) |                        |                          |

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
