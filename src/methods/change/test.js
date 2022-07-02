import React from "react";
import $ from "../../";
import "babel-polyfill";

describe(".change()", () => {
  it("can attach and click on children", async () => {
    const mock = jest.fn();
    const $test = $(
      <div>
        <input onChange={mock} />
      </div>
    );
    expect(mock).not.toBeCalled();
    await $test.find("input").change("hello");
    expect(mock).toBeCalled();
  });

  it("has the right value", async () => {
    const mock = jest.fn();
    const $test = $(
      <div>
        <input onChange={mock} />
      </div>
    );
    expect(mock).not.toBeCalled();
    await $test.find("input").change("hello");
    expect($test.find("input").get(0).value).toBe("hello");
    expect(mock.mock.calls[0][0].target.value).toBe("hello");
  });

  it("can change two inputs", async () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    const $test = $(
      <div>
        <input onChange={mock1} />
        <input onChange={mock2} />
      </div>
    );
    expect(mock1).not.toBeCalled();
    expect(mock2).not.toBeCalled();
    await $test.find("input:first-child").change("hello");
    await $test.find("input:last-child").change("bye");
    expect(mock1.mock.calls[0][0].target.value).toBe("hello");
    expect(mock2.mock.calls[0][0].target.value).toBe("bye");
  });

  it("works with uncontrolled inputs", async () => {
    const input = $(<input defaultValue="hello" />);
    expect(input).toHaveValue("hello");
    await input.change("Francisco");
    expect(input).toHaveValue("Francisco");
  });

  it("works with uncontrolled textarea", async () => {
    const input = $(<textarea defaultValue="hello" />);
    expect(input).toHaveValue("hello");
    await input.change("world");
    expect(input).toHaveValue("world");
  });

  it("works with uncontrolled selects", async () => {
    const input = $(
      <select name="pick" defaultValue="a">
        <option value="a">A</option>
        <option value="b">B</option>
      </select>
    );
    expect(input).toHaveValue("a");
    await input.change("b");
    expect(input).toHaveValue("b");
    await input.change(false);
    expect(input).toHaveValue(false);
  });

  it("works with uncontrolled checkboxes", async () => {
    const input = $(<input type="checkbox" defaultChecked />);
    expect(input.get(0).checked).toBe(true);
    // expect(input).toBeChecked();    // NOT YET
    await input.change(false);
    expect(input.get(0).checked).toBe(false);
    // expect(input).not.toBeChecked();    // NOT YET
  });

  it("works with uncontrolled checkboxes with value", async () => {
    const input = $(<input type="checkbox" value="hello" defaultChecked />);
    expect(input.get(0).checked).toBe(true);
    // expect(input).toBeChecked();   // NOT YET
    await input.change(false);
    expect(input.get(0).checked).toBe(false);
    // expect(input).not.toBeChecked();   // NOT YET
  });

  it("works with uncontrolled radio", async () => {
    const input = $(<input type="radio" defaultChecked />);
    expect(input.get(0).checked).toBe(true);
    // expect(input).toBeChecked();    // NOT YET
    await input.change(false);
    expect(input.get(0).checked).toBe(false);
    // expect(input).not.toBeChecked();    // NOT YET
  });

  it("works with uncontrolled radio with value", async () => {
    const input = $(<input type="radio" value="hello" defaultChecked />);
    expect(input.get(0).checked).toBe(true);
    // expect(input).toBeChecked();   // NOT YET
    await input.change(false);
    expect(input.get(0).checked).toBe(false);
    // expect(input).not.toBeChecked();   // NOT YET
  });

  it("can test all the input types", async () => {
    const form = $(
      <form>
        <input name="text" type="text" />
        <input name="password" type="password" />
        <input name="checkbox" type="checkbox" />
        <input name="radio" type="radio" value="a" defaultChecked />
        <input name="radio" type="radio" value="b" />
      </form>
    );
    const data = new FormData(form.get(0));
    expect(data.get("text")).toBe("");
    expect(data.get("password")).toBe("");
    expect(data.get("checkbox")).toBe(null);
    expect(form.find('[name="checkbox"]').get(0).checked).toBe(false);
    // expect(data.get("radio")).toBe("a");
    // expect(form.find('[name="radio"]').get(0).checked).toBe(true);

    await form.find('[name="text"]').change("hello");
    await form.find('[name="password"]').change("world");
    await form.find('[name="checkbox"]').change(true);
    // await form.find('[name="radio"]').change("b");

    const later = new FormData(form.get(0));
    expect(later.get("text")).toBe("hello");
    expect(later.get("password")).toBe("world");
    expect(later.get("checkbox")).toBe("on");
    expect(form.find('[name="checkbox"]').get(0).checked).toBe(true);
    // expect(data.get("radio")).toBe("b");
    // expect(form.find('[name="radio"]').get(0).checked).toBe(false);
  });

  describe("checkboxes", () => {
    it("only accepts true/false for checkboxes", async () => {
      const input = $(<input name="checkbox" type="checkbox" />);
      expect(input.get(0).value).toBe("on");
      expect(input.get(0).checked).toBe(false);

      // await input.change(true);
      await input.click();

      expect(input.get(0).value).toBe("on");
      expect(input.get(0).checked).toBe(true);
    });
  });
});
