import { normalize, getPlainTag } from '../../helpers';

export default function (frag, htmlText) {
  this.affirmative = !this.isNot;
  frag = normalize(frag);
  htmlText = htmlText.trim();

  for (let el of frag) {
    const base = getPlainTag(el);
    const container = el.outerHTML;
    const hasHTML = container.includes(htmlText);

    if (this.affirmative && !hasHTML) {
      const msg = `Expected ${base} to have ${htmlText}`;
      return { pass: false, message: () => msg };
    }

    if (this.isNot && hasHTML) {
      const msg = `Expected ${base} not to have ${htmlText}`;
      return { pass: true, message: () => msg };
    }
  }

  return { pass: !this.isNot };
}
