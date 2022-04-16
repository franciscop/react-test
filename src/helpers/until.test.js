import React, { useState } from "react";
import $, { until } from "../";
import "babel-polyfill";

describe("until()", () => {
  it("passes fast with true", async () => {
    const init = new Date();
    await until(() => true);
    expect(new Date() - init).toBeLessThan(100);
  });

  it("works with a callback", async () => {
    let pass = false;
    setTimeout(() => {
      pass = true;
    }, 100);
    expect(pass).toBe(false);
    await until(() => pass);
    expect(pass).toBe(true);
  });

  it("works with an object", async () => {
    let pass = false;
    const obj = { is: (param) => (pass ? param : false) };
    setTimeout(() => {
      pass = true;
    }, 100);

    expect(pass).toBe(false);
    await until(obj).is("abc");
    expect(pass).toBe(true);
  });

  it("works with a component", async () => {
    const Timer = () => {
      const [out, setOut] = useState(false);
      if (!out) setTimeout(() => setOut(true), 100);
      return <div className={out ? "active" : null}>Blah</div>;
    };
    const timer = $(<Timer />);

    expect(timer.is(".active")).toBe(false);
    await until(timer).is(".active");
    expect(timer.is(".active")).toBe(true);
  });
});
