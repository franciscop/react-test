import { normalize } from "../../helpers";

export default function (frag, html) {
  this.affirmative = !this.isNot;
  frag = normalize(frag);
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
