import $, { type ReactTest } from "../constructor.ts";

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
 */
$.prototype.attr = function (this: ReactTest, name: string): string | null {
  const node = this.get(0);
  return node ? (node as HTMLElement).getAttribute(name) : null;
};
