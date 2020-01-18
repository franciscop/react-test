// In React 16.9 - https://github.com/facebook/react/issues/15379
import render from "./render";
import { act } from "react-dom/test-utils";

const $ = function(obj) {
  if (!(this instanceof $)) return new $(obj);
  act(() => {
    this.nodes = render(obj);
  });
  return this;
};

$.prototype.first = function() {
  return this.nodes[0] || null;
};

$.prototype.last = function() {
  return this.nodes[this.nodes.length - 1] || null;
};

$.prototype.attr = function(key) {
  const node = this.first();
  return node && node.getAttribute(key);
};

$.prototype.html = function() {
  const node = this.first();
  return node ? node.outerHTML : "";
};

$.prototype.text = function() {
  const node = this.first();
  return node ? node.textContent : "";
};

$.prototype.find = function(selector) {
  if (!selector) return this;
  const nodes = this.nodes
    .map(node => [...node.querySelectorAll(selector)])
    .flatten(); // So nice :)
  return $(nodes);
};

$.prototype.map = function(callback) {
  return this.nodes.map(callback);
};

$.prototype.trigger = function(type, time = 0) {
  return act(async () => {
    this.map(node => node[type]());
    await new Promise(done => setTimeout(done, time));
  });
};

$.prototype.click = function(...args) {
  const selector = args.find(a => typeof a === "string");
  const time = args.find(a => typeof a === "number");
  return this.find(selector).trigger("click", time);
};

export default $;
