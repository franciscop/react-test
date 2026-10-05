import toBeEnabled from "./toBeEnabled/index";
import toHaveAttribute from "./toHaveAttribute/index";
import toHaveClass from "./toHaveClass/index";
import toHaveError from "./toHaveError/index";
import toHaveHtml from "./toHaveHtml/index";
import toHaveStyle from "./toHaveStyle/index";
import toHaveText from "./toHaveText/index";
import toHaveValue from "./toHaveValue/index";
import toMatchSelector from "./toMatchSelector/index";

// Without `globals: true`, Vitest only exposes expect() through this symbol
const runner =
  typeof expect === "undefined"
    ? (globalThis as any)[Symbol.for("expect-global")]
    : expect;

runner.extend({
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
