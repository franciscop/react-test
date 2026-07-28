import $, { type ReactTest } from "../constructor";

/**
 * Reduce the matched nodes to the single one at the given index, keeping it wrapped so it can be chained:
 *
 * ```js
 * const items = $(<List />).children();
 * expect(items.eq(1)).toHaveText("B");
 * expect(items.eq(-1).find("a")).toHaveAttribute("href", "/last");
 * ```
 *
 * **[→ Full .eq() Docs](https://react-test.dev/documentation#eq)**
 */
$.prototype.eq = function (this: ReactTest, index = 0): ReactTest {
  return $(this.get(index), this);
};
