import $ from "../constructor";
import { act } from "react-dom/test-utils";

$.prototype.render = function (component) {
  const container = this.nodes[0].closest("#root");
  const root = container.root;
  act(() => root.render(component));
  this.nodes = [...container.childNodes];
  return this;
};
