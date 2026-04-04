// Signup.test.js;
import React from "react";
import $ from "../../";
import Signup from "./Signup";

describe("Signup.js", () => {
  it("can be submitted empty", async () => {
    const cb = jest.fn();
    const form = $(<Signup onSubmit={cb} />);

    expect(cb).not.toHaveBeenCalled();
    await form.submit();
    expect(cb).toHaveBeenCalledWith({ username: "", option: "a" });
  });

  it("can modify each of the fields properly", async () => {
    const cb = jest.fn();
    const form = $(<Signup onSubmit={cb} />);

    await form.find('[type="text"]').type("hello");
    await form.find('[type="checkbox"]').click();
    await form.find('[type="radio"][value="b"]').click();
    await form.submit();
    expect(cb).toHaveBeenCalledWith({
      username: "hello",
      tos: "on",
      option: "b",
    });
  });
});
