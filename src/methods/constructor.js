import render from "./render";

function ReactTest(obj, ctx = {}) {
  if (!(this instanceof ReactTest)) return new ReactTest(obj, ctx);

  this.events = ctx.events || {};

  window.addEventListener = (event, callback) => {
    this.events[event] = this.events[event] || [];
    this.events[event].push(callback);
  };

  document.addEventListener = (event, callback) => {
    this.events[event] = this.events[event] || [];
    this.events[event].push(callback);
  };

  this.nodes = render(obj);

  // Add a .length that goes to measure the nodes
  Object.defineProperty(this, "length", { get: () => this.nodes.length });

  return this;
}

// Allow to iterate with for...of and destructure it like [...$list.find('li')]
ReactTest.prototype[Symbol.iterator] = function* () {
  for (let node of this.nodes) {
    yield node;
  }
};

export default ReactTest;
