import { act } from "react";
const delay = (time: number) =>
  new Promise<void>((done) => setTimeout(done, time));

const untilCallback = async (cb: () => unknown) => {
  let value = await act(async () => await cb());
  while (!value) {
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
const untilObject = (obj: any) => {
  const chain: [string, unknown[]][] = [];
  const getter = (_target: any, key: string) => {
    if (key === "then") {
      return async (cb: (res: any) => unknown) => {
        let res: any;
        while (!res) {
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
        return cb(res);
      };
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
 * component updates asynchronously — data fetching, timers, animations, etc.
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
 * **[→ Full until() Docs](https://react-test.dev/documentation#until)**
 */
export default function until(arg?: (() => unknown) | object) {
  if (typeof arg === "function") {
    return untilCallback(arg as () => unknown);
  }
  if (typeof arg === "object") {
    return untilObject(arg);
  }
}
