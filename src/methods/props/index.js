import React from "react";
import $ from "../constructor";
import { act } from "react-dom/test-utils";

/**
 * Re-render a component with the new props specified as a plain object:
 *
 * ```js
 * const demo = $(<Demo className="hello" />);
 * expect(demo).toHaveHtml(`<div class="hello">world</div>`);
 * demo.props({ className: "bye" });
 * expect(demo).toHaveHtml(`<div class="bye">world</div>`);
 * ```
 *
 * **[→ Full .props() Docs](https://react-test.dev/documentation#props)**
 */
$.prototype.props = function (props) {
  const container = this.nodes[0].closest("#root");
  const component = container.component;
  const root = container.root;
  const handler = container.handler;
  const Catcher = container.catcher;
  if (typeof props === "function") {
    props = props(component.props);
  }
  act(() =>
    root.render(React.createElement(Catcher, null, { ...component, props }))
  );
  if (handler.error) {
    act(() => root.unmount());
    throw handler.error;
  }
  this.nodes = [...container.childNodes];
  return this;
};
