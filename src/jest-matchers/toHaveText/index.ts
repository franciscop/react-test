import { normalize, getPlainTag, emptySelection } from "../../helpers/index";

const whitespace = (str: string) => str.replace(/\s+/g, " ");

// search() ignores the lastIndex that a /g regex keeps between calls
const matches = (text: string, expected: string | RegExp) =>
  typeof expected === "string"
    ? whitespace(text) === whitespace(expected)
    : whitespace(text).search(expected) !== -1;

export default function toHaveText(
  this: any,
  frag: any,
  expected: string | RegExp,
): { pass: boolean; message: () => string } {
  // To avoid double negations ¯\_(ツ)_/¯
  this.affirmative = !this.isNot;

  // Convert it into a plain array of nodes
  frag = normalize(frag);
  if (!frag.length) return emptySelection(this.isNot, "toHaveText");

  for (const el of frag) {
    // Prepare the message if there's an error. It needs to build this string:
    // <button class="primary button">
    const received = el.textContent as string;
    const base = getPlainTag(el);
    const what =
      typeof expected === "string"
        ? `text "${expected}"`
        : `text matching ${expected}`;

    // expect(<div>banana</div>).toHaveText('banana');
    if (this.affirmative) {
      if (!matches(received, expected)) {
        const msg = `Expected ${base} to have ${what} but it received "${received}"`;
        return { pass: false, message: () => msg };
      }
    }

    // expect(<div>orange</div>).not.toHaveText('banana');
    else {
      if (matches(received, expected)) {
        const msg =
          typeof expected === "string"
            ? `Expected ${base} not to have the text "${received}"`
            : `Expected ${base} not to have ${what} but it received "${received}"`;
        return { pass: true, message: () => msg };
      }
    }
  }

  return { pass: !this.isNot, message: () => "" };
}
