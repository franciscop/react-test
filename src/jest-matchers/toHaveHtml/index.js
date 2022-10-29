import { normalize } from "../../helpers";

export default function (frag, html) {
  this.affirmative = !this.isNot;
  frag = normalize(frag);
  if (typeof html !== "string") {
    const msg = `Second argument of .toHaveHtml() needs to be a string`;
    return { pass: false, message: () => msg };
  }

  for (let el of frag) {
    const hasHTML = el.outerHTML.includes(html.trim());

    if (this.affirmative && !hasHTML) {
      const msg = `Expected ${el.outerHTML} to include ${html}`;
      return { pass: false, message: () => msg };
    }

    if (this.isNot && hasHTML) {
      const msg = `Expected ${el.outerHTML} not to include ${html}`;
      return { pass: true, message: () => msg };
    }
  }

  return { pass: !this.isNot };
}
