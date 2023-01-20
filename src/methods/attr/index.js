import $ from "../constructor";

/**
 * Read the attribute value of the first node and return its value, or null if there's no node or attribute:
 *
 * ```js
 * const input = $(<input name="email" disabled />);
 * expect(input.attr("name")).toBe("email");
 * expect(input.attr("disabled")).toBe("");
 * expect(input.attr("placeholder")).toBe(null);
 * ```
 *
 * **[→ Full .attr() Docs](https://react-test.dev/documentation#attr)**
 * @param {(string)} name
 */
$.prototype.attr = function (name) {
  const node = this.get(0);
  return /** @type {(string|null)} */ (node && node.getAttribute(name));
};
