import { normalize, getPlainTag } from "../../helpers";

const toStr = (list) => {
  return `class${list.length > 1 ? "es" : ""} "${list.join('", "')}"`;
};

export default function (frag, ...expectedClasses) {
  // To avoid double negations ¯\_(ツ)_/¯
  this.affirmative = !this.isNot;

  // Convert it into a plain array of nodes
  frag = normalize(frag);

  // All of the expected classes
  const expected = expectedClasses.flat();

  for (let el of frag) {
    // Prepare the message if there's an error. It needs to build this string:
    // <button class="primary button">
    const received = [...el.classList];
    const base = getPlainTag(el);

    // All the expected classes that have been received
    const found = expected.filter((name) => received.includes(name));

    // All of the expected classes that have NOT been received
    const notfound = expected.filter((name) => !received.includes(name));

    // expect(<div className="banana" />).toHaveClass('banana');
    if (this.affirmative) {
      if (found.length < expected.length) {
        const msg = `Expected ${base} to include ${toStr(notfound)}`;
        return { pass: false, message: () => msg };
      }
    }

    // expect(<div className="orange" />).not.toHaveClass('banana');
    if (this.isNot) {
      if (found.length) {
        const msg = `Expected ${base} not to include ${toStr(found)}`;
        return { pass: true, message: () => msg };
      }
    }
  }

  return { pass: !this.isNot };
}
