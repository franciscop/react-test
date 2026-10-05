import { act } from "react";
import getPlainTag from "../getPlainTag";

const delay = (time: number) =>
  new Promise<void>((done) => setTimeout(done, time));

const timeoutError = (label: string, timeout: number) =>
  new Error(`${label} timed out after ${timeout}ms`);

const callbackLabel = (cb: () => unknown) => {
  const src = String(cb).replace(/\s+/g, " ");
  return `until(${src.length > 60 ? src.slice(0, 57) + "..." : src})`;
};

const chainLabel = (obj: any, chain: [string, unknown[]][]) => {
  const root = obj?.nodes?.[0]?.tagName ? getPlainTag(obj.nodes[0]) : "object";
  const calls = chain.map(([key, args]) => {
    const list = args.map((a) =>
      typeof a === "string" ? `"${a}"` : String(a),
    );
    return `.${key}(${list.join(", ")})`;
  });
  return `until(${root})${calls.join("")}`;
};

const untilCallback = async (cb: () => unknown, timeout: number) => {
  const start = Date.now();
  let value = await act(async () => await cb());
  while (!value) {
    if (Date.now() - start >= timeout) {
      throw timeoutError(callbackLabel(cb), timeout);
    }
    await act(async () => {
      await delay(50);
      value = await cb();
    });
  }
  return value;
};

const execute = (obj: any, chain: [string, unknown[]][]) => {
  let newObj = obj;
  for (const [key, args] of chain) {
    newObj = newObj[key](...args);
  }
  return newObj;
};

// Store the action chain in an object, and execute it when we find '.then'
const untilObject = (obj: any, timeout: number) => {
  const chain: [string, unknown[]][] = [];
  const wait = async () => {
    const start = Date.now();
    let res: any;
    while (!res) {
      if (Date.now() - start >= timeout) {
        throw timeoutError(chainLabel(obj, chain), timeout);
      }
      await act(async () => {
        await delay(50);
        res = execute(obj, chain);

        // If it's an object that looks like an instance, we want to ignore
        // the cases where there are no matched nodes and keep looping then
        if (res && res.nodes && !res.nodes.length) {
          res = false;
        }
      });
    }
    return res;
  };
  const getter = (_target: any, key: string) => {
    if (key === "then") {
      return (
        resolve: (res: any) => unknown,
        reject: (e: unknown) => unknown,
      ) => wait().then(resolve, reject);
    } else {
      return (...args: unknown[]) => {
        chain.push([key, args]);
        return new Proxy(obj, { get: getter });
      };
    }
  };
  return new Proxy(obj, { get: getter });
};

/**
 * Wait until the specified condition is fulfilled. Use this whenever a
 * component updates asynchronously: data fetching, timers, animations, etc.
 *
 * ```js
 * // Wait for a callback to return truthy
 * await until(() => $demo.text() === "Loaded");
 *
 * // Wait for an element to match a CSS selector
 * await until($button).is(".active");
 *
 * // Wait for children to appear
 * await until($list).find("li");
 * ```
 *
 * Works with components that load data asynchronously:
 *
 * ```js
 * const $demo = $(<UserProfile id={1} />);
 * expect($demo).toHaveText("Loading...");
 * await until(() => $demo.text() !== "Loading...");
 * expect($demo).toHaveText("Alice");
 * ```
 *
 * It fails after `until.timeout` milliseconds (1000 by default), or after the
 * `timeout` option for a single call:
 *
 * ```js
 * await until(() => $demo.text() === "Loaded", { timeout: 3000 });
 * ```
 *
 * **[→ Full until() Docs](https://react-test.dev/documentation#until)**
 */
export default function until(
  arg?: (() => unknown) | object,
  options: { timeout?: number } = {},
) {
  const timeout = options.timeout ?? until.timeout;
  if (typeof arg === "function") {
    return untilCallback(arg as () => unknown, timeout);
  }
  if (typeof arg === "object") {
    return untilObject(arg, timeout);
  }
}

until.timeout = 1000;
