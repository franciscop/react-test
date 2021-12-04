import $ from '../constructor';

$.prototype.parent = function () {
  return [...this.map((node) => node.parentNode)];
};
