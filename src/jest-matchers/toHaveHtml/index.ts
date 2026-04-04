import { normalize } from "../../helpers/index.ts";

export default function (
  this: any,
  frag: any,
  html: unknown
): jest.CustomMatcherResult {
  this.affirmative = !this.isNot;
  frag = normalize(frag);
  if (typeof html !== "string") {
    const msg = `Second argument of .toHaveHtml() needs to be a string`;
    return { pass: this.isNot, message: () => msg };
  }

  for (const el of frag) {
    const hasHTML = (el as Element).outerHTML.includes(html.trim());

    if (this.affirmative && !hasHTML) {
      const msg = `Expected ${(el as Element).outerHTML} to include ${html}`;
      return { pass: false, message: () => msg };
    }

    if (this.isNot && hasHTML) {
      const msg = `Expected ${
        (el as Element).outerHTML
      } not to include ${html}`;
      return { pass: true, message: () => msg };
    }
  }

  return { pass: !this.isNot, message: () => "" };
}
