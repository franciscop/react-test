import 'vitest';

declare module 'vitest' {
  interface Assertion<T = any> extends ReactTestMatchers<Assertion<T>> {}
}

interface ReactTestMatchers<R> {
  toBeEnabled(): R;
  toHaveAttribute(attr: string, val?: string | RegExp | boolean): R;
  toHaveClass(...classes: (string | string[])[]): R;
  toHaveError(message?: string): R;
  toHaveHtml(html: string): R;
  toHaveStyle(styles: string | Record<string, unknown>): R;
  toHaveText(text: string): R;
  toHaveValue(value?: string | boolean | number): R;
  toMatchSelector(selector: string): R;
}
