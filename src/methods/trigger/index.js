// In React 16.9 - https://github.com/facebook/react/issues/15379
import { act } from "react-dom/test-utils";

import $ from "../constructor";

$.prototype.trigger = function(type, time = 0) {
  return act(async () => {
    this.map(node => node[type]());
    await new Promise(done => setTimeout(done, time));
  });
};
