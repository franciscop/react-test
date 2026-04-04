import getPlainTag from "./getPlainTag";

describe("getPlainTag", () => {
  // --- Core behavior ---
  it("returns null when element is null", () => {
    expect(getPlainTag(null)).toBeNull();
  });

  it("returns a simple tag with no attributes", () => {
    const el = document.createElement("div");
    expect(getPlainTag(el)).toBe("<div>");
  });

  it("lowercases the tag name", () => {
    const el = document.createElement("INPUT");
    expect(getPlainTag(el)).toBe("<input>");
  });

  // --- Attributes ---
  it("includes a single attribute", () => {
    const el = document.createElement("input");
    el.setAttribute("type", "text");

    expect(getPlainTag(el)).toBe('<input type="text">');
  });

  it("includes multiple attributes", () => {
    const el = document.createElement("input");
    el.setAttribute("type", "text");
    el.setAttribute("value", "hello");

    const result = getPlainTag(el);

    expect(result).toContain('type="text"');
    expect(result).toContain('value="hello"');
  });

  it("sorts attributes alphabetically (deterministic order)", () => {
    const el = document.createElement("input");
    el.setAttribute("value", "text");
    el.setAttribute("readonly", "");
    el.setAttribute("type", "text");

    expect(getPlainTag(el)).toBe(
      '<input readonly="" type="text" value="text">'
    );
  });

  // --- Boolean attributes ---
  it("handles boolean attributes like readonly", () => {
    const el = document.createElement("input");
    el.setAttribute("readonly", "");

    expect(getPlainTag(el)).toBe('<input readonly="">');
  });

  // --- Edge cases ---
  it("handles empty string attribute values", () => {
    const el = document.createElement("input");
    el.setAttribute("value", "");

    expect(getPlainTag(el)).toBe('<input value="">');
  });

  it("does not include children", () => {
    const el = document.createElement("div");
    el.innerHTML = "<span>hello</span>";

    expect(getPlainTag(el)).toBe("<div>");
  });

  it("handles custom elements", () => {
    const el = document.createElement("my-element");
    el.setAttribute("data-test", "123");

    expect(getPlainTag(el)).toBe('<my-element data-test="123">');
  });

  // --- Stability ---
  it("produces consistent output regardless of attribute insertion order", () => {
    const el1 = document.createElement("input");
    el1.setAttribute("type", "text");
    el1.setAttribute("value", "text");

    const el2 = document.createElement("input");
    el2.setAttribute("value", "text");
    el2.setAttribute("type", "text");

    expect(getPlainTag(el1)).toBe(getPlainTag(el2));
  });
});
