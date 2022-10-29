import $ from "../constructor";

/**
 * Get the children nodes of all of the matched elements, optionally filtering them with a CSS selector:
 *
 * ```js
 * const list = $(<List />);
 * expect(list.children()).toHaveLength(3)
 * expect(list.children(".active")).toHaveLength(1);
 * ```
 *
 * **[→ Full .children() Docs](https://react-test.dev/documentation#children)**
 */
$.prototype.children = function (selector = "*") {
  return this.map((node) => [...node.children]).filter(selector);
};
