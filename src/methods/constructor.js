import render from "./render";

function ReactTest(obj, ctx = {}) {
  if (!(this instanceof ReactTest)) return new ReactTest(obj, ctx);

  this.events = ctx.events || {};
  const originalAddEventListener = window.addEventListener;

  window.addEventListener = (event, callback) => {
    this.events[event] = this.events[event] || [];
    this.events[event].push(callback);
    originalAddEventListener.call(window, event, callback); // Call native
  };

  document.addEventListener = (event, callback) => {
    this.events[event] = this.events[event] || [];
    this.events[event].push(callback);
  };

  try {
    this.nodes = render(obj);
  } catch (error) {
    this.nodes = [];
    this.error = error;
  }

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
