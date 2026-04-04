import $, { type ReactTest } from "../constructor.ts";

/**
 * Find the first ancestor that matches the selector for each element (deduplicated):
 *
 * ```js
 * const list = $(<List />);
 * const item = list.find("a").closest("li");
 * expect(item.html()).toBe("<li><a>A</a></li>");
 * ```
 *
 * **[→ Full .closest() Docs](https://react-test.dev/documentation#closest)**
 */
$.prototype.closest = function (this: ReactTest, selector = "*"): ReactTest {
  return this.map((node) => (node as Element).closest(selector));
};
