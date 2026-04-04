import $, { type ReactTest } from "../constructor.ts";

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
$.prototype.render = function (this: ReactTest, component: unknown): ReactTest {
  const container = (this.nodes[0] as Element).closest("#root") as any;
  container.render(component);
  this.nodes = [...container.childNodes];
  return this;
};
