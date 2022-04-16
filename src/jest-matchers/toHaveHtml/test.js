import React from "react";
import $ from "../../";
import "../index.js";

const $div = $(
  <div>
    <span>I am a span</span>
    <span>Im also here</span>
    <span>
      <b>here</b>
    </span>
  </div>
);

describe(".toHaveHtml()", () => {
  it("works for a simple case", () => {
    expect($div).toHaveHtml("<span>I am a span</span>");
  });

  it("requires valid html", () => {
    expect(() => expect($div).toHaveHtml("<h1>header</h1>")).toThrow(
      "Expected <div> to have `<h1>header</h1>`"
    );
  });

  it("validates all children of innerHTML", () => {
    expect($div).toHaveHtml("<span>I am a span</span>");
    expect($div).toHaveHtml("<span>Im also here</span>");
    expect($div).toHaveHtml("Im also here");
    expect($div).toHaveHtml("<b>here</b>");
  });

  it("trims passed HTML to check", () => {
    expect($div).toHaveHtml("     <span>I am a span</span>");
    expect($div).toHaveHtml("<span>Im also here</span>     ");
    expect($div).toHaveHtml("Im also here    ");
  });

  it("negatively asserts non-existent HTML", () => {
    expect($div).not.toHaveHtml("<h1>header</h1>");
    expect(() =>
      expect($div).not.toHaveHtml("<span>I am a span</span>")
    ).toThrow("Expected <div> not to have `<span>I am a span</span>`");
  });

  describe("multiple elements", () => {
    const $divs = $(
      <section>
        <div id="div-1">
          <span>span text</span>
        </div>
        <div id="div-2">
          <span>span text</span>
        </div>
      </section>
    ).find("div");

    const validInnerHTMLs = ["<span>span text</span>", "span text"];
    const invalidInnerHTMLs = ["<p></p>", "<li></li>", "<span>div</span>"];

    it("requires all elements to contain html", () => {
      for (const validHTML of validInnerHTMLs) {
        expect($divs).toHaveHtml(validHTML);
      }

      // Throws on first child with non-existent HTML
      for (const invalidHTML of invalidInnerHTMLs) {
        expect(() => expect($divs).toHaveHtml(invalidHTML)).toThrow(
          `Expected <div id="div-1"> to have \`${invalidHTML}\``
        );
      }
    });

    it("negatively asserts multiple elements", () => {
      for (const invalidHTML of invalidInnerHTMLs) {
        expect($divs).not.toHaveHtml(invalidHTML);
      }

      // Throws on first child with valid HTML
      for (const validHTML of validInnerHTMLs) {
        expect(() => expect($divs).not.toHaveHtml(validHTML)).toThrow(
          `Expected <div id="div-1"> not to have \`${validHTML}\``
        );
      }
    });
  });
});
