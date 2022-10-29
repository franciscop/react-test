import $ from "../constructor";
import { act } from "react-dom/test-utils";

/**
 * Rerender the component as specified with the new value:
 *
 * ```js
 * const demo = $(<Demo className="hello" />);
 * expect(demo).toHaveHtml(`<div class="hello">world</div>`);
 * demo.render(<Demo className="bye" />);
 * expect(demo).toHaveHtml(`<div class="bye">world</div>`);
 * ```
 *
 * **[→ Full .render() Docs](https://react-test.dev/documentation#render)**
 */
$.prototype.render = function (component) {
  const container = this.nodes[0].closest("#root");
  const root = container.root;
  act(() => root.render(component));
  this.nodes = [...container.childNodes];
  return this;
};
