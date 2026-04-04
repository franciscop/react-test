import $, { type ReactTest } from "../constructor.ts";

/**
 * Return a new collection with the direct parent of the current nodes with an optional filter:
 *
 * ```js
 * const list = $(<List />);
 * const items = list.find("li > a").parent();
 * expect(items.array("nodeName")).toEqual(["LI", "LI"]);
 * ```
 *
 * **[→ Full .parent() Docs](https://react-test.dev/documentation#parent)**
 */
$.prototype.parent = function (this: ReactTest): ReactTest {
  return this.map((node) => node.parentNode);
};
