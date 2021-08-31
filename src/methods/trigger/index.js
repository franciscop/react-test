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
    .map(p => p[1])
    .shift();
  if (handlers && Object.keys(handlers).length) {
    return handlers;
  }
  handlers = Object.entries(node)
    .filter(([k]) => /^__reactEventHandlers/.test(k))
    .filter(Boolean)[0];
  if (!handlers) return null;
  return handlers[1];
};

$.prototype.trigger = function(type, time = 0) {
  // return act(async () => {
  //   // Handle the document.addEventListener() && window.addEventListener() events
  //   const createEvent = (type, base, node) => {
  //     const event = new Event(type);
  //     Object.defineProperty(event, "target", { value: node });
  //     Object.defineProperty(event, "currentTarget", { value: base });
  //     return event;
  //   };
  //
  //   if (this.events && this.events[type]) {
  //     const body = findParents(this.nodes[0]).pop();
  //     this.events[type].map(cb => cb(createEvent(type, body, body)));
  //   }
  //
  //   // Handle the rest of normal events
  //   this.map(node => {
  //     const event = new this.window.Event(type, { bubbles: true });
  //     node.dispatchEvent(event);
  //   });
  //
  //   await new Promise(done => setTimeout(done, time));
  // });

  const propName = `on${type[0].toUpperCase() + type.slice(1)}`;

  return act(async () => {
    await Promise.all(
      this.map(async node => {
        const createEvent = base => {
          const event = new Event(type);
          Object.defineProperty(event, "target", { value: node });
          Object.defineProperty(event, "currentTarget", { value: base });
          return event;
        };
        const parents = findParents(node);

        if (this.events && this.events[type]) {
          const body = parents[parents.length - 1];
          this.events[type].map(cb => cb(createEvent(body)));
        }

        if (node[type]) {
          node[type](createEvent(node));
        } else {
          await Promise.all(
            parents
              .map(el => [getEvents(el), el])
              .filter(ev => ev[0])
              .map(evts => [evts[0][propName], evts[1]])
              .filter(evts => evts[0])
              .map(([cb, el]) => cb(createEvent(el)))
          );
        }
      })
    );
    await new Promise(done => setTimeout(done, time));
  });
};
