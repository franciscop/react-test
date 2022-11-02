import React, { useEffect, useState } from "react";
import $ from "../../";
import "babel-polyfill";

describe(".trigger()", () => {
  it("handles a simple input", async () => {
    const onClick = jest.fn();
    const button = $(<button onClick={onClick}>Hello</button>);
    expect(onClick).not.toBeCalled();
    await button.trigger("click", { clientX: 100, clientY: 200 });
    expect(onClick).toBeCalled();
    const event = onClick.mock.calls[0][0];
    expect(event).toMatchObject({ clientX: 100, clientY: 200 });
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

  it("can simulate clicking a div in a specific place", async () => {
    const fn = jest.fn();
    const canvas = $(<canvas onClick={fn}></canvas>);
    expect(fn).not.toBeCalled();
    await canvas.trigger("click", { clientX: 10, clientY: 20 });
    expect(fn).toBeCalled();
    const event = fn.mock.calls[0][0];
    expect(event.clientX).toBe(10);
    expect(event.clientY).toBe(20);
    expect(event.target.nodeName).toBe("CANVAS");
  });

  const Demo = ({ onDown }) => {
    useEffect(() => {
      window.addEventListener("keydown", onDown);
      return () => window.removeEventListener("keydown", onDown);
    }, [onDown]);
    return <div>Hello</div>;
  };

  it("can trigger clicks even from the window", async () => {
    const onDown = jest.fn();
    const demo = $(<Demo onDown={onDown} />);
    expect(onDown).not.toBeCalled();

    await demo.trigger("keydown", { key: "x" });
    expect(onDown).toBeCalled();

    const event = onDown.mock.calls[0][0];
    expect(event.key).toBe("x");
  });

  it("can customize the target to window", async () => {
    const onDown = jest.fn();
    const demo = $(<Demo onDown={onDown} />);
    expect(onDown).not.toBeCalled();
    await demo.trigger("keydown", { key: "x", target: window });
    expect(onDown).toBeCalled();
    const event = onDown.mock.calls[0][0];
    expect(event.key).toBe("x");
    expect(event.target).toBe(window);
  });

  it("can customize the target to body", async () => {
    const onDown = jest.fn();

    const demo = $(<Demo onDown={onDown} />);
    expect(onDown).not.toBeCalled();
    await demo.trigger("keydown", { key: "x", target: window.document.body });
    expect(onDown).toBeCalled();

    const event = onDown.mock.calls[0][0];
    expect(event.target).toBe(window.document.body);
    expect(event.key).toBe("x");
    expect(event.target.nodeName).toBe("BODY");
  });
});
