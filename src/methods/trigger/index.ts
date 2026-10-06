import { act } from "react";

import { setNative } from "../../helpers/index";
import $, { type ReactTest } from "../constructor";

// React listens for these native events instead of the ones named in its props
const ALIASES: Record<string, string> = {
  doubleclick: "dblclick",
  mouseenter: "mouseover",
  mouseleave: "mouseout",
  focus: "focusin",
  blur: "focusout",
};

const CLASSES: Record<string, string> = {
  key: "KeyboardEvent",
  mouse: "MouseEvent",
  click: "MouseEvent",
  dblclick: "MouseEvent",
  contextmenu: "MouseEvent",
  pointer: "PointerEvent",
  focus: "FocusEvent",
  wheel: "WheelEvent",
  touch: "TouchEvent",
  drag: "DragEvent",
  drop: "DragEvent",
  input: "InputEvent",
};

const createEvent = (type: string, init: Record<string, unknown>) => {
  // Fall back to a plain Event when the DOM lacks the class, like TouchEvent
  const prefix = Object.keys(CLASSES).find((p) => type.startsWith(p));
  const Ctor = (prefix && (globalThis as any)[CLASSES[prefix]]) || Event;
  const event = new Ctor(type, { bubbles: true, cancelable: true });
  for (const key in init) {
    Object.defineProperty(event, key, { value: init[key] });
  }
  return event;
};

const getPropsKey = (nodes: any[]): string | undefined => {
  for (const node of nodes) {
    const key = Object.keys(node).find((k) => /^__react[A-Za-z]+\$/.test(k));
    if (key) return key.replace(/^__react[A-Za-z]+/, "__reactProps");
  }
};

// Swap the handlers up the tree for ones that record the promises they return
const dispatch = (target: any, event: Event): unknown[] => {
  const promises: unknown[] = [];
  const nodes: any[] = [];
  for (let n = target; n; n = n.parentNode) nodes.push(n);
  const key = getPropsKey(nodes);
  const swapped: [any, any, any][] = [];
  for (const node of key ? nodes : []) {
    const props = node[key!];
    if (!props) continue;
    const copy = { ...props };
    for (const name in props) {
      const fn = props[name];
      if (!/^on[A-Z]/.test(name) || typeof fn !== "function") continue;
      copy[name] = function (this: unknown, ...args: unknown[]) {
        const res = fn.apply(this, args);
        if (res && typeof res.then === "function") promises.push(res);
        return res;
      };
    }
    node[key!] = copy;
    swapped.push([node, props, copy]);
  }
  try {
    target.dispatchEvent(event);
  } finally {
    // A re-render during the event leaves newer props than ours, keep those
    for (const [node, props, copy] of swapped) {
      if (node[key!] === copy) node[key!] = props;
    }
  }
  return promises;
};

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
  if (!this.nodes.length) {
    console.warn(`Cannot trigger "${type}" since the selection is empty`);
  }
  const { target: custom, ...init } = extra as Record<string, any>;
  const name = ALIASES[type.toLowerCase()] ?? type.toLowerCase();
  return (async () => {
    const promises: unknown[] = [];
    await act(async () => {
      for (const node of this.nodes) {
        let target: any = node;
        if (custom && typeof custom.dispatchEvent === "function") {
          target = custom;
          init.target = custom;
        } else if (custom && typeof custom === "object") {
          for (const [k, v] of Object.entries(custom)) setNative(node, k, v);
        }
        promises.push(...dispatch(target, createEvent(name, init)));
      }
    });
    if (!promises.length) return;

    // Short act() calls, since a long one would hold the renders handlers await
    let done = false;
    const settled = Promise.allSettled(promises).then(() => (done = true));
    while (!done) {
      await act(async () => {
        await Promise.race([settled, new Promise((r) => setTimeout(r, 20))]);
      });
    }
    await Promise.all(promises);
  })();
};
