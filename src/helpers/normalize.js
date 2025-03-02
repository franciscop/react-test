// [INTERNAL USE ONLY]
// normalize()
// Take the expect() arg and returns a clean array of HTMLElements
import render from "../methods/constructor";

export default (frag) => {
  if (!frag) {
    throw new Error(
      "expect() should receive an HTMLElement or React Test instance"
    );
  }

  // Convert a raw element to
  if (frag.$$typeof) return [...render(frag)];

  if (frag.error) return frag;

  // For now get the first one, consider looping later
  if (frag.array) frag = frag.array();

  // It's a single node
  if (!Array.isArray(frag)) frag = [frag];

  frag.forEach((node) => {
    // Make sure it's an HTML node
    if (!node.nodeName) {
      throw new Error(
        "expect() should receive an HTMLElement or React Test instance"
      );
    }
  });

  return frag;
};
