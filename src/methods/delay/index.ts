import $, { type ReactTest } from "../constructor.ts";
import { act } from "react";

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
$.prototype.delay = async function (
  this: ReactTest,
  time: number
): Promise<void> {
  await act(() => new Promise<void>((done) => setTimeout(done, time)));
};
