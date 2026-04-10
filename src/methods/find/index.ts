import $, { type ReactTest } from "../constructor";

/**
 * Get all of the descendants of the nodes with an optional filter:
 *
 * ```js
 * const links = $(<ChatRooms />).find("a");
 * expect(links).toHaveAttribute("src");
 * ```
 *
 * **[→ Full .find() Docs](https://react-test.dev/documentation#find)**
 */
$.prototype.find = function (this: ReactTest, selector: string): ReactTest {
  if (!selector) return this;
  return this.map((node) => [...(node as Element).querySelectorAll(selector)]);
};
