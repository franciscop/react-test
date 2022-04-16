import { normalize, getPlainTag } from "../../helpers";

export default function (frag) {
  // To avoid double negations ¯\_(ツ)_/¯
  this.affirmative = !this.isNot;

  // Convert it into a plain array of nodes
  frag = normalize(frag);

  for (let el of frag) {
    // Prepare the message if there's an error. It needs to build this string:
    // <input disabled="">
    const base = getPlainTag(el);

    // Boolean indicating if any of the received nodes have the attribute "disabled"
    const isEnabled = !el.disabled;

    // expect(<input />).toBeEnabled();
    if (this.affirmative) {
      if (!isEnabled) {
        const msg = `Expected ${base} not to include the attribute "disabled"`;
        return { pass: false, message: () => msg };
      }
    }

    // expect(<input type="text" disabled />).not.toBeEnabled();
    if (this.isNot) {
      if (isEnabled) {
        const msg = `Expected ${base} to include the attribute "disabled"`;
        return { pass: true, message: () => msg };
      }
    }
  }

  return { pass: !this.isNot };
}
