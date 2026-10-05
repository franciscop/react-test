// [INTERNAL USE ONLY]

// In React 16.9 - https://github.com/facebook/react/issues/15379
// TEMPORAL
// This is a fairly experimental implementation, it emulates event propagation
// but doesn't properly handle `e.stopPropagation()`. The nice thing is that
// it can and will await properly for the async callbacks!
import { act } from "react";

import $, { type ReactTest } from "../constructor";

const findParents = (node: Node, list: Node[] = []): Node[] => {
  list.push(node); // add current node
  // do recursion until BODY is reached
  if ((node as Element).tagName !== "BODY")
    return findParents(node.parentNode!, list);
  else return list;
};

// happy-dom hides the own keys of <form>, so take React's key suffix from any node
const getPropsKey = (nodes: Node[]): string | undefined => {
  for (const node of nodes) {
    const key = Object.keys(node).find((k) => /^__react[A-Za-z]+\$/.test(k));
    if (key) return key.replace(/^__react[A-Za-z]+/, "__reactProps");
  }
};

const getEvents = (
  node: Node,
  propsKey?: string,
): Record<string, (...args: any[]) => any> | undefined => {
  const handlers = propsKey && (node as any)[propsKey];
  if (handlers && Object.keys(handlers).length) {
    return handlers;
  }
};

const createEvent = (type: string, props: Record<string, unknown>): Event => {
  const event = new Event(type);
  for (const key in props) {
    Object.defineProperty(event, key, {
      value: props[key],
      enumerable: true,
      configurable: true,
    });
  }
  return event;
};

const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

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
$.prototype.trigger = function (
  this: ReactTest,
  type: string,
  extra: Record<string, unknown> = {},
): Promise<void> {
  // TODO: probably whitelist this
  const propName = `on${capitalize(type)}`.replace(
    /(down|up|left|right|in|out|move)$/i,
    capitalize,
  );
  if (!this.nodes.length) {
    console.warn(`Cannot trigger "${type}" since the selection is empty`);
  }
  return act(async () => {
    await Promise.all(
      this.nodes.map(async (target) => {
        const parents = findParents(target);

        // The events manually registered on the root element
        if (this.events && this.events[type]) {
          const currentTarget = parents[parents.length - 1];
          const event = createEvent(type, { target, currentTarget, ...extra });
          this.events[type].map((cb) => cb(event));
        }

        // If there's a direct way of calling it e.g. `button.click()`
        if ((target as any)[type]) {
          if (type === "click") {
            const event = new MouseEvent("click", {
              bubbles: true,
              cancelable: true,
              ...(extra as MouseEventInit),
            });
            (target as Element).dispatchEvent(event);
          } else if (type === "submit") {
            const event = new Event("submit", {
              bubbles: true,
              cancelable: true,
            });
            (target as Element).dispatchEvent(event);
          } else {
            (target as any)[type](createEvent(type, { target, ...extra }));
          }
        } else {
          const { target: extraTarget, ...restExtra } = extra;
          const eventTarget =
            extraTarget !== null &&
            typeof extraTarget === "object" &&
            !(extraTarget instanceof Node)
              ? {
                  nodeName: (target as Element).nodeName,
                  ...(extraTarget as object),
                }
              : ((extraTarget as Node | undefined) ?? target);
          const propsKey = getPropsKey(parents);
          const events = parents
            .map((el) => [getEvents(el, propsKey), el] as const)
            .filter((ev) => ev[0])
            .map((evts) => [evts[0]![propName], evts[1]] as const)
            .filter((evts) => evts[0])
            .map(([cb, currentTarget]) =>
              cb(
                createEvent(type, {
                  target: eventTarget,
                  currentTarget,
                  ...restExtra,
                }),
              ),
            );
          await Promise.all(events);
        }
      }),
    );
  }) as unknown as Promise<void>;
};
