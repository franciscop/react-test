import { normalize, getPlainTag } from '../../helpers'

const whitespace = (str) => str.replace(/\s+/g, ' ')

export default function (frag, expected) {
  // To avoid double negations ¯\_(ツ)_/¯
  this.affirmative = !this.isNot

  // Convert it into a plain array of nodes
  frag = normalize(frag)

  for (const el of frag) {
    // Prepare the message if there's an error. It needs to build this string:
    // <button class="primary button">
    const received = el.textContent
    const base = getPlainTag(el)

    if (this.affirmative) {
      // expect(<div>banana</div>).toHaveText('banana');
      if (whitespace(received) !== whitespace(expected)) {
        const msg = `Expected ${base} to have text "${expected}" but it received "${received}"`
        return { pass: false, message: () => msg }
      }
    } else {
      // expect(<div>orange</div>).not.toHaveText('banana');
      if (whitespace(received) === whitespace(expected)) {
        const msg = `Expected ${base} not to have the text "${received}"`
        return { pass: true, message: () => msg }
      }
    }
  }

  return { pass: !this.isNot }
}
