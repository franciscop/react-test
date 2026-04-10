import $, { type ReactTest } from "../constructor";

/**
 * Remove the matched nodes from the collection. It's the opposite of .filter():
 *
 * ```js
 * const items = $(<ChatRooms />).children();
 * const groups = items.not(".user").array("innerText");
 * expect(groups).toEqual(["Summer", "Birthday"]);
 * ```
 *
 * **[→ Full .not() Docs](https://react-test.dev/documentation#not)**
 */
$.prototype.not = function (
  this: ReactTest,
  filter: string | ReactTest = "*",
): ReactTest {
  if (typeof filter === "function") {
    throw new Error("A callback is not allowed for .not()");
  }
  return this.filter((node) => !$(node).is(filter as string));
};
