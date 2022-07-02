### act()

When you want to do some operation that will trigger a change in your React component, usually you need to wrap it in `act()` to trigger the re-render. With React-Test, this is mostly not needed since all of our methods already wrap things with act() internally. But you might define your own e.g. delay() function, and if you expect some changes in your component during that timeout then you should wrap it with act():

```js
import $, { act } from "react-test";
import CountDown from "./CountDown";

const delay = (time) => new Promise((done) => setTimeout(done, time));

it("will countdown from 3 to 0", async () => {
  const down = $(<CountDown />);
  expect(down).toHaveText("3");
  await act(() => delay(4000));
  expect(down).toHaveText("Done!");
});
```

If you do not wrap that custom delay with act(), you'll receive this warning:

```
Warning: An update to Countdown inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act
    at Countdown ([omitted]/Countdown.test.js:8:27)
```

#### Parameters

`async function`: a function that can be either async or sync, that once is done executing might trigger a change in your React component.

#### Return

`Promise`: a promise that must be awaited for to ensure the code has been updated properly.

#### Notes

You do **not** need this for any of the React methods, since we already wrap them with `act()` internally. So all of these are wrong:

```js
const counter = $(<Counter />);
const down = $(<CountDown />);

// WRONG; we already wrap these with act() internally
await act(() => counter.click());
await act(() => down.delay(4000));
await act(() => until(() => down.text() === "Done!"));

// RIGHT; this is how you should be using them instead
await counter.click();
await down.delay(4000);
await until(() => down.text() === "Done!");
```

#### Examples

If you want to define your own timer, then you can wrap it in act():

```js
const delay = (time) => new Promise((done) => setTimeout(done, time));

it('waits properly with act()', () => {
  const down = $(<CountDown />);
  expect(down).toHaveText('3');
  await act(() => delay(4000));
  expect(down).toHaveText('Done!');
});
```
