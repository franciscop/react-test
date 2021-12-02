import $ from '../constructor';

$.prototype.filter = function (selector) {
  if (!selector) return [...this];
  return this.toArray().filter((node) => node.matches(selector));
};
