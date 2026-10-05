import { setNative } from "../../helpers/index";
import $, { type ReactTest } from "../constructor";

/**
 * Trigger a change in all of the matched elements. It should be awaited for the side effects to run and the component to re-rendered:
 *
 * ```js
 * const input = $(<input defaultValue="hello" />);
 * expect(input).toHaveValue("hello");
 * await input.change("world");
 * expect(input).toHaveValue("world");
 * ```
 *
 * **[→ Full .change() Docs](https://react-test.dev/documentation#change)**
 */
$.prototype.change = async function (
  this: ReactTest,
  value: string | boolean,
): Promise<null> {
  if (!this.nodes.length) {
    await this.trigger("change");
    return null;
  }
  await Promise.all(
    this.nodes.map(async (node) => {
      const el = node as HTMLInputElement;
      if (el.nodeName === "INPUT" && ["checkbox", "radio"].includes(el.type)) {
        // A click can never uncheck a radio, so set it directly
        if (el.type === "radio" && !value) el.checked = false;
        else if (el.checked !== Boolean(value)) await $(el).click();
        return;
      }
      setNative(el, "value", value);
      await $(el).trigger(el.nodeName === "SELECT" ? "change" : "input");
    }),
  );
  return null;
};
