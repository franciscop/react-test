import $ from "../constructor";

/**
 * Simulates typing the text on all the matched elements. It should be awaited for the side effects to run and the component to re-rendered:
 *
 * ```js
 * const input = $(<input />);
 * expect(input).toHaveValue("");
 * await input.type("Francisco");
 * expect(input).toHaveValue("Francisco");
 * ```
 *
 * **[→ Full .type() Docs](https://react-test.dev/documentation#type)**
 */
$.prototype.type = async function (input) {
  const strings = input.split("").map((k, i) => input.slice(0, i + 1));
  for (let value of strings) {
    await this.change(value);
    await this.delay(10);
  }
};
