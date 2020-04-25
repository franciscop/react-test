import toBeEnabled from "./toBeEnabled";
import toHaveAttribute from "./toHaveAttribute";
import toHaveClass from "./toHaveClass";
import toHaveText from "./toHaveText";

expect.extend({
  toBeEnabled,
  toHaveAttribute,
  toHaveClass,
  toHaveText,
});
