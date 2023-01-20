import $ from "../constructor";

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
  if (typeof props === "function") {
    props = props(container.component.props);
  }
  container.render({ ...container.component, props });
  this.nodes = [...container.childNodes];
  return this;
};
