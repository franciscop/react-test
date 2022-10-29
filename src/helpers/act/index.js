import { act } from "react-dom/test-utils";

/**
 * Wrap a piece of async code that is expected to result in a re-render:
 *
 * ```js
 * const down = $(<CountDown />);
 * expect(down).toHaveText("3");
 * await act(() => delay(4000));
 * expect(down).toHaveText("Done!");
 * ```
 *
 * **[→ Full act() Docs](https://react-test.dev/documentation#act)**
 */
export default act;
