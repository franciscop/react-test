import React, { useEffect, useState } from "react";
import $ from "../../";
import "babel-polyfill";

const Demo = ({ className }) => <div className={className}>world</div>;

describe(".props()", () => {
  it("can render a simple string", async () => {
    expect($(<Demo />)).toHaveHtml("<div>world</div>");
  });

  it("can inject new props", async () => {
    const demo = $(<Demo className="hello" />);
    expect(demo).toHaveHtml(`<div class="hello">world</div>`);
    demo.props({ className: "bye" });
    expect(demo).toHaveHtml(`<div class="bye">world</div>`);
  });

  it("can accept the old props", async () => {
    const demo = $(<Demo className="hello" />);
    expect(demo).toHaveHtml(`<div class="hello">world</div>`);
    demo.props((p) => ({ className: p.className + "-bye" }));
    expect(demo).toHaveHtml(`<div class="hello-bye">world</div>`);
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
    demo.props({ className: "bye" });
    expect(demo).toHaveText(`2`);
  });
});
