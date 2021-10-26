# React Test [![npm install react-test](https://img.shields.io/badge/npm%20install-react--test-blue.svg)](https://www.npmjs.com/package/react-test) [![test badge](https://github.com/franciscop/react-test/workflows/tests/badge.svg)](https://github.com/franciscop/react-test/actions) [![gzip size](https://img.badgesize.io/franciscop/react-test/master/index.min.js.svg?compression=gzip)](https://github.com/franciscop/react-test/blob/master/index.min.js)

> Early package! We are [looking for **beginner Open Source contributors**](https://github.com/franciscop/react-test/blob/master/Contributing.md)! ❤️

Expressive testing library for React to make sure your code works as expected:

```js
import $ from 'react-test';

it('increments when clicked', async () => {
  const counter = $(<Counter />);
  expect(counter).toHaveText('0');
  await counter.click();
  expect(counter).toHaveText('1');
});
```

The `react-test` syntax follows a similar schema to jQuery so it's very easy to write expressive tests. The best way to test declarative code is with an imperative library.

## Getting Started

First you'll need a working React project. As an example you can start a working React project with [Create React App](https://create-react-app.dev/):

```bash
npx create-react-app my-app
cd my-app
```

Then install `react-test`. It is only needed for development:

```bash
npm install react-test --save-dev
```

Finally you can write tests. Let's say you have [the `<Counter />` component from this example](#counter) and you want to test it to make sure it works as expected:

```js
// Counter.js
import React, { useState } from 'react';

export default function Counter() {
  const [counter, setCounter] = useState(0);
  const increment = () => setCounter(counter + 1);
  return <button onClick={increment}>{counter}</button>;
}
```

```js
// src/Counter.test.js
import React from 'react';
import $ from 'react-test';
import Counter from './Counter';

describe('Counter.js', () => {
  it('is initialized to 0', () => {
    const counter = $(<Counter />);
    expect(counter.text()).toBe('0');
  });

  it('can be incremented with a click', async () => {
    const counter = $(<Counter />);
    await counter.click();
    expect(counter.text()).toBe('1');
  });

  it('can be incremented multiple times', async () => {
    const counter = $(<Counter />);
    await counter.click();
    await counter.click();
    await counter.click();
    expect(counter.text()).toBe('3');
  });
});
```

Finally run the tests with Jest:

```bash
npm run test
```

### Basics of testing

React applications are divided in components, and these components can be tested either individually or in group. Self-contained components are easier to test, document and debug.

For example, a plain button can be defined with a callback function, and change colors depending on the `primary` attribute:

```js
import React from 'react';

export default function Button({ primary, onClick, children }) {
  const background = primary ? 'blue' : 'gray';
  return (
    <button onClick={onClick} style={{ background }}>
      {children}
    </button>
  );
}
```

Then we can test it with `react-test` by creating a `Button.test.js` file and adding some assertions:

```js
import React from 'react';
import $ from 'react-test';
import Button from './Button';

describe('Button.js', () => {
  it('has different backgrounds depending on the props', () => {
    const $button = $(<Button>Hello</Button>);
    expect($button).toHaveStyle('background', 'gray');
    const $primary = $(<Button primary>Hello</Button>);
    expect($primary).toHaveStyle('background', 'blue');
  });

  it('can be clicked', async () => {
    const fn = jest.fn();
    const $button = $(<Button onClick={fn}>Hello</Button>);
    expect(fn).not.toBeCalled();
    await $button.click();
    expect(fn).toBeCalled();
  });

  // FAILS
  it("cannot be clicked if it's disabled", async () => {
    const fn = jest.fn();
    const $button = $(
      <Button onClick={fn} disabled>
        Hello
      </Button>
    );
    await $button.click();
    expect(fn).not.toBeCalled(); // ERROR!
  });
});
```

Great! All of our tests are working except for the last one. Now we can go back to our component and fix it:

```js
import React from 'react';

export default function Button({ primary, onClick, children, ...props }) {
  const background = primary ? 'blue' : 'gray';
  return (
    <button onClick={onClick} style={{ background }} {...props}>
      {children}
    </button>
  );
}
```

### FAQ

#### Is this an official Facebook/React library?

No. This follows the community convention of calling a library related to React as `react-NAME`. It is made [by these contributors](https://github.com/franciscop/react-test/graphs/contributors) without any involvement of Facebook or [React](https://reactjs.org/).

#### How can I contribute?

Thanks! Please read the [Contributing Guide](./Contributing.md) where we explain how to get started with the project. Right now there are [some beginner-friendly issues](https://github.com/franciscop/react-test/labels/good%20first%20issue) so please feel free to implement those!

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
import $ from 'react-test';
test('Increments when clicked', async () => {
  const $counter = $(<Counter />);
  expect($counter).toHaveText('0');
  await $counter.click();
  expect($counter).toHaveText('1');
});

// react testing library
import { render, fireEvent } from '@testing-library/react';
test('Increments when clicked', () => {
  const { getByRole, container } = render(<Counter />);
  expect(container).toHaveTextContent('0');
  fireEvent.click(getByRole('button'));
  expect(container).toHaveTextContent('1');
});
```

React Test is a work in progress, so if you are writing tests for production right now please use one of the better known alternatives.

#### jQuery syntax, ewwh

That's not really a question! But if for some reason you deeply despise those dollars, perhaps because they remind you of PHP, you can avoid them altogether:

```js
import render from 'react-test';

test('Increments when clicked', async () => {
  const counter = render(<Counter />);
  expect(counter).toHaveText('0');
  await counter.click();
  expect(counter).toHaveText('1');
});
```

We obviously love React, but let's not forget that jQuery also has some great things as well. This library brings some of these nice things to react testing.
