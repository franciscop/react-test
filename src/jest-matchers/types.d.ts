declare global {
  namespace jest {
    interface Matchers<R> {
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
  }
}

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
