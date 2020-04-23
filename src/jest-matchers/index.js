import toBeEnabled from "./toBeEnabled";
import toHaveClass from "./toHaveClass";
import toHaveText from "./toHaveText";
import toMatchSelector from "./toMatchSelector";

expect.extend({
  toBeEnabled,
  toHaveClass,
  toHaveText,
  toMatchSelector,
});
