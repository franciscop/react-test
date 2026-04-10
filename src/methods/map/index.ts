import $, { type ReactTest } from "../constructor";

/**
 * Iterates over each of the nodes and returns a new collection with the nodes that were returned from the callback:
 *
 * ```js
 * const items = $(<List />).map(node => {
 *   return node.querySelectorAll("li");
 * }).array("nodeName");
 * expect(items).toBe(["LI", "LI"]);
 * ```
 *
 * **[→ Full .map() Docs](https://react-test.dev/documentation#map)**
 */
$.prototype.map = function (
  this: ReactTest,
  callback: (node: Node) => Node | NodeList | Node[] | null | undefined,
): ReactTest {
  // We don't want to select repeated nodes
  const nodes: Node[] = [];
  (this.array(callback as (node: Node) => unknown) as unknown[])
    // Convert any potential NodeList into an array of plain nodes
    .map((ret: unknown) =>
      ret && (ret as NodeList).forEach ? [...(ret as NodeList)] : ret,
    )
    .flat()
    .forEach((node) => {
      if (!node) return;
      if (nodes.includes(node as Node)) return;
      nodes.push(node as Node);
    });
  return $(nodes, this);
};
