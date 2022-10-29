import $ from "../constructor";

/**
 * Find all of the sibling nodes to the current one:
 *
 * ```js
 * const list = $(<List />);
 * const items = list.find("li.active").siblings();
 * expect(items.array("className")).toEqual(["", ""]);
 * ```
 *
 * **[→ Full .siblings() Docs](https://react-test.dev/documentation#siblings)**
 */
$.prototype.siblings = function (selector) {
  return this.parent().children(selector).not(this);
};
