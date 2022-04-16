import React from "react";
import $ from "../../";
import "../index.js";

const $button = $(<button type="submit" />);
const $input = $(<input type="text" name="name" required />);

describe(".toHaveAttribute()", () => {
  it("works for a simple case", () => {
    expect($button).toHaveAttribute("type", "submit");
    expect($input).toHaveAttribute("type", "text");
    expect($input).toHaveAttribute("name", "name");
    expect($input).toHaveAttribute("required", true);
    expect($input).toHaveAttribute("required");
  });

  it("requires an HTMLelement", () => {
    const msg = "expect() should receive an HTMLElement or React Test instance";
    expect(() => expect(null).toHaveAttribute("kiwi")).toThrow(msg);
    expect(() => expect("random").toHaveAttribute("kiwi")).toThrow(msg);
  });

  it("requires a valid instance", () => {
    expect(() => expect({}).toHaveAttribute("kiwi")).toThrow(
      "expect() should receive an HTMLElement or React Test instance"
    );
  });

  it("requires the correct attr name", () => {
    expect(() => expect($button).toHaveAttribute("error")).toThrow(
      'Expected <button type="submit"> to have attribute `error`'
    );
  });

  it("requires the correct attr value", () => {
    expect(() => expect($button).toHaveAttribute("type", "reset")).toThrow(
      'Expected <button type="submit"> to have attribute `type`="reset"'
    );
  });

  it("fails if attr is found when not expected", () => {
    expect(() => expect($button).not.toHaveAttribute("type")).toThrow(
      'Expected <button type="submit"> not to have attribute `type`'
    );
  });

  it("fails if attr with correct value is found when not expected", () => {
    expect(() => expect($button).not.toHaveAttribute("type", "submit")).toThrow(
      'Expected <button type="submit"> not to have attribute `type`="submit"'
    );
  });

  describe("regex", () => {
    it("handles regex for values", () => {
      expect($input).toHaveAttribute("type", /text/);
      expect($input).toHaveAttribute("type", /te.+/);
      expect($input).toHaveAttribute("type", /.*/);
    });

    it("fails when regex is invalid", () => {
      expect(() => expect($input).toHaveAttribute("type", /texax./)).toThrow(
        'Expected <input type="text" name="name" required=""> to have attribute `type` that matches /texax./'
      );
    });

    it("handles negated regex values", () => {
      expect($input).not.toHaveAttribute("type", /texax./);
    });

    it("fails when negated regex values exist", () => {
      expect(() => expect($input).not.toHaveAttribute("type", /tex.+/)).toThrow(
        'Expected <input type="text" name="name" required=""> not to have attribute `type` that matches /tex.+/'
      );
    });
  });

  describe("multiple elements", () => {
    const $list = $(
      <ul>
        <li id="first" value="1" title="list-item">
          apple
        </li>
        <li value="2" title="list-item">
          apple
        </li>
      </ul>
    );

    it("requires all elements to have the same attribute", () => {
      expect($list.find("li")).toHaveAttribute("value");
      expect(() => expect($list.find("li")).toHaveAttribute("id")).toThrow(
        'Expected <li value="2" title="list-item"> to have attribute `id`'
      );
    });

    it("requires all elements to have the same attribute && value", () => {
      expect(() =>
        expect($list.find("li")).toHaveAttribute("value", "1")
      ).toThrow(
        'Expected <li value="2" title="list-item"> to have attribute `value`="1"'
      );
    });

    it("requires all elements to not have the same attribute", () => {
      expect($list.find("li")).not.toHaveAttribute("hi");
      expect(() => expect($list.find("li")).not.toHaveAttribute("id")).toThrow(
        'Expected <li id="first" value="1" title="list-item"> not to have attribute `id`'
      );
    });

    it("requires all elements to not have the same attribute && value", () => {
      expect($list.find("li")).not.toHaveAttribute("title", "order");
      // Returns the first unmatched element
      expect(() =>
        expect($list.find("li")).not.toHaveAttribute("title", "list-item")
      ).toThrow(
        'Expected <li id="first" value="1" title="list-item"> not to have attribute `title`="list-item"'
      );
    });
  });
});
