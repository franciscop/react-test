# React Test

To get started, import it and use it:

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
