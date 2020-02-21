import render from "./render";
import { act } from "react-dom/test-utils";

const $ = function(obj) {
  if (!(this instanceof $)) return new $(obj);
  act(() => {
    this.nodes = render(obj);
  });
  return this;
};

export default $;
