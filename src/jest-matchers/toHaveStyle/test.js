import React from "react";
import $ from "../../";
import "../index.js";

// The base style object to test against
const styleObj = { display: "none", textAlign: "center" };
const styleStr = "text-align: center; display: none;";

// The base element that we will use to test
const $div = $(<div style={styleObj} />);

describe(".toHaveStyle()", () => {
  it("requires an HTML element", () => {
    expect(() => expect(null).toHaveStyle(styleObj)).toThrow(
      "expect() should receive an HTMLElement or React Test instance"
    );
    expect(() => expect("abc").toHaveStyle(styleObj)).toThrow(
      "expect() should receive an HTMLElement or React Test instance"
    );
  });

  it("requires a valid instance", () => {
    expect(() => expect(true).toHaveStyle(styleObj)).toThrow(
      "expect() should receive an HTMLElement or React Test instance"
    );
  });

  it("works for a simple case", () => {
    expect(<div style={styleObj} />).toHaveStyle(styleObj);
    expect($div).toHaveStyle(styleObj);
  });

  it("can search for individual styles", () => {
    expect($div).toHaveStyle({ display: "none" });
    expect($div).toHaveStyle("text-align: center");
  });

  it("can search for multiple styles", () => {
    expect($div).toHaveStyle(styleObj);
    expect($div).toHaveStyle("display: none; text-align: center");
  });

  it("can handle negative cases", () => {
    expect($div).not.toHaveStyle({ backgroundColor: "red" });
    expect($div).not.toHaveStyle({ width: "100px" });
  });

  it("can handle styles argument of either type string or object", () => {
    expect($div).toHaveStyle(styleObj);
    expect($div).toHaveStyle(styleStr);
    expect($div).not.toHaveStyle({ textAlign: "left" });
  });

  it("can handle styles string argument with or without final semicolon", () => {
    expect($div).toHaveStyle("text-align: center; display: none;");
    expect($div).toHaveStyle("text-align: center; display: none");
  });

  it("throws the correct error message when a single style is missing", () => {
    expect(() => expect($div).toHaveStyle({ color: "purple" })).toThrow(
      'Expected <div style="display: none; text-align: center;"> to include style [color: purple]'
    );
    expect(() => expect($div).toHaveStyle({ width: "200px" })).toThrow(
      'Expected <div style="display: none; text-align: center;"> to include style [width: 200px]'
    );
    expect(() => expect($div).toHaveStyle("width: 200px")).toThrow(
      'Expected <div style="display: none; text-align: center;"> to include style [width: 200px]'
    );
  });

  it("throws the correct error message when multiple styles are missing", () => {
    expect(() =>
      expect($div).toHaveStyle({ color: "purple", width: "200px" })
    ).toThrow(
      'Expected <div style="display: none; text-align: center;"> to include styles [color: purple, width: 200px]'
    );
    expect(() =>
      expect($div).toHaveStyle(
        "text-align: center; color: purple; width: 200px"
      )
    ).toThrow(
      'Expected <div style="display: none; text-align: center;"> to include styles [color: purple, width: 200px]'
    );
  });

  it("throws the correct error message when a single style is incorrectly present", () => {
    expect(() => expect($div).not.toHaveStyle({ display: "none" })).toThrow(
      'Expected <div style="display: none; text-align: center;"> not to include style [display: none]'
    );
    expect(() => expect($div).not.toHaveStyle("text-align: center")).toThrow(
      'Expected <div style="display: none; text-align: center;"> not to include style [text-align: center]'
    );
    expect(() => expect($div).not.toHaveStyle("text-align: center;")).toThrow(
      'Expected <div style="display: none; text-align: center;"> not to include style [text-align: center]'
    );
  });

  it("throws the correct error message when multiple styles are incorrectly present", () => {
    expect(() => expect($div).not.toHaveStyle(styleObj)).toThrow(
      'Expected <div style="display: none; text-align: center;"> not to include styles [display: none, text-align: center]'
    );
    expect(() =>
      expect($div).not.toHaveStyle("display: none; text-align: center")
    ).toThrow(
      'Expected <div style="display: none; text-align: center;"> not to include styles [display: none, text-align: center]'
    );
    expect(() =>
      expect($div).not.toHaveStyle("text-align: center; color: red")
    ).toThrow(
      'Expected <div style="display: none; text-align: center;"> not to include style [text-align: center]'
    );
  });
});

// Base list element to be used in test cases for multiple elements
const $list = $(
  <ul>
    <li style={styleObj}></li>
    <li style={styleObj}></li>
    <li style={{ ...styleObj, color: "red" }}></li>
  </ul>
);

describe(".toHaveStyle() - checkmultiple elements", () => {
  it("should be able to check styles are present on multiple elements", () => {
    expect($list.find("li")).toHaveStyle(styleObj);
    expect($list.find("li")).toHaveStyle("display: none");
    expect($list.find("li")).toHaveStyle({ textAlign: "center" });
  });

  it("should be able to check styles are absent multiple elements", () => {
    expect($list.find("li")).not.toHaveStyle("color: green");
    expect($list.find("li")).not.toHaveStyle("width: 20px");
    expect($list.find("li")).not.toHaveStyle({ height: "100%" });
  });

  it("should check styles are present on all elements", () => {
    expect(() => expect($list.find("li")).toHaveStyle("color: red")).toThrow(
      'Expected <li style="display: none; text-align: center;"> to include style [color: red]'
    );
  });

  it("should check styles are not present on all elements", () => {
    expect(() =>
      expect($list.find("li")).not.toHaveStyle("color: red")
    ).toThrow(
      'Expected <li style="display: none; text-align: center; color: red;"> not to include style [color: red]'
    );
  });
});
