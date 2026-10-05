# React Test [![react-test](https://img.shields.io/npm/v/react-test?label=react-test&color=greenlime)](https://www.npmjs.com/package/react-test) [![tests](https://github.com/franciscop/react-test/workflows/tests/badge.svg)](https://github.com/franciscop/react-test/actions) [![gzip size](https://img.badgesize.io/franciscop/react-test/master/index.min.js.svg?label=gzip&logo=&compression=gzip)](https://github.com/franciscop/react-test/blob/master/index.min.js) [![dependencies](https://img.shields.io/badge/dependencies-0-limegreen.svg)](https://github.com/franciscop/react-test/blob/master/package.json)

Expressive testing library for React to make sure your code works as expected:

```js
import $ from "react-test";

it("increments when clicked", async () => {
  const counter = $(<Counter />);
  expect(counter).toHaveText("0");
  await counter.click();
  expect(counter).toHaveText("1");
});
```

The `react-test` syntax follows a similar schema to jQuery so it's very easy to write expressive tests. It also adds some matchers to `expect()` for convenience, and works with Vitest, Bun and Jest.

## Getting Started

React Test renders your components into a real DOM, so your test runner needs one. [jsdom](https://github.com/jsdom/jsdom) and [happy-dom](https://github.com/capricorn86/happy-dom) both work. If you don't have a React project yet, create one with [Vite](https://vite.dev/):

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
```

Then install React Test, [Vitest](https://vitest.dev/) and a DOM. They are only needed for development:

```bash
npm install --save-dev react-test vitest jsdom
```

Now you can write tests. Let's say you have this `<Counter />` component:

```tsx
// src/Counter.tsx
import { useState } from "react";

export default function Counter() {
  const [counter, setCounter] = useState(0);
  const increment = () => setCounter(counter + 1);
  return <button onClick={increment}>{counter}</button>;
}
```

To make sure it works as expected, create a test file next to it:

```tsx
// src/Counter.test.tsx
import { describe, expect, it } from "vitest";
import $ from "react-test";
import Counter from "./Counter";

describe("Counter", () => {
  it("is initialized to 0", () => {
    const $counter = $(<Counter />);
    expect($counter).toHaveText("0");
  });

  it("can be incremented with a click", async () => {
    const $counter = $(<Counter />);
    await $counter.click();
    expect($counter).toHaveText("1");
  });

  it("can be incremented multiple times", async () => {
    const $counter = $(<Counter />);
    await $counter.click();
    await $counter.click();
    await $counter.click();
    expect($counter).toHaveText("3");
  });
});
```

Finally run the tests with that DOM:

```bash
npx vitest --environment jsdom
```

To set the DOM in your config instead, add `test: { environment: "jsdom" }` to `vite.config.ts` and import `defineConfig` from `"vitest/config"` instead of `"vite"`.

> There's many ways of configuring Vitest, this is just one example but feel free to customize it to your needs/preferences.

### Bun

Bun's test runner needs a DOM as well. Install React Test with happy-dom's global registrator:

```bash
bun add --dev react-test @happy-dom/global-registrator
```

Then preload the registrator for every `bun test` run in your `bunfig.toml`:

```toml
[test]
preload = ["@happy-dom/global-registrator/register.js"]
```

The preload adds the DOM to every test file, so server code that checks for `window` will think it runs in a browser. If you also test server code, pass the preload only when running your component tests instead:

```bash
bun test src/components --preload @happy-dom/global-registrator/register.js
bun test src/server
```

> There's many ways of configuring Bun, this is just one example but feel free to customize it to your needs/preferences.

### Jest

Jest needs the jsdom environment, and Babel to compile your JSX, your TypeScript and React Test itself, since it is published as an ES module:

```bash
npm install --save-dev react-test jest jest-environment-jsdom @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript
```

```js
// jest.config.js
export default {
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["/node_modules/(?!react-test/)"],
};
```

```json
// babel.config.json
{
  "presets": [
    ["@babel/preset-env", { "targets": { "node": "current" } }],
    ["@babel/preset-react", { "runtime": "automatic" }],
    "@babel/preset-typescript"
  ]
}
```

Then run your tests with `npx jest`.

> There's many ways of configuring Jest, this is just one example but feel free to customize it to your needs/preferences.

### Supported environments

React Test supports React 18 and 19, and is tested with both of them in each of these setups:

- Vitest with jsdom
- Vitest with happy-dom
- Bun with happy-dom
- Jest with jsdom

The [`demo/`](https://github.com/franciscop/react-test/tree/master/demo) folder has a working project for each of them.

### TypeScript

React Test ships with its own type definitions, so there is no `@types/` package to install. The matchers (`toHaveText`, `toHaveError`, etc.) are added to the `expect()` of Vitest, Bun and Jest. The `ReactTest` type is exported if you need to annotate variables explicitly:

```ts
import $ from "react-test";
import type { ReactTest } from "react-test";

it("increments when clicked", async () => {
  const counter: ReactTest = $(<Counter />);
  expect(counter).toHaveText("0");
  await counter.click();
  expect(counter).toHaveText("1");
});
```

### Basics of testing

React applications are divided in components, and these components can be tested either individually or in group. Self-contained components are easier to test, document and debug.

For example, a plain button can be defined with a callback function, and change colors depending on the `primary` attribute:

```js
export default function Button({ primary, onClick, children }) {
  const background = primary ? "blue" : "gray";
  return (
    <button onClick={onClick} style={{ background }}>
      {children}
    </button>
  );
}
```

Then we can test it with `react-test` by creating a `Button.test.js` file and adding some assertions:

```js
import { describe, expect, it, vi } from "vitest";
import $ from "react-test";
import Button from "./Button";

describe("Button", () => {
  it("has different backgrounds depending on the props", () => {
    const $button = $(<Button>Hello</Button>);
    expect($button).toHaveStyle({ background: "gray" });
    const $primary = $(<Button primary>Hello</Button>);
    expect($primary).toHaveStyle({ background: "blue" });
  });

  it("can be clicked", async () => {
    const fn = vi.fn();
    const $button = $(<Button onClick={fn}>Hello</Button>);
    expect(fn).not.toHaveBeenCalled();
    await $button.click();
    expect(fn).toHaveBeenCalled();
  });

  // FAILS
  it("cannot be clicked if it's disabled", async () => {
    const fn = vi.fn();
    const $button = $(
      <Button onClick={fn} disabled>
        Hello
      </Button>,
    );
    await $button.click();
    expect(fn).not.toHaveBeenCalled(); // ERROR!
  });
});
```

Great! All of our tests are working except for the last one. Now we can go back to our component and fix it:

```js
export default function Button({ primary, onClick, children, ...props }) {
  const background = primary ? "blue" : "gray";
  return (
    <button onClick={onClick} style={{ background }} {...props}>
      {children}
    </button>
  );
}
```

### Concepts

#### Matched nodes

When we talk about "the first element" or "the elements matched" we always refer to the top-level element (unless specified differently). So in this example:

```js
const list = $(
  <ul>
    <li>A</li>
    <li>B</li>
  </ul>,
);
```

The first element, which is the same as the matched nodes, is the `ul` and **not the <li>**. We can always "go down a level" with the proper DOM navigation methods:

```js
const list = $(...);  // The node <ul>
const items = list.children();  // An array of <li> nodes
```

In this case the _matched nodes_ of `list` is an array containing only the `<ul>`, while the _matched nodes_ for `items` is an array with both of the `<li>`.

This is very important for many things, e.g. if you are trying to `.filter()` the `<li>` you need to use `items` and not `list`, same as if you want to get the first `<li>`'s Node:

```js
list.get(0); // <ul>...</ul> ~> The whole thing
items.get(0); // <li>A</li>   ~> The first item
items.get(1); // <li>B</li>   ~> The second item
items.get(-1); // <li>B</li>   ~> The last item
```

`.get()` returns a native DOM Node, which ends the chain. To narrow the matched nodes down to a single one and keep using React Test, use `.eq()`, `.first()` or `.last()`:

```js
items.eq(1); // The <li>B</li> item, wrapped
items.first().text(); // "A"
items.last().find("a").click(); // Chaining still works
```

The matched nodes of a rendered component always follow its latest render, even when React replaces the top-level element, like when navigating to another page. The ones from `.find()`, `.children()` and the like are fixed when you call them, so after a re-render query again from the component:

```js
const app = $(<App />);
const link = app.find("a.about");
await link.click(); // App now renders a different page
app.text(); // The new page
link.text(); // Still the old link, query again with app.find()
```

### FAQ

#### Is this an official Facebook/React library?

No. This follows the community convention of calling a library related to React as `react-NAME`. It is made [by these contributors](https://github.com/franciscop/react-test/graphs/contributors) without any involvement of Facebook or [React](https://reactjs.org/).

#### How can I contribute?

Thanks! Right now there are [some beginner-friendly issues](https://github.com/franciscop/react-test/labels/good%20first%20issue) so please feel free to implement those!

I will try to help as much as possible on the PRs.

#### I have a problem, how do I fix it?

Don't sweat it, [just open an issue](https://github.com/franciscop/react-test/issues/new). React Test is in an early phase with incomplete documentation so feel free to read the code or ask directly in the issues.

This will change once the library is more stable, there's more documentation and if the community grows (maybe a chat, or reddit group, or ...).

#### How did you get `react-test`?

I've [written a blog post about this](https://medium.com/server-for-node-js/getting-a-great-npm-name-b0b2b27a0e1b), but the gist of it is that the npm package was taken [by Deepstream.io](https://deepstream.io/) before but not used. So I asked politely and they allowed me to use it.

#### How is this different from [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)?

This is a difficult one. First, React Testing Library, the documentation and the work from [@kentcdodds](https://github.com/kentcdodds) and other collaborators is amazing and I've learned a lot from it. The main differences are:

The syntax follows jQuery-style chaining:

```js
// react-test
import $ from "react-test";
test("Increments when clicked", async () => {
  const $counter = $(<Counter />);
  expect($counter).toHaveText("0");
  await $counter.click();
  expect($counter).toHaveText("1");
});

// react testing library
import { render, fireEvent } from "@testing-library/react";
test("Increments when clicked", () => {
  const { getByRole, container } = render(<Counter />);
  expect(container).toHaveTextContent("0");
  fireEvent.click(getByRole("button"));
  expect(container).toHaveTextContent("1");
});
```

React Test is a work in progress, so if you are writing tests for production right now please use one of the better known alternatives.

#### jQuery syntax, ewwh

That's not really a question! But if for some reason you deeply despise those dollars, perhaps because they remind you of PHP, you can avoid them altogether:

```js
import render from "react-test";

test("Increments when clicked", async () => {
  const counter = render(<Counter />);
  expect(counter).toHaveText("0");
  await counter.click();
  expect(counter).toHaveText("1");
});
```

We obviously love React, but let's not forget that jQuery also has some great things as well. This library brings some of these nice things to react testing.

#### When will the 1.0 be ready?

To launch the version 1.0, I'd like to finish a few tasks:

- Write more documentation and normalize it
- Normalize code, specially across testing
- Add some more event-based functionality, like extending native events (if possible).
- Write 5 working examples in total. Counter, Signup, MovieList, CRUD and Swipe (names TBD).

I don't know how long that'll take, right now I'm normalizing the code and documentation.
