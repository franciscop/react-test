import $ from "../constructor";
import { act } from "react-dom/test-utils";

/**
 * Makes the component to wait for the specified period of time in milliseconds:
 *
 * ```js
 * const down = $(<CountDown />);
 * expect(down).toHaveText("3");
 * await down.delay(4000); // 4 seconds
 * expect(down).toHaveText("Done!");
 * ```
 *
 * **[→ Full .delay() Docs](https://react-test.dev/documentation#delay)**
 */
$.prototype.delay = async function (time) {
  await act(() => new Promise((done) => setTimeout(done, time)));
};
