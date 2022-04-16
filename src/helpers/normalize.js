// [INTERNAL USE ONLY]
// normalize()
// Take the expect() arg and returns a clean array of HTMLElements
import render from "../methods/render";

export default (frag) => {
  if (!frag) {
    throw new Error(
      "expect() should receive an HTMLElement or React Test instance"
    );
  }

  // Convert a raw element to
  if (frag.$$typeof) {
    const parts = render(frag);
    frag = parts[0];
  }

  // For now get the first one, consider looping later
  if (frag.toArray) frag = frag.toArray();

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
