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
  // This is needed for uncontrolled inputs
  this.map((node) => {
    const el = node as HTMLInputElement;
    if (el.nodeName === "INPUT" && ["checkbox", "radio"].includes(el.type)) {
      el.checked = value as boolean;
    } else {
      el.value = value as string;
    }
  });

  await this.trigger("change", { target: { value } });
  return null;
};
