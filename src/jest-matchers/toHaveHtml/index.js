import { normalize, getPlainTag } from "../../helpers";

export default function (frag, html) {
  this.affirmative = !this.isNot;
  frag = normalize(frag);

  for (let el of frag) {
    const base = getPlainTag(el);
    const hasHTML = el.outerHTML.includes(html.trim());

    if (this.affirmative && !hasHTML) {
      const msg = `Expected ${base} to have \`${html}\``;
      return { pass: false, message: () => msg };
    }

    if (this.isNot && hasHTML) {
      const msg = `Expected ${base} not to have \`${html}\``;
      return { pass: true, message: () => msg };
    }
  }

  return { pass: !this.isNot };
}
