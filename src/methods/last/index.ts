import $, { type ReactTest } from "../constructor";

/**
 * Reduce the matched nodes to the last one, keeping it wrapped so it can be chained:
 *
 * ```js
 * const items = $(<List />).children();
 * expect(items.last()).toHaveText("C");
 * ```
 *
 * **[→ Full .last() Docs](https://react-test.dev/documentation#last)**
 */
$.prototype.last = function (this: ReactTest): ReactTest {
  return this.eq(-1);
};
