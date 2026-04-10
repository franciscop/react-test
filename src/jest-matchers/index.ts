import toBeEnabled from "./toBeEnabled/index";
import toHaveAttribute from "./toHaveAttribute/index";
import toHaveClass from "./toHaveClass/index";
import toHaveError from "./toHaveError/index";
import toHaveHtml from "./toHaveHtml/index";
import toHaveStyle from "./toHaveStyle/index";
import toHaveText from "./toHaveText/index";
import toHaveValue from "./toHaveValue/index";
import toMatchSelector from "./toMatchSelector/index";

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
