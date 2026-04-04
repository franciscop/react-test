import { normalize, getPlainTag } from "../../helpers/index.ts";

export default function (
  this: any,
  frag: any,
  selectorStr: string
): jest.CustomMatcherResult {
  // To avoid double negations ¯\_(ツ)_/¯
  this.affirmative = !this.isNot;

  // Convert it into a plain array of nodes
  frag = normalize(frag);

  for (const el of frag) {
    const base = getPlainTag(el);
    const matches = (el as Element).matches(selectorStr);

    if (this.affirmative && !matches) {
      const msg = `Expected ${base} to match selector, ${selectorStr}`;
      return { pass: false, message: () => msg };
    }

    if (this.isNot && matches) {
      const msg = `Expected ${base} not to match selector, ${selectorStr}`;
      return { pass: true, message: () => msg };
    }
  }

  return { pass: !this.isNot, message: () => "" };
}
