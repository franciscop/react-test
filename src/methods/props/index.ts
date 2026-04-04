import $, { type ReactTest } from "../constructor.ts";

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
$.prototype.props = function (
  this: ReactTest,
  props:
    | Record<string, unknown>
    | ((prev: Record<string, unknown>) => Record<string, unknown>)
): ReactTest {
  const container = (this.nodes[0] as Element).closest("#root") as any;
  if (typeof props === "function") {
    props = props(container.component.props);
  }
  container.render({ ...container.component, props });
  this.nodes = [...container.childNodes];
  return this;
};
