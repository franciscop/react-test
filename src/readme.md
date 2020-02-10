# React Test

To get started, import it, render your component inside of it and assert on the output:

```js
import $ from 'react-test';

const Counter = () => {
  const [count, setCounter] = useState(0);
  return <div onClick={e => setCounter(count + 1)}>{count}<div>;
};

describe('Counter.js', () => {
  it('starts on 0', () => {
    expect($(<Counter />).text()).toBe('0');
  });
});
```
