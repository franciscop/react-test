import React from "react";
import $ from "../../";
import "../index.js";

// Requires readOnly or onChange when value is set
const $textInput = $(<input type="text" value="text" readOnly />);
const $numberInput = $(<input type="number" value="10" readOnly />);
const $textarea = $(<textarea value="text description" readOnly />);
const $select = $(
  <select value="second" onChange={() => {}}>
    <option value="first">first</option>
    <option value="second">second</option>
    <option value="third">third</option>
  </select>
);

describe(".toHaveValue()", () => {
  it("requires an HTMLelement", () => {
    const msg = "expect() should receive an HTMLElement or React Test instance";
    expect(() => expect(null).toHaveValue("kiwi")).toThrow(msg);
    expect(() => expect("random").toHaveValue("kiwi")).toThrow(msg);
  });

  it("requires a valid instance", () => {
    expect(() => expect({}).toHaveValue("kiwi")).toThrow(
      "expect() should receive an HTMLElement or React Test instance"
    );
  });

  it("works for a simple case", () => {
    expect($textInput).toHaveValue("text");
    expect($numberInput).toHaveValue(10);
    expect($textarea).toHaveValue("text description");
    expect($select).toHaveValue("second");
  });

  it("handles negative assertions", () => {
    expect($textInput).not.toHaveValue(10);
    expect($numberInput).not.toHaveValue("text");
    expect($textarea).not.toHaveValue("random");
    expect($select).not.toHaveValue("first");
  });

  it("checks defaultValue when set", () => {
    const $input = $(<input type="text" defaultValue="initial text" />);
    const $textarea = $(<textarea defaultValue="initial textarea" />);

    expect($input).toHaveValue("initial text");
    expect($textarea).toHaveValue("initial textarea");
  });

  it("cannot check for values on input types, checkbox and radio", () => {
    const $checkbox = $(<input type="checkbox" checked readOnly />);
    const $radio = $(<input type="radio" value="something" checked readOnly />);

    expect(() => expect($checkbox).toHaveValue("check")).toThrow(
      'Cannot check .toHaveValue() for input type="checkbox" or type="radio".'
    );
    expect(() => expect($radio).toHaveValue("radio")).toThrow(
      'Cannot check .toHaveValue() for input type="checkbox" or type="radio".'
    );
  });

  it("requires only one element", () => {
    const $list = $(
      <li>
        <input type="text" value="first" readOnly />
        <input type="text" value="second" readOnly />
      </li>
    );
    expect(() => expect($list.find("input")).toHaveValue("first")).toThrow(
      "Cannot check multiple elements for values. Please pass only one element."
    );
  });

  it("requires elements that can return values", () => {
    const $button = $(<button>click</button>);
    const $link = $(<a href="hello.com">click</a>);

    expect(() => expect($button).toHaveValue("button")).toThrow(
      "Not a valid element that has a value attribute. Please insert an element that has a value."
    );
    expect(() => expect($link).toHaveValue("link")).toThrow(
      "Not a valid element that has a value attribute. Please insert an element that has a value."
    );
  });

  it("requires the correct value", () => {
    expect(() => expect($textInput).toHaveValue("random")).toThrow(
      'Expected <input type="text" readonly="" value="text"> to have value=random'
    );
    expect(() => expect($numberInput).toHaveValue(11)).toThrow(
      'Expected <input type="number" readonly="" value="10"> to have value=11'
    );
    expect(() => expect($textarea).toHaveValue("random")).toThrow(
      'Expected <textarea readonly=""> to have value=random'
    );
    expect(() => expect($select).toHaveValue("first")).toThrow(
      "Expected <select> to have value=first"
    );
  });

  it("requires correct negative assertions", () => {
    expect(() => expect($textInput).not.toHaveValue("text")).toThrow(
      'Expected <input type="text" readonly="" value="text"> not to have value=text'
    );
    expect(() => expect($numberInput).not.toHaveValue(10)).toThrow(
      'Expected <input type="number" readonly="" value="10"> not to have value=10'
    );
    expect(() => expect($textarea).not.toHaveValue("text description")).toThrow(
      'Expected <textarea readonly=""> not to have value=text description'
    );
    expect(() => expect($select).not.toHaveValue("second")).toThrow(
      "Expected <select> not to have value=second"
    );
  });
});
