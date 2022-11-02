// [INTERNAL USE ONLY]

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

const getEvents = (node) => {
  const handlers = Object.entries(node)
    .filter(([k]) => /^__reactProps/.test(k))
    .map((p) => p[1])
    .shift();
  if (handlers && Object.keys(handlers).length) {
    return handlers;
  }
};

const merge = (objs) => {
  const props = {};
  // Merge recursively
  objs.forEach((obj) => {
    for (let key in obj) {
      if (props[key]) {
        for (let subKey in obj[key]) {
          props[key][subKey] = obj[key][subKey];
        }
      } else {
        props[key] = obj[key];
      }
    }
  });
  return props;
};

const createEvent = (type, ...objs) => {
  const props = merge([...objs]);
  const event = new Event(type);
  for (let key in props) {
    Object.defineProperty(event, key, {
      value: props[key],
      enumerable: true,
      configurable: true,
    });
  }
  return event;
};

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

/**
 * Simulates an event happening on all the matched elements. It should be awaited for the side effects to run and the component to re-rendered:
 *
 * ```js
 * const fn = jest.fn();
 * const canvas = $(<canvas onClick={fn}></canvas>);
 * await canvas.trigger("click", { clientX: 10, clientY: 20 });
 * const event = fn.mock.calls[0][0];
 * expect(event).toMatchObject({ clientX: 10, clientY: 20 });
 * ```
 *
 * **[→ Full .trigger() Docs](https://react-test.dev/documentation#trigger)**
 */
$.prototype.trigger = function (type, extra = {}) {
  // TODO: probably whitelist this
  const propName = `on${capitalize(type)}`.replace(
    /(down|up|left|right|in|out|move)$/i,
    capitalize
  );
  return act(async () => {
    await Promise.all(
      this.map(async (target) => {
        const parents = findParents(target);

        // The events manually registered on the root element
        if (this.events && this.events[type]) {
          const currentTarget = parents[parents.length - 1];
          const event = createEvent(type, { target, currentTarget, ...extra });
          this.events[type].map((cb) => cb(event));
          return;
        }

        // If there's a direct way of calling it e.g. `button.click()`
        if (target[type]) {
          if (type === "click") {
            const event = new MouseEvent("click", {
              bubbles: true,
              cancelable: true,
              ...extra,
            });
            target.dispatchEvent(event);
          } else {
            target[type](createEvent(type, { target, ...extra }));
          }
        } else {
          const events = parents
            .map((el) => [getEvents(el), el])
            .filter((ev) => ev[0])
            .map((evts) => [evts[0][propName], evts[1]])
            .filter((evts) => evts[0])
            .map(([cb, target]) => cb(createEvent(type, { target, ...extra })));
          await Promise.all(events);
        }
      })
    );
  });
};
