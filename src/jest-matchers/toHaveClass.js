const toStr = list =>
  `class${list.length > 1 ? "es" : ""} "${list.join('", "')}"`;

export default function(el, ...expectedClasses) {
  if (!el) throw new Error("expect() should receive an HTMLElement");

  // For now get the first one, consider looping later
  if (el.nodes) el = el.nodes[0];

  // Make sure it's an HTML node
  if (!el.nodeName) throw new Error("expect() did not receive an HTMLELement");

  const name = el.nodeName.toLowerCase();
  const received = [...el.classList];
  const expected = expectedClasses.flat();
  const found = expected.filter(name => received.includes(name));
  const notfound = expected.filter(name => !received.includes(name));

  const pass = Boolean(this.isNot ? found.length : !notfound.length);

  const ref = `<${name} class="${received.join(" ")}">`;
  if (pass) {
    const msg = `Expected ${ref} not to include ${toStr(found)}`;
    return { pass: true, message: () => msg };
  }
  const msg = `Expected ${ref} to include ${toStr(notfound)}`;
  return { pass: false, message: () => msg };
}
