import { normalize, getPlainTag } from '../../helpers';
import htmlTags from './htmlTags.json';

// Duplicated from https://github.com/sindresorhus/is-html
const isValidHTML = (str) => {
  const basic = /\s?<!doctype html>|(<html\b[^>]*>|<body\b[^>]*>|<x-[^>]+>)+/i;
  const full = new RegExp(
    htmlTags.map((tag) => `<${tag}\\b[^>]*>`).join('|'),
    'i'
  );
  return basic.test(str) || full.test(str);
};

export default function (frag, html) {
  if (!isValidHTML(html)) {
    throw new Error('Invalid HTML. Please input valid HTML.');
  }

  this.affirmative = !this.isNot;
  frag = normalize(frag);

  for (let el of frag) {
    const base = getPlainTag(el);
    const hasHTML = el.outerHTML.includes(html);

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
