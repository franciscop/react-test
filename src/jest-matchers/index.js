import toBeEnabled from './toBeEnabled';
import toHaveAttribute from './toHaveAttribute';
import toHaveClass from './toHaveClass';
import toHaveText from './toHaveText';
import toHaveValue from './toHaveValue';
import toMatchSelector from './toMatchSelector';
import toHaveStyle from './toHaveStyle';


expect.extend({
  toBeEnabled,
  toHaveAttribute,
  toHaveClass,
  toHaveText,
  toHaveValue,
  toMatchSelector,
  toHaveStyle
});
