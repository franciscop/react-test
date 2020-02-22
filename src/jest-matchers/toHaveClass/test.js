import React from "react";
import $ from "../../";
import "../index.js";

// The base element that we will use to test
const $div = $(<div className="hello world" />);

describe(".toHaveClass()", () => {
  it("works for a simple case", () => {
    expect(<div className="hello world" />).toHaveClass("hello");
    expect(<div className="hello world" />).not.toHaveClass("banana");
    expect($div.get(0)).toHaveClass("hello");
    expect($div.get(0)).not.toHaveClass("banana");
    expect($div).toHaveClass("hello");
    expect($div).not.toHaveClass("banana");
  });

  it("requires an HTML element", () => {
    expect(() => expect(null).toHaveClass("banana")).toThrow(
      "expect() should receive an HTMLElement or React Test instance"
    );

    expect(() => expect("abc").toHaveClass("banana")).toThrow(
      "expect() should receive an HTMLElement or React Test instance"
    );
  });

  it("requires a valid instance", () => {
    expect(() => expect(true).toHaveClass("banana")).toThrow(
      "expect() should receive an HTMLElement or React Test instance"
    );
  });

  it("requires a class if it's not found", () => {
    expect(() => expect($div).toHaveClass("banana")).toThrow(
      'Expected <div class="hello world"> to include class "banana"'
    );
  });

  it("only requires the class that is not found", () => {
    expect(() => expect($div).toHaveClass("hello", "banana")).toThrow(
      'Expected <div class="hello world"> to include class "banana"'
    );
  });

  it("can pluralize class names", () => {
    expect(() => expect($div).toHaveClass("potato", "banana")).toThrow(
      'Expected <div class="hello world"> to include classes "potato", "banana"'
    );
  });

  it("fails if it's found when not expected", () => {
    expect(() => expect($div).not.toHaveClass("hello")).toThrow(
      'Expected <div class="hello world"> not to include class "hello"'
    );
  });

  it("only fails with the class that is found", () => {
    expect(() => {
      expect($div).not.toHaveClass("hello", "banana");
    }).toThrow(
      'Expected <div class="hello world"> not to include class "hello"'
    );
  });

  it("pluralizes if there's multiple fails", () => {
    expect(() => {
      expect($div).not.toHaveClass("hello", "world");
    }).toThrow(
      'Expected <div class="hello world"> not to include classes "hello", "world"'
    );
  });

  describe("multiple elements", () => {
    const $list = $(
      <ul>
        <li className="item main">a</li>
        <li className="item secondary">b</li>
      </ul>
    );

    it("requires all the elements to have the class", () => {
      expect($list.find("li")).toHaveClass("item");

      expect(() => expect($list.find("li")).toHaveClass("main")).toThrow(
        'Expected <li class="item secondary"> to include class "main"'
      );
    });

    it("requires no element to have the class", () => {
      expect($list.find("li")).not.toHaveClass("demo");

      expect(() => expect($list.find("li")).not.toHaveClass("item")).toThrow(
        'Expected <li class="item main"> not to include class "item"'
      );

      expect(() => expect($list.find("li")).not.toHaveClass("main")).toThrow(
        'Expected <li class="item main"> not to include class "main"'
      );

      expect(() =>
        expect($list.find("li")).not.toHaveClass("secondary")
      ).toThrow(
        'Expected <li class="item secondary"> not to include class "secondary"'
      );
    });
  });
});
