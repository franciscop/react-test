import React from "react";
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
  const Catcher = container.catcher;
  const handler = container.handler;
  act(() => root.render(React.createElement(Catcher, null, component)));
  if (handler.error) {
    act(() => root.unmount());
    throw handler.error;
  }
  this.nodes = [...container.childNodes];
  return this;
};
