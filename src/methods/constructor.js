import render from "./render";
import { act } from "react-dom/test-utils";

const $ = function ReactTest(obj) {
  if (!(this instanceof $)) return new $(obj);
  act(() => {
    this.nodes = render(obj);
  });
  return this;
};

// Allow to iterate with for...of and destructure it like [...$list.find('li')]
$.prototype[Symbol.iterator] = function*() {
  for (let node of this.nodes) {
    yield node;
  }
};

export default $;
