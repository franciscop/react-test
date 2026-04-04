import $, { type ReactTest } from "../constructor.ts";

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
$.prototype.filter = function (
  this: ReactTest,
  selector: string | ReactTest | ((node: Node) => boolean) = "*"
): ReactTest {
  // A plain string
  if (typeof selector === "string") {
    const sel = selector;
    selector = (node) => (node as Element).matches(sel);
  }
  // An instance of ReactTest
  if ((selector as ReactTest).nodes) {
    const sel = selector as ReactTest;
    selector = (node) => sel.nodes.includes(node);
  }
  return $(this.array().filter(selector as (node: Node) => boolean), this);
};
