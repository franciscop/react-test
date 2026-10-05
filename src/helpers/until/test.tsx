import { useEffect, useState } from "react";
import $, { until } from "../../";

describe("until()", () => {
  it("resolves immediately when empty", async () => {
    const init = Date.now();
    await until();
    expect(Date.now() - init).toBeLessThan(100);
  });

  it("passes fast with true", async () => {
    const init = Date.now();
    await until(() => true);
    expect(Date.now() - init).toBeLessThan(100);
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
    const obj = { is: (param: string) => (pass ? param : false) };
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
      return <div className={out ? "active" : undefined}>Blah</div>;
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
          <div className={out ? "active" : undefined}>Blah</div>
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
          <div className={out ? "active" : undefined}>Blah</div>
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
          <div className={out ? "active" : undefined}>Blah</div>
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

  it("doesn't produce act() warnings for async useEffect state updates", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const Component = () => {
      const [data, setData] = useState<string | null>(null);
      useEffect(() => {
        (async () => {
          const result = await Promise.resolve("done");
          setData(result);
        })();
      }, []);
      return <div>{data ?? "loading"}</div>;
    };

    const comp = $(<Component />);
    expect(comp.text()).toBe("loading");
    await until(() => comp.text() === "done");
    expect(comp.text()).toBe("done");

    const actWarnings = errorSpy.mock.calls.filter(
      ([msg]: [unknown]) =>
        typeof msg === "string" && msg.includes("not wrapped in act"),
    );
    expect(actWarnings).toHaveLength(0);
    errorSpy.mockRestore();
  });

  it("wraps the first cb() call in act() to avoid React state update warnings", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    let trigger: (val: boolean) => void = () => {};
    const Component = () => {
      const [, setState] = useState(false);
      trigger = setState;
      return <div />;
    };
    $(<Component />);

    // cb immediately returns true (no looping) but triggers a setState,
    // which requires act() wrapping to avoid the React warning
    await until(() => {
      trigger(true);
      return true;
    });

    const actWarnings = errorSpy.mock.calls.filter(
      ([msg]: [unknown]) =>
        typeof msg === "string" && msg.includes("not wrapped in act"),
    );
    expect(actWarnings).toHaveLength(0);

    errorSpy.mockRestore();
  });

  it("times out a callback", async () => {
    await expect(until(() => false, { timeout: 100 })).rejects.toThrow(
      "until(() => false) timed out after 100ms",
    );
  });

  it("times out a chain, naming it", async () => {
    const $list = $(<ul className="list" />);
    await expect(until($list, { timeout: 100 }).find("li")).rejects.toThrow(
      'until(<ul class="list">).find("li") timed out after 100ms',
    );
  });

  it("uses until.timeout by default", async () => {
    const original = until.timeout;
    until.timeout = 100;
    try {
      await expect(until(() => false)).rejects.toThrow("timed out after 100ms");
    } finally {
      until.timeout = original;
    }
  });

  it("leaves act() usable after a timeout", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(until(() => false, { timeout: 100 })).rejects.toThrow();

    const Counter = () => {
      const [count, setCount] = useState(0);
      return <button onClick={() => setCount(count + 1)}>{count}</button>;
    };
    const $counter = $(<Counter />);
    await $counter.click();
    expect($counter).toHaveText("1");

    const overlapping = errorSpy.mock.calls.filter(
      ([msg]: [unknown]) =>
        typeof msg === "string" && msg.includes("overlapping"),
    );
    expect(overlapping).toHaveLength(0);
    errorSpy.mockRestore();
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
