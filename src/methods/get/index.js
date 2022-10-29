import $ from "../constructor";

/**
 * Get a native DOM Node given its index. Defaults to the first element:
 *
 * ```js
 * const item = $(<List />).children().get(0);
 * expect(item.innerText).toBe("First Item");
 * ```
 *
 * **[→ Full .get() Docs](https://react-test.dev/documentation#get)**
 */
$.prototype.get = function (index = 0) {
  // Convert it to a plain array
  const nodes = this.array();

  // No elements at all; cannot match
  if (!nodes.length) return null;

  // Wrap around overflowing indexes
  index = index % nodes.length;

  // Ensure the index is positive
  index = (nodes.length + index) % nodes.length;

  // Return the correct node
  return nodes[index];
};
