import { normalize, getPlainTag } from "../../helpers/index";

const whitespace = (str: string) => str.replace(/\s+/g, " ");

export default function (
  this: any,
  frag: any,
  expected: string,
): { pass: boolean; message: () => string } {
  // To avoid double negations ¯\_(ツ)_/¯
  this.affirmative = !this.isNot;

  // Convert it into a plain array of nodes
  frag = normalize(frag);

  for (const el of frag) {
    // Prepare the message if there's an error. It needs to build this string:
    // <button class="primary button">
    const received = el.textContent as string;
    const base = getPlainTag(el);

    // expect(<div>banana</div>).toHaveText('banana');
    if (this.affirmative) {
      if (whitespace(received) !== whitespace(expected)) {
        const msg = `Expected ${base} to have text "${expected}" but it received "${received}"`;
        return { pass: false, message: () => msg };
      }
    }

    // expect(<div>orange</div>).not.toHaveText('banana');
    else {
      if (whitespace(received) === whitespace(expected)) {
        const msg = `Expected ${base} not to have the text "${received}"`;
        return { pass: true, message: () => msg };
      }
    }
  }

  return { pass: !this.isNot, message: () => "" };
}
