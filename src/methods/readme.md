## Library API

The main export is a function which we call `$` and accepts a React element or fragment:

```js
import $ from 'react-test';
const $button = $(<button>Hello world</button>);
expect($button).toHaveText('Hello world');
```

Since the API is inspired on jQuery we call React Test `$`, but you can call it `render` or anything you prefer.

You *cannot* modify the DOM directly with this library, but you *can* trigger events that, depending on your React components, might modify the DOM:

```js
const Greeter = () => {
  const [name, setName] = useState();
  return (
    <div>
      Hello {name || 'Anonymous'}
      <input onChange={e => setName(e.target.value)} />
    </div>
  );
};

// TODO: .type() is not available yet
it('can type', async () => {
  const $greet = $(<Greeter />);
  expect($greet.text()).toBe('Hello Anonymous');
  await $greet.find('input').type('Francisco');
  expect($greet.text()).toBe('Hello Francisco');
});
```
