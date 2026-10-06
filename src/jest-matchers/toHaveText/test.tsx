import $ from "../../";
import "../index";

describe(".toHaveText()", () => {
  it("requires an HTML element", () => {
    const msg = "expect() should receive an HTMLElement or React Test instance";
    expect(() => expect(null).toHaveText("banana")).toThrow(msg);
    expect(() => expect("abc").toHaveText("banana")).toThrow(msg);
  });

  it("works for a simple case", () => {
    expect(<div>Hello</div>).toHaveText("Hello");
  });

  it("rejects in the simple case", () => {
    expect(() => expect(<div>banana</div>).toHaveText("apple")).toThrow(
      'Expected <div> to have text "apple" but it received "banana"',
    );
  });

  it("normalizes the whitespace", () => {
    const text = $(
      <div>
        Hello <br /> world!
      </div>,
    );
    expect(text).toHaveText("Hello world!");
  });

  it("can be negated", () => {
    expect(<div>Hello</div>).not.toHaveText("Hi");
  });

  it("rejects with the negation", () => {
    expect(() => expect(<div>banana</div>).not.toHaveText("banana")).toThrow(
      'Expected <div> not to have the text "banana"',
    );
  });

  it("matches only the full text with a string", () => {
    expect(<div>Hello world</div>).not.toHaveText("Hello");
  });

  it("matches part of the text with a regex", () => {
    expect(<div>Tu mano: 3 cartas</div>).toHaveText(/Tu mano/);
    expect(<div>Tu mano: 3 cartas</div>).toHaveText(/^tu mano/i);
    expect(<div>Tu mano: 3 cartas</div>).not.toHaveText(/^Tu mano$/);
  });

  it("matches a regex against the normalized whitespace", () => {
    const text = $(
      <div>
        Hello <br /> world!
      </div>,
    );
    expect(text).toHaveText(/^Hello world!$/);
  });

  it("works with regexes that use the g flag", () => {
    const $list = $(
      <ul>
        <li>apple</li>
        <li>pineapple</li>
      </ul>,
    );
    expect($list.find("li")).toHaveText(/apple/g);
  });

  it("rejects a regex that doesn't match", () => {
    expect(() => expect(<div>banana</div>).toHaveText(/apple/)).toThrow(
      'Expected <div> to have text matching /apple/ but it received "banana"',
    );
    expect(() => expect(<div>banana</div>).not.toHaveText(/nan/)).toThrow(
      'Expected <div> not to have text matching /nan/ but it received "banana"',
    );
  });
});
