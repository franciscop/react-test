import $, { type ReactTest } from "../constructor.ts";

/**
 * Read the data-attribute value of the first node and return its value:
 *
 * ```js
 * const card = $(<div data-id="25" data-selected />);
 * expect(card.data("id")).toBe("25");
 * expect(card.data("selected")).toBe("true");
 * expect(card.data("name")).toBe(null);
 * ```
 *
 * **[→ Full .data() Docs](https://react-test.dev/documentation#data)**
 */
$.prototype.data = function (this: ReactTest, name: string): string | null {
  return this.attr(`data-${name}`);
};
