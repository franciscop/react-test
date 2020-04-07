import toBeEnabled from "./toBeEnabled";
import toHaveClass from "./toHaveClass";
import toHaveText from "./toHaveText";

expect.extend({
  toBeEnabled,
  toHaveClass,
  toHaveText
});
