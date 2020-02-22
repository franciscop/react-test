const toStr = list =>
  `class${list.length > 1 ? "es" : ""} "${list.join('", "')}"`;

export default function(frag, ...expectedClasses) {
  // To avoid double negations ¯\_(ツ)_/¯
  this.affirmative = !this.isNot;

  if (!frag)
    throw new Error(
      "expect() should receive an HTMLElement or React Test instance"
    );

  // For now get the first one, consider looping later
  if (frag.nodes) frag = frag.nodes;

  if (!Array.isArray(frag)) frag = [frag];

  for (let el of frag) {
    // Make sure it's an HTML node
    if (!el.nodeName) {
      throw new Error(
        "expect() should receive an HTMLElement or React Test instance"
      );
    }

    const name = el.nodeName.toLowerCase();
    const received = [...el.classList];
    const expected = expectedClasses.flat();
    const found = expected.filter(name => received.includes(name));
    const notfound = expected.filter(name => !received.includes(name));

    const ref = `<${name} class="${received.join(" ")}">`;

    // expect(<div className="banana" />).toHaveClass('banana');
    if (this.affirmative) {
      if (found.length < expected.length) {
        const msg = `Expected ${ref} to include ${toStr(notfound)}`;
        return { pass: false, message: () => msg };
      }
    }

    // expect(<div className="orange" />).not.toHaveClass('banana');
    if (this.isNot) {
      if (found.length) {
        const msg = `Expected ${ref} not to include ${toStr(found)}`;
        return { pass: true, message: () => msg };
      }
    }
  }

  return { pass: !this.isNot };
}
