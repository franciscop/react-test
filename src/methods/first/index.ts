import $, { type ReactTest } from "../constructor";

/**
 * Reduce the matched nodes to the first one, keeping it wrapped so it can be chained:
 *
 * ```js
 * const items = $(<List />).children();
 * expect(items.first()).toHaveText("A");
 * ```
 *
 * **[→ Full .first() Docs](https://react-test.dev/documentation#first)**
 */
$.prototype.first = function (this: ReactTest): ReactTest {
  return this.eq(0);
};
