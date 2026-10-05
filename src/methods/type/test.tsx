import { useState } from "react";
import $ from "../../";

describe(".type()", () => {
  it("handles a simple input", async () => {
    const Input = () => {
      const [text, setText] = useState("");
      return <input value={text} onChange={(e) => setText(e.target.value)} />;
    };
    const $input = $(<Input />);
    expect($input).toHaveValue("");
    await $input.type("Francisco");
    expect($input).toHaveValue("Francisco");
  });

  it("can attach and click on children", async () => {
    // e.target is the live input, so read its value inside the handler
    const values: string[] = [];
    const $input = $(<input onChange={(e) => values.push(e.target.value)} />);
    await $input.type("Hello");
    expect(values).toEqual(["H", "He", "Hel", "Hell", "Hello"]);
  });

  const Greeter = () => {
    const [name, setName] = useState("");
    return (
      <div>
        Hello {name || "Anonymous"}
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
    );
  };
  it("can type in an input", async () => {
    const $greet = $(<Greeter />);
    expect($greet.text()).toBe("Hello Anonymous");
    await $greet.find("input").type("Francisco");
    expect($greet.text()).toBe("Hello Francisco");
  });

  it("can use Jest's matcher", async () => {
    const $input = $(<Greeter />).find("input");
    expect($input).toHaveValue("");
    await $input.type("Francisco");
    expect($input).toHaveValue("Francisco");
  });

  it("works with uncontrolled inputs", async () => {
    const input = $(<input defaultValue="hello" />);
    expect(input).toHaveValue("hello");
    await input.type("Francisco");
    expect(input).toHaveValue("Francisco");
  });

  it("warns once on an empty selection", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const $empty = $(<div />).find("input");
    await $empty.type("hello");
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith(
      'Cannot type "hello" since the selection is empty',
    );
    warn.mockRestore();
  });

  describe("readme", () => {
    it("can simulate typing in an input", async () => {
      const input = $(<input />);
      expect(input).toHaveValue("");
      await input.type("Francisco");
      expect(input).toHaveValue("Francisco");
    });
  });
});
