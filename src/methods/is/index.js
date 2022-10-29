import $ from "../constructor";

/**
 * Check whether all of the nodes match the selector:
 *
 * ```js
 * const items = $(<List />).children();
 * expect(items.is("li")).toBe(true);
 * ```
 *
 * **[→ Full .is() Docs](https://react-test.dev/documentation#is)**
 */
$.prototype.is = function (selector = "*") {
  return this.filter(selector).length === this.length;
};
