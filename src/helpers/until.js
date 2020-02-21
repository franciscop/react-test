import { act } from "react-dom/test-utils";
const delay = time => new Promise(done => setTimeout(done, time));

const untilCallback = cb => {
  return new Promise(async done => {
    let value = await cb();
    while (!value) {
      await act(async () => {
        await delay(50);
        value = await cb();
      });
    }
    done(value);
  });
};

const untilObject = obj => {
  const getter = (target, key) => {
    return (...args) => untilCallback(() => obj[key](...args));
  };
  return new Proxy(obj, { get: getter });
};

const until = arg => {
  if (typeof arg === "function") {
    return untilCallback(arg);
  }
  if (typeof arg === "object") {
    return untilObject(arg);
  }
};

export default until;
