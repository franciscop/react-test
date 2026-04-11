import React from "react";
import $ from "../../";
import "../index";

describe(".toHaveError()", () => {
  beforeAll(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterAll(() => {
    (console.error as ReturnType<typeof vi.spyOn>).mockRestore();
  });

  function Broken(): React.ReactElement {
    throw new Error("hello world");
  }

  function Fine() {
    return <div>Hello</div>;
  }

  it("passes when the component throws any error", () => {
    expect($(<Broken />)).toHaveError();
  });

  it("passes when the error message matches a string", () => {
    expect($(<Broken />)).toHaveError("hello world");
  });

  it("passes when the error message matches a regex", () => {
    expect($(<Broken />)).toHaveError(/hello/);
    expect($(<Broken />)).toHaveError(/^hello world$/);
    expect($(<Broken />)).toHaveError(/wor.d/);
  });

  it("fails when the error message does not match a string", () => {
    expect(() => expect($(<Broken />)).toHaveError("bye")).toThrow();
  });

  it("fails when the error message does not match a regex", () => {
    expect(() => expect($(<Broken />)).toHaveError(/^bye$/)).toThrow();
  });

  it("negates: passes when no error is thrown", () => {
    expect($(<Fine />)).not.toHaveError();
  });

  it("negates: passes when error message does not match a string", () => {
    expect($(<Broken />)).not.toHaveError("bye");
  });

  it("negates: passes when error message does not match a regex", () => {
    expect($(<Broken />)).not.toHaveError(/^bye$/);
    expect($(<Broken />)).not.toHaveError(/xyz/);
  });

  it("negates: fails when error message matches a string", () => {
    expect(() =>
      expect($(<Broken />)).not.toHaveError("hello world"),
    ).toThrow();
  });

  it("negates: fails when error message matches a regex", () => {
    expect(() => expect($(<Broken />)).not.toHaveError(/hello/)).toThrow();
  });
});
