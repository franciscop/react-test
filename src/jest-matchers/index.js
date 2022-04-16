import toBeEnabled from "./toBeEnabled";
import toHaveAttribute from "./toHaveAttribute";
import toHaveClass from "./toHaveClass";
import toHaveHtml from "./toHaveHtml";
import toHaveText from "./toHaveText";
import toHaveValue from "./toHaveValue";
import toMatchSelector from "./toMatchSelector";
import toHaveStyle from "./toHaveStyle";

expect.extend({
  toBeEnabled,
  toHaveAttribute,
  toHaveClass,
  toHaveHtml,
  toHaveText,
  toHaveValue,
  toMatchSelector,
  toHaveStyle,
});
