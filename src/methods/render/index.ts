import React from "react";
import { act } from "react";
import $, { type ReactTest } from "../constructor";

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
  if (!this.root) return this;
  if (!component) {
    act(() => this.root!.root.unmount());
    this.root.remove();
    this.root = null;
    this.nodes = [];
    return this;
  }
  this.root.render(component as React.ReactNode);
  this.nodes = [...this.root.childNodes];
  return this;
};
