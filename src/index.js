// In React 16.9 - https://github.com/facebook/react/issues/15379
import toHtml from "./json-to-html.js";
import render from "./render";

const $ = function(obj) {
  if (!(this instanceof $)) return new $(obj);
  this.nodes = render(obj);
  return this;
};

$.prototype.first = function() {
  return this.nodes[0];
};

$.prototype.last = function() {
  return this.nodes[this.nodes.length - 1];
};

$.prototype.attr = function(key) {
  return this.first().getAttribute(key);
};

$.prototype.html = function() {
  return this.first().outerHTML;
};

$.prototype.text = function() {
  return this.first().textContent;
};

$.prototype.find = function(selector) {
  if (!selector) return this;
  const nodes = this.nodes
    .map(node => [...node.querySelectorAll(selector)])
    .flatten();
  return $(nodes);
};

$.prototype.map = function(callback) {
  return this.nodes.map(callback);
};

$.prototype.trigger = function(type) {
  return this.map(node => node[type]());
};

$.prototype.click = function(selector) {
  return this.find(selector).trigger("click");
};

export default $;
