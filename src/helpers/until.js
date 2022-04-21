import { act } from "react-dom/test-utils";
const delay = (time) => new Promise((done) => setTimeout(done, time));

const untilCallback = async (cb) => {
  let value = await cb();
  while (!value) {
    await act(async () => {
      await delay(50);
      value = await cb();
    });
  }
  return value;
};

const execute = (obj, chain) => {
  let newObj = obj;
  for (let [key, args] of chain) {
    newObj = newObj[key](...args);
  }
  return newObj;
};

// Store the action chain in an object, and execute it when we find '.then'
const untilObject = (obj) => {
  const chain = [];
  const getter = (target, key) => {
    if (key === "then") {
      return async (cb) => {
        let res;
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
      return (...args) => {
        chain.push([key, args]);
        return new Proxy(obj, { get: getter });
      };
    }
  };
  return new Proxy(obj, { get: getter });
};

const until = (arg) => {
  if (typeof arg === "function") {
    return untilCallback(arg);
  }
  if (typeof arg === "object") {
    return untilObject(arg);
  }
};

export default until;
