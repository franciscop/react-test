import render from "./render";
import { act } from "react-dom/test-utils";

const $ = function ReactTest(obj, ctx = {}) {
  if (!(this instanceof $)) return new $(obj, ctx);

  this.events = ctx.events || {};

  act(() => {
    window.addEventListener = (event, callback) => {
      this.events[event] = this.events[event] || [];
      this.events[event].push(callback);
    };

    document.addEventListener = (event, callback) => {
      this.events[event] = this.events[event] || [];
      this.events[event].push(callback);
    };

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
