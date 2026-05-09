import { useEffect } from "react";
import $ from "../";
import { until } from "../";

describe("constructor", () => {
  it("can render a component that returns null", () => {
    const NullComp = () => null;
    const $result = $(<NullComp />);
    expect($result.length).toBe(0);
    expect($result.html()).toBe("");
  });

  it("stops calling the callback after unmount", async () => {
    let count = 0;
    const Comp = () => {
      useEffect(() => {
        const id = setInterval(() => count++, 10);
        return () => clearInterval(id);
      }, []);
      return null;
    };
    const $comp = $(<Comp />);
    await until(() => count >= 3);
    $comp.render(null);
    const snapshot = count;
    await new Promise((r) => setTimeout(r, 100));
    expect(count).toBe(snapshot);
  });

  it("stops calling the callback after render(null) on a visible component", async () => {
    let count = 0;
    const Comp = () => {
      useEffect(() => {
        const id = setInterval(() => count++, 10);
        return () => clearInterval(id);
      }, []);
      return <div>hello</div>;
    };
    const $comp = $(<Comp />);
    await until(() => count >= 3);
    $comp.render(null);
    const snapshot = count;
    await new Promise((r) => setTimeout(r, 100));
    expect(count).toBe(snapshot);
  });

  it("can re-render a component that returned null", () => {
    const Comp = () => null;
    const $comp = $(<Comp />);
    $comp.render(<div>hello</div>);
    expect($comp.html()).toBe("<div>hello</div>");
  });

  it("unmounts the previous root so its effect cleanup runs", () => {
    let cleaned = false;
    const WithListener = () => {
      useEffect(() => {
        const handler = () => {};
        document.addEventListener("click", handler);
        return () => {
          document.removeEventListener("click", handler);
          cleaned = true;
        };
      }, []);
      return <div>first</div>;
    };

    $(<WithListener />);
    expect(cleaned).toBe(false);

    $(<div>second</div>);
    expect(cleaned).toBe(true);
  });
});

describe("Iterator", () => {
  it("has the correct names", () => {
    const $button = $(<button>Hello</button>);
    expect($button.constructor.name).toBe("ReactTest");
  });

  it("can convert to an array with destructuring", () => {
    const list = $(
      <ul>
        <li>A</li>
        <li>B</li>
      </ul>,
    );
    const len = list.find("li").length;
    expect(len).toBe(2);
    expect(list.find("li")).toHaveLength(2);
    expect(list.find("li").array((el) => el.nodeName)).toEqual(["LI", "LI"]);
  });

  it("can iterate the values with for...of", () => {
    const html = $(
      <ul>
        <li>A</li>
        <li>B</li>
      </ul>,
    );
    let total = 0;
    for (let item of html.find("li")) {
      expect(item.nodeName).toBe("LI");
      total++;
    }
    expect(total).toBe(2);
  });

  it("can wrap the iterable", () => {
    const html = $(
      <ul>
        <li>A</li>
        <li>B</li>
      </ul>,
    );
    let total = 0;
    for (let item of html.find("li")) {
      expect($(item).get(0)!.nodeName).toBe("LI");
      total++;
    }
    expect(total).toBe(2);
  });

  it("can use hooks", () => {
    const CompWithHook = () => {
      useEffect(() => {
        // Nothing going on here
      }, []);
      return <div>Hi</div>;
    };
    const $hooked = $(<CompWithHook />);
    expect($hooked.html()).toBe(`<div>Hi</div>`);
  });

  it("can be double rendered", () => {
    const html = $(<div>Abc</div>);
    expect((html.nodes[0] as HTMLElement).outerHTML).toEqual(`<div>Abc</div>`);
    expect(html.nodes[0].nodeName).toBe("DIV");
  });
});
