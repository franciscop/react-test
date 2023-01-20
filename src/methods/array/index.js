import $ from "../constructor";

/**
 * Get all of the matched nodes as a plain array. Optionally extract data of each node either with a key used as an prop, or with a callback:
 *
 * ```js
 * const list = $(<List />).children();
 * list.array();  // [<li>A</li>, <li>B</li>, <li>C</li>]
 * list.array("nodeName");  // ["LI", "LI", "LI"]
 * list.array(node => node.innerText);  // ["A", "B", "C"]
 * ```
 *
 * **[→ Full .array() Docs](https://react-test.dev/documentation#array)**
 * @param {(string|function)} callback
 */
$.prototype.array = function (callback = (node) => node) {
  if (typeof callback === "string") {
    const key = callback;
    callback = (node) => node[key];
  }
  return /** @type {(Node[]|string[])} */ (this.nodes.map(callback));
};
