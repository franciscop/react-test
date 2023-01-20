import $ from "../constructor";

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
 * @param {(string|boolean)} value
 */
$.prototype.change = async function (value) {
  // This is needed for uncontrolled inputs
  this.map((node) => {
    if (
      node.nodeName === "INPUT" &&
      ["checkbox", "radio"].includes(node.type)
    ) {
      node.checked = value;
    } else {
      node.value = value;
    }
  });

  await this.trigger("change", { target: { value } });
  return null;
};
