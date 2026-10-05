import $, { type ReactTest } from "../constructor";

/**
 * Keep only the nodes whose text contains the given text, or matches a regex:
 *
 * ```js
 * const $app = $(<App />);
 * await $app.find("button").contains("Start").click();
 * await until($app).contains("Loaded");
 * ```
 *
 * **[→ Full .contains() Docs](https://react-test.dev/documentation#contains)**
 */
$.prototype.contains = function (
  this: ReactTest,
  text: string | RegExp,
): ReactTest {
  return this.filter((node) => {
    // Read it the same way as .text(), so both always agree
    const content = $(node).text();
    if (typeof text === "string") return content.includes(text);
    // search() ignores the lastIndex that a /g regex keeps between calls
    return content.search(text) !== -1;
  });
};
