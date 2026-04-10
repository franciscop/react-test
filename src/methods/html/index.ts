import $, { type ReactTest } from "../constructor";

/**
 * Retrieve the OuterHTML of the first element matched, with the whitespace normalized:
 *
 * ```js
 * const items = $(<List />).children();
 * expect(items.html()).toBe("<li>First Item</li>");
 * ```
 *
 * **[→ Full .html() Docs](https://react-test.dev/documentation#html)**
 */
$.prototype.html = function (this: ReactTest): string {
  const node = this.get(0);
  return node ? (node as Element).outerHTML : "";
};
