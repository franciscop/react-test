import toBeEnabled from "./toBeEnabled/index.ts";
import toHaveAttribute from "./toHaveAttribute/index.ts";
import toHaveClass from "./toHaveClass/index.ts";
import toHaveError from "./toHaveError/index.ts";
import toHaveHtml from "./toHaveHtml/index.ts";
import toHaveText from "./toHaveText/index.ts";
import toHaveValue from "./toHaveValue/index.ts";
import toMatchSelector from "./toMatchSelector/index.ts";
import toHaveStyle from "./toHaveStyle/index.ts";

expect.extend({
  toBeEnabled,
  toHaveAttribute,
  toHaveClass,
  toHaveError,
  toHaveHtml,
  toHaveText,
  toHaveValue,
  toMatchSelector,
  toHaveStyle,
});

declare module "vitest" {
  interface Matchers<T = any> {
    toBeEnabled(): T;
    toHaveAttribute(attr: string, val?: string | RegExp | boolean): T;
    toHaveClass(...classes: (string | string[])[]): T;
    toHaveError(message?: string): T;
    toHaveHtml(html: string): T;
    toHaveStyle(styles: string | Record<string, unknown>): T;
    toHaveText(text: string): T;
    toHaveValue(value?: string | boolean | number): T;
    toMatchSelector(selector: string): T;
  }
}
