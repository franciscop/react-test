import { useEffect, useRef, useState } from "react";
import $ from "../../";

describe(".trigger()", () => {
  it("handles a simple input", async () => {
    const onClick = vi.fn();
    const button = $(<button onClick={onClick}>Hello</button>);
    expect(onClick).not.toHaveBeenCalled();
    await button.trigger("click", { clientX: 100, clientY: 200 });
    expect(onClick).toHaveBeenCalled();
    const event = onClick.mock.calls[0][0];
    expect(event).toMatchObject({ clientX: 100, clientY: 200 });
  });

  it("warns on an empty selection", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const $empty = $(<div />).find(".nope");
    await $empty.click();
    expect(warn).toHaveBeenCalledWith(
      'Cannot trigger "click" since the selection is empty',
    );
    warn.mockRestore();
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
    const fn = vi.fn();
    const canvas = $(<canvas onClick={fn}></canvas>);
    expect(fn).not.toHaveBeenCalled();
    await canvas.trigger("click", { clientX: 10, clientY: 20 });
    expect(fn).toHaveBeenCalled();
    const event = fn.mock.calls[0][0];
    expect(event.clientX).toBe(10);
    expect(event.clientY).toBe(20);
    expect(event.target.nodeName).toBe("CANVAS");
  });

  const Demo = ({ onDown }: { onDown: (e: KeyboardEvent) => void }) => {
    useEffect(() => {
      window.addEventListener("keydown", onDown);
      return () => window.removeEventListener("keydown", onDown);
    }, [onDown]);
    return <div>Hello</div>;
  };

  it("can trigger clicks even from the window", async () => {
    const onDown = vi.fn();
    const demo = $(<Demo onDown={onDown} />);
    expect(onDown).not.toHaveBeenCalled();

    await demo.trigger("keydown", { key: "x" });
    expect(onDown).toHaveBeenCalled();

    const event = onDown.mock.calls[0][0];
    expect(event.key).toBe("x");
  });

  it("can customize the target to window", async () => {
    const onDown = vi.fn();
    const demo = $(<Demo onDown={onDown} />);
    expect(onDown).not.toHaveBeenCalled();
    await demo.trigger("keydown", { key: "x", target: window });
    expect(onDown).toHaveBeenCalled();
    const event = onDown.mock.calls[0][0];
    expect(event.key).toBe("x");
    expect(event.target).toBe(window);
  });

  it("can customize the target to body", async () => {
    const onDown = vi.fn();

    const demo = $(<Demo onDown={onDown} />);
    expect(onDown).not.toHaveBeenCalled();
    await demo.trigger("keydown", { key: "x", target: window.document.body });
    expect(onDown).toHaveBeenCalled();

    const event = onDown.mock.calls[0][0];
    expect(event.target).toBe(window.document.body);
    expect(event.key).toBe("x");
    expect(event.target.nodeName).toBe("BODY");
  });

  it("respects stopPropagation()", async () => {
    const parent = vi.fn();
    const $demo = $(
      <div onClick={parent}>
        <button onClick={(e) => e.stopPropagation()}>Hello</button>
      </div>,
    );
    await $demo.find("button").click();
    expect(parent).not.toHaveBeenCalled();
  });

  it("runs capture handlers first", async () => {
    const calls: string[] = [];
    const $demo = $(
      <div onClickCapture={() => calls.push("capture")}>
        <button onClick={() => calls.push("click")}>Hello</button>
      </div>,
    );
    await $demo.find("button").click();
    expect(calls).toEqual(["capture", "click"]);
  });

  it("fires the events React derives from others", async () => {
    const enter = vi.fn();
    const blur = vi.fn();
    const $demo = $(<input onMouseEnter={enter} onBlur={blur} />);
    await $demo.trigger("mouseenter");
    await $demo.trigger("blur");
    expect(enter).toHaveBeenCalledTimes(1);
    expect(blur).toHaveBeenCalledTimes(1);
  });

  it("reaches the document listeners", async () => {
    let key = "";
    const Listener = () => {
      useEffect(() => {
        const onKey = (e: KeyboardEvent) => (key = e.key);
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
      }, []);
      return <input />;
    };
    await $(<Listener />).trigger("keydown", { key: "Escape" });
    expect(key).toBe("Escape");
  });

  it("lets async handlers that wait for a re-render finish", async () => {
    // refresh() only resolves from an effect, after the next render
    const Refresher = () => {
      const [count, setCount] = useState(0);
      const resolvers = useRef<(() => void)[]>([]);
      useEffect(() => {
        resolvers.current.splice(0).forEach((done) => done());
      }, [count]);
      const refresh = () =>
        new Promise<void>((done) => {
          resolvers.current.push(done);
          setCount(count + 1);
        });
      return <button onClick={() => refresh()}>{count}</button>;
    };
    const $button = $(<Refresher />);
    await $button.click();
    expect($button).toHaveText("1");
  });

  it("awaits async handlers", async () => {
    const Async = () => {
      const [text, setText] = useState("idle");
      const onClick = async () => {
        await new Promise((done) => setTimeout(done, 30));
        setText("done");
      };
      return <button onClick={onClick}>{text}</button>;
    };
    const $button = $(<Async />);
    await $button.click();
    expect($button).toHaveText("done");
  });

  it("rejects when an async handler throws", async () => {
    const onClick = async () => {
      await new Promise((done) => setTimeout(done, 10));
      throw new Error("Failed to save");
    };
    const $button = $(<button onClick={onClick}>Save</button>);
    await expect($button.click()).rejects.toThrow("Failed to save");
  });

  it("creates the native event classes", async () => {
    const events: Record<string, Event> = {};
    const $input = $(
      <input
        onKeyDown={(e) => (events.key = e.nativeEvent)}
        onMouseDown={(e) => (events.mouse = e.nativeEvent)}
        onClick={(e) => (events.click = e.nativeEvent)}
        onFocus={(e) => (events.focus = e.nativeEvent)}
        onWheel={(e) => (events.wheel = e.nativeEvent)}
      />,
    );
    await $input.trigger("keydown");
    await $input.trigger("mousedown");
    await $input.click();
    await $input.trigger("focus");
    await $input.trigger("wheel");
    expect(events.key).toBeInstanceOf(KeyboardEvent);
    expect(events.mouse).toBeInstanceOf(MouseEvent);
    expect(events.click).toBeInstanceOf(MouseEvent);
    expect(events.focus).toBeInstanceOf(FocusEvent);
    expect(events.wheel).toBeInstanceOf(WheelEvent);
  });

  it("keeps the native defaults for fields that are not passed", async () => {
    let event: any;
    const $div = $(<div onMouseDown={(e) => (event = e.nativeEvent)} />);
    await $div.trigger("mousedown", { clientY: 20 });
    expect(event.clientX).toBe(0);
    expect(event.clientY).toBe(20);
    expect(event.button).toBe(0);
  });

  it("falls back to a plain Event when the DOM lacks the class", async () => {
    vi.stubGlobal("DragEvent", undefined);
    try {
      let event: any;
      const $div = $(<div onDragStart={(e) => (event = e.nativeEvent)} />);
      await $div.trigger("dragstart", { clientX: 5 });
      expect(event).toBeInstanceOf(Event);
      expect(event.clientX).toBe(5);
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
