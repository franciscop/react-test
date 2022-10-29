import $ from "../constructor";

/**
 * Trigger a click on all the matched elements. It should be awaited for the side effects to run and the component to re-rendered:
 *
 * ```js
 * const counter = $(<Counter />);
 * expect(counter.text()).toEqual("0");
 * await counter.click();
 * expect(counter.text()).toEqual("1");
 * ```
 *
 * **[→ Full .click() Docs](https://react-test.dev/documentation#click)**
 */
$.prototype.click = function () {
  return this.trigger("click");
};
