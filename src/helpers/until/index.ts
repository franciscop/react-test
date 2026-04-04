import { act } from "react";
const delay = (time: number) =>
  new Promise<void>((done) => setTimeout(done, time));

const untilCallback = async (cb: () => unknown) => {
  let value = await cb();
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
  const getter = (target: any, key: string) => {
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
 * Wait until the specified condition is fulfilled. There are multiple ways of specifying the conditions:
 *
 * ```js
 * await until(() => new Date() - init > 1000);
 * await until(button).is(".active");
 * await until(list).find("li");
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
