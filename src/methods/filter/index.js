import $ from "../constructor";

/**
 * Keep only the nodes that match the selector, removing the others:
 *
 * ```js
 * const items = $(<ChatRooms />).children();
 * const people = items.filter(".user").array("innerText");
 * expect(people).toEqual(["John", "Sarah"]);
 * ```
 *
 * **[→ Full .filter() Docs](https://react-test.dev/documentation#filter)**
 */
$.prototype.filter = function (selector = "*") {
  // An plain string
  if (typeof selector === "string") {
    const sel = selector;
    selector = (node) => node.matches(sel);
  }
  // An instance of ReactTest
  if (selector.nodes) {
    const sel = selector;
    selector = (node) => sel.nodes.includes(node);
  }
  return $(this.array().filter(selector), this);
};
