import React, { useEffect, useState } from "react";
import $ from "../../";
import "babel-polyfill";

const Demo = ({ className }) => <div className={className}>world</div>;

describe(".render()", () => {
  it("can render a simple string", async () => {
    expect($(<Demo />)).toHaveHtml("<div>world</div>");
  });

  it("can render with new data", async () => {
    const demo = $(<Demo className="hello" />);
    expect(demo).toHaveHtml(`<div class="hello">world</div>`);
    demo.render(<Demo className="bye" />);
    expect(demo).toHaveHtml(`<div class="bye">world</div>`);
  });

  it("has continuity", () => {
    const Demo = ({ className }) => {
      const [state, setState] = useState(0);
      useEffect(() => {
        setState((s) => s + 1);
      }, [className]);
      return <div>{state}</div>;
    };
    const demo = $(<Demo className="hello" />);
    expect(demo).toHaveText(`1`);
    demo.render(<Demo className="bye" />);
    expect(demo).toHaveText(`2`);
  });

  it("can render a different component", () => {
    const demo = $(<div>Hello</div>);
    expect(demo).toHaveHtml(`<div>Hello</div>`);
    demo.render(<span>Bye</span>);
    expect(demo).toHaveHtml(`<span>Bye</span>`);
  });
});
