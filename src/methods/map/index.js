import $ from "../constructor";

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
$.prototype.map = function (callback) {
  // We don't want to select repeated nodes
  const nodes = [];
  this.array(callback)
    // Convert any potential NodeList into an array of plain nodes
    .map((ret) => (ret && ret.forEach ? [...ret] : ret))
    .flat()
    .forEach((node) => {
      if (!node) return;
      if (nodes.includes(node)) return;
      nodes.push(node);
    });
  return $(nodes, this);
};
