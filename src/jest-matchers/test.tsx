import $ from "../";

const matchers: [string, unknown[]][] = [
  ["toBeEnabled", []],
  ["toHaveAttribute", ["id"]],
  ["toHaveClass", ["active"]],
  ["toHaveHtml", ["<b>"]],
  ["toHaveStyle", [{ color: "red" }]],
  ["toHaveText", ["Hello"]],
  ["toHaveValue", ["kiwi"]],
  ["toMatchSelector", ["div"]],
];

describe("matchers on an empty selection", () => {
  it.each(matchers)(".%s() fails", (name: string, args: unknown[]) => {
    const $empty = $(<div />).find(".nope");
    const msg = `Expected an element for .${name}(), but the selection is empty`;
    expect(() => (expect($empty) as any)[name](...args)).toThrow(msg);
    expect(() => (expect($empty).not as any)[name](...args)).toThrow(msg);
  });
});
