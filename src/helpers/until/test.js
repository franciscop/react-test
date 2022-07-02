import React, { useState } from "react";
import $, { until } from "../../";
import "babel-polyfill";

describe("until()", () => {
  it("resolves immediately when empty", async () => {
    const init = new Date();
    await until();
    expect(new Date() - init).toBeLessThan(100);
  });

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

  it("works with inside chaining", async () => {
    const Timer = () => {
      const [out, setOut] = useState(false);
      if (!out) setTimeout(() => setOut(true), 100);
      return (
        <div>
          <div className={out ? "active" : null}>Blah</div>
        </div>
      );
    };
    const timer = $(<Timer />);

    expect(timer.children().is(".active")).toBe(false);
    const res = await until(() => timer.children().is(".active"));
    expect(timer.children().is(".active")).toBe(true);
    expect(res).toBe(true);
  });

  it("works with chaining OUTSIDE of it", async () => {
    const Timer = () => {
      const [out, setOut] = useState(false);
      if (!out) setTimeout(() => setOut(true), 100);
      return (
        <div>
          <div className={out ? "active" : null}>Blah</div>
        </div>
      );
    };
    const timer = $(<Timer />);

    expect(timer.children().is(".active")).toBe(false);
    const res = await until(timer).children().is(".active");
    expect(timer.children().is(".active")).toBe(true);
    expect(res).toBe(true);
  });

  it("works with 'find'", async () => {
    const Timer = () => {
      const [out, setOut] = useState(false);
      if (!out) setTimeout(() => setOut(true), 100);
      return (
        <div>
          <div className={out ? "active" : null}>Blah</div>
        </div>
      );
    };
    const timer = $(<Timer />);

    expect(timer.children().is(".active")).toBe(false);
    // Note: res here is the value from the resolved ".find()"
    const res = await until(timer).find(".active");
    expect(timer.children().is(".active")).toBe(true);
    expect(res).toHaveHtml('<div class="active">Blah</div>');
  });

  it("works with a checkbox", async () => {
    const Checkbox = () => {
      const [checked, setChecked] = useState(false);
      if (!checked) setTimeout(() => setChecked(true), 100);
      return <input type="checkbox" checked={checked} readOnly />;
    };
    const box = $(<Checkbox />);

    expect(box.is(":checked")).toBe(false);
    await until(box).is(":checked");
    expect(box.is(":checked")).toBe(true);
  });
});
