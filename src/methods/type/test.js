import React, { useState } from "react";
import $ from "../../";
import "babel-polyfill";

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
    const onChange = jest.fn();
    const $input = $(<input onChange={onChange} />);
    expect(onChange).not.toBeCalled();
    await $input.type("Hello");
    expect(onChange).toBeCalled();
    // Only written one letter in the first call
    expect(onChange.mock.calls[0][0]).toMatchObject({
      target: { value: "H" },
    });
    // Written all of the letters in the last call
    expect(onChange.mock.calls.pop()[0]).toMatchObject({
      target: { value: "Hello" },
    });
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

  describe("readme", () => {
    it("can simulate typing in an input", async () => {
      const input = $(<input />);
      expect(input).toHaveValue("");
      await input.type("Francisco");
      expect(input).toHaveValue("Francisco");
    });
  });
});
