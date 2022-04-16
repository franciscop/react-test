import React from "react";
import $ from "../../";
import "../index.js";

// The base elements that we will use to test
const $enabled = $(<input />);
const $disabled = $(<input disabled />);

describe(".toBeEnabled()", () => {
  it("works for a simple case", () => {
    expect(<input />).toBeEnabled();
    expect(<input disabled />).not.toBeEnabled();
    expect($enabled.get(0)).toBeEnabled();
    expect($disabled.get(0)).not.toBeEnabled();
    expect($enabled).toBeEnabled();
    expect($disabled).not.toBeEnabled();
  });

  it("requires an HTML element", () => {
    expect(() => expect(null).toBeEnabled()).toThrow(
      "expect() should receive an HTMLElement or React Test instance"
    );

    expect(() => expect("abc").toBeEnabled()).toThrow(
      "expect() should receive an HTMLElement or React Test instance"
    );
  });

  it("requires a valid instance", () => {
    expect(() => expect(true).toBeEnabled()).toThrow(
      "expect() should receive an HTMLElement or React Test instance"
    );
  });

  it("fails if it's enabled when we expect it not to", () => {
    expect(() => expect($enabled).not.toBeEnabled()).toThrow(
      'Expected <input> to include the attribute "disabled"'
    );
  });

  it("doesn't fail if it's enabled when we expect it to", () => {
    expect(() => expect($enabled).toBeEnabled()).not.toThrow();
  });

  it("fails if it's disabled when we expect it not to", () => {
    expect(() => expect($disabled).toBeEnabled()).toThrow(
      'Expected <input disabled=""> not to include the attribute "disabled"'
    );
  });

  it("doesn't fail if it's disabled when we expect it to", () => {
    expect(() => expect($disabled).not.toBeEnabled()).not.toThrow();
  });

  describe("multiple elements", () => {
    const $form = $(
      <form>
        <input id="banana" />
        <input id="orange" disabled />

        <textarea id="apple" />
        <textarea id="pear" />

        <button id="mango" disabled />
        <button id="coconut" disabled />
      </form>
    );

    it("requires all the specified elements to be enabled", () => {
      expect($form.find("textarea")).toBeEnabled();

      expect(() => expect($form.find("input")).toBeEnabled()).toThrow(
        'Expected <input id="orange" disabled=""> not to include the attribute "disabled"'
      );

      expect(() => expect($form.find("input")).not.toBeEnabled()).toThrow(
        'Expected <input id="banana"> to include the attribute "disabled"'
      );

      expect(() => expect($form.find("button")).toBeEnabled()).toThrow(
        'Expected <button id="mango" disabled=""> not to include the attribute "disabled"'
      );
    });

    it("requires none of the specified elements to be enabled", () => {
      expect($form.find("button")).not.toBeEnabled();

      expect(() => expect($form.find("textarea")).not.toBeEnabled()).toThrow(
        'Expected <textarea id="apple"> to include the attribute "disabled"'
      );

      expect(() => expect($form.find("input")).not.toBeEnabled()).toThrow(
        'Expected <input id="banana"> to include the attribute "disabled"'
      );
    });
  });
});
