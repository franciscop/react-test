import $ from "../constructor";
import { act } from "react-dom/test-utils";

$.prototype.props = function (props) {
  const container = this.nodes[0].closest("#root");
  const component = container.component;
  const root = container.root;
  if (typeof props === "function") {
    props = props(component.props);
  }
  act(() => root.render({ ...component, props }));
  this.nodes = [...container.childNodes];
  return this;
};
