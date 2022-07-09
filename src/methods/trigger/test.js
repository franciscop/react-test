import React, { useState } from "react";
import $ from "../../";
import "babel-polyfill";

describe(".trigger()", () => {
  it("handles a simple input", async () => {
    const onClick = jest.fn();
    const button = $(<button onClick={onClick}>Hello</button>);
    expect(onClick).not.toBeCalled();
    await button.trigger("click", { clientX: 100, clientY: 100 });
    expect(onClick).toBeCalled();
    expect(onClick.mock.calls[0][0].clientX).toBe(100);
    expect(onClick.mock.calls[0][0].clientY).toBe(100);
  });

  it("can test drawing on a card", async () => {
    const DrawableCard = () => {
      const [active, setActive] = useState(false);
      const [init, setInit] = useState({ x: 0, y: 0 });
      const [diff, setDiff] = useState({ x: 0, y: 0 });
      return (
        <div
          onMouseDown={(e) => {
            setActive(true);
            setInit({ x: e.clientX, y: e.clientY });
          }}
          onMouseUp={() => setActive(false)}
          onMouseMove={(e) => {
            if (!active) return;
            setDiff({ x: e.clientX - init.x, y: e.clientY - init.y });
          }}
          className={"card " + (active ? "active" : "")}
        >
          {diff.x},{diff.y}
        </div>
      );
    };

    const card = $(<DrawableCard />);
    expect(card).toHaveText("0,0");
    expect(card).not.toMatchSelector(".active");

    await card.trigger("mousedown", { clientX: 50, clientY: 50 });
    expect(card).toMatchSelector(".active");
    expect(card).toHaveText("0,0");

    await card.trigger("mousemove", { clientX: 100, clientY: 50 });
    expect(card).toMatchSelector(".active");
    expect(card).toHaveText("50,0");

    await card.trigger("mouseup");
    expect(card).not.toMatchSelector(".active");
    expect(card).toHaveText("50,0");
  });
});
