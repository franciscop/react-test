import $ from "../constructor";
// import { act } from "react-dom/test-utils";

$.prototype.is = function(selector = "*") {
  return this.nodes.some(node => node.matches(selector));
};
