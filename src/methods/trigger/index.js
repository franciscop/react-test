// In React 16.9 - https://github.com/facebook/react/issues/15379
// TEMPORAL
// This is a fairly experimental implementation, it emulates event propagation
// but doesn't properly handle `e.stopPropagation()`. The nice thing is that
// it can and will await properly for the async callbacks!
import { act } from "react-dom/test-utils";

import $ from "../constructor";

const findParents = (node, list = []) => {
  list.push(node); // add current node
  // do recursion until BODY is reached
  if (node.tagName !== "BODY") return findParents(node.parentNode, list);
  else return list;
};

const getEvents = node => {
  if (!node) return null;
  let handlers = Object.entries(node)
    .filter(([k]) => /^__reactProps/.test(k))
    .map(p => p[1])[0];
  if (handlers && Object.keys(handlers).length) return handlers;
  handlers = Object.entries(node)
    .filter(([k]) => /^__reactEventHandlers/.test(k))
    .filter(Boolean)[0];
  if (!handlers) return null;
  return handlers[1];
};

$.prototype.trigger = function(type, time = 0) {
  const propName = `on${type[0].toUpperCase() + type.slice(1)}`;

  return act(async () => {
    await Promise.all(
      this.map(async node => {
        const callbacks = findParents(node)
          .map(el => getEvents(el))
          .filter(Boolean)
          .map(events => events[propName])
          .filter(Boolean);

        if (this.events && this.events[type]) {
          this.events[type].map(cb => cb());
        }

        await Promise.all(callbacks.map(cb => cb()));
      })
    );
    await new Promise(done => setTimeout(done, time));
  });
};
