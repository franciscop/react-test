import React from "react";
import $ from "../../";
import "babel-polyfill";

const list = $(
  <ul>
    <li>A</li>
    <li className="active">B</li>
    <li>C</li>
  </ul>
);

const items = list.children();

describe(".not()", () => {
  it("rejects everything when emtpy", async () => {
    const out = items.not();
    expect(out).toHaveLength(0);
  });

  it("can exclude an element", async () => {
    const out = items.not(".active").array((n) => n.textContent);
    expect(out).toEqual(["A", "C"]);
  });

  it("Has the correct html", async () => {
    const out = items.not(":last-child").array((n) => n.textContent);
    expect(out).toEqual(["A", "B"]);
  });

  it("doesn't accept a callback", async () => {
    expect(() => items.not((node) => node)).toThrow();
  });

  describe("readme", () => {
    it("can get just the users", () => {
      const list = $(
        <ul>
          <li className="user">John</li>
          <li className="group">Ibiza</li>
          <li className="user">Sarah</li>
        </ul>
      );
      const people = list.children().not(".group");
      expect(people.array((node) => node.textContent)).toEqual([
        "John",
        "Sarah",
      ]);
    });

    it("can get all children except the imoportant one", () => {
      const List = () => (
        <ul>
          <li>A</li>
          <li className="important">B</li>
          <li>C</li>
        </ul>
      );

      // Find the text of each element
      const text = $(<List />)
        .children()
        .not(".important")
        .array((item) => item.textContent);

      expect(text).toEqual(["A", "C"]);
    });

    it("can get all children except the first", () => {
      const Table = () => (
        <table>
          <tbody>
            <tr>
              <th>Col A</th>
              <th>Col B</th>
            </tr>
            <tr>
              <td>A1</td>
              <td>B1</td>
            </tr>
            <tr>
              <td>A2</td>
              <td>B2</td>
            </tr>
          </tbody>
        </table>
      );

      // Find the text of each element
      const text = $(<Table />)
        .find("tr")
        .not(":first-child")
        .array((item) => item.textContent);

      expect(text).toEqual(["A1B1", "A2B2"]);
    });
  });
});
