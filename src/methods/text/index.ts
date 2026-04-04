import $, { type ReactTest } from "../constructor.ts";
const whitespace = (str: string) => str.replace(/\s+/g, " ");

/**
 * Get the textContent of the first matched node:
 *
 * ```js
 * const greeting = $(<Greeting />);
 * expect(greeting.text()).toBe("Hello world");
 * ```
 *
 * **[→ Full .text() Docs](https://react-test.dev/documentation#text)**
 */
$.prototype.text = function (this: ReactTest): string {
  const node = this.get(0);
  return node ? whitespace(node.textContent ?? "") : "";
};
