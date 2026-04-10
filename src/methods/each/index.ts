import $, { type ReactTest } from "../constructor";

/**
 * Iterates over each of the nodes and returns the same collection of nodes as there was before:
 *
 * ```js
 * const items = $(<List />).find("li");
 * const texts = [];
 * items.each((node) => texts.push(node.innerText));
 * expect(texts).toEqual(["A", "B", "C"]);
 * ```
 *
 * **[→ Full .each() Docs](https://react-test.dev/documentation#each)**
 */
$.prototype.each = function (
  this: ReactTest,
  callback: (node: Node, index: number, arr: Node[]) => void = () => {},
): ReactTest {
  this.array(callback);
  return this;
};
