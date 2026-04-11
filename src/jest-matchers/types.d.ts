interface ReactTestMatchers<R> {
  toBeEnabled(): R;
  toHaveAttribute(attr: string, val?: string | RegExp | boolean): R;
  toHaveClass(...classes: (string | string[])[]): R;
  toHaveError(message?: string | RegExp): R;
  toHaveHtml(html: string): R;
  toHaveStyle(styles: string | Record<string, unknown>): R;
  toHaveText(text: string): R;
  toHaveValue(value?: string | boolean | number): R;
  toMatchSelector(selector: string): R;
}

declare global {
  namespace jest {
    interface Matchers<R> extends ReactTestMatchers<R> {}
  }
}

declare module "vitest" {
  interface Matchers<T = any> extends ReactTestMatchers<T> {}
}
