import $ from "../constructor";

/**
 * Get all of the descendants of the nodes with an optional filter:
 *
 * ```js
 * const links = $(<ChatRooms />).find("a");
 * expect(links).toHaveAttribute("src");
 * ```
 *
 * **[→ Full .find() Docs](https://react-test.dev/documentation#find)**
 * @param {(string)} selector
 */
$.prototype.find = function (selector) {
  if (!selector) return this;
  return this.map((node) => [...node.querySelectorAll(selector)]);
};
