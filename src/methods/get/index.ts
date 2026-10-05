import $, { type ReactTest } from "../constructor";

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
$.prototype.get = function <T extends Node = Node>(
  this: ReactTest,
  index = 0,
): T | null {
  // Convert it to a plain array
  const nodes = this.array() as Node[];

  // Out of bounds, which includes an empty selection, so the mistake surfaces
  if (index >= nodes.length || index < -nodes.length) return null;

  // Support negative indexes
  return nodes[(nodes.length + index) % nodes.length] as T;
};
