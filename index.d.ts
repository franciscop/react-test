import React from "react";
interface Events {
  [key: string]: Array<EventListenerOrEventListenerObject>;
}
declare type callback = (node: Element, i: number) => Element | any;
declare class ReactTest {
  nodes: Array<Element>;
  events: Events;
  length: Number;
  constructor(component: React.ReactNode | Array<Element>, ctx?: any);
  /**
   * Get all of the matched nodes as a plain array. Optionally extract data of each ndoe either with a key used as an prop, or with a callback:
   *
   * ```js
   * const list = $(<List />).children();
   * list.array();  // [<li>A</li>, <li>B</li>, <li>C</li>]
   * list.array("nodeName");  // ["LI", "LI", "LI"]
   * list.array(node => node.innerText);  // ["A", "B", "C"]
   * ```
   *
   * **[→ Full .array() Docs](https://react-test.dev/documentation#array)**
   */
  array(extract?: string | callback): Array<any>;
  /**
   * Read the attribute value of the first node and return its value, or null if there's no node or attribute:
   *
   * ```js
   * const input = $(<input name="email" disabled />);
   * expect(input.attr("name")).toBe("email");
   * expect(input.attr("disabled")).toBe("");
   * expect(input.attr("placeholder")).toBe(null);
   * ```
   *
   * **[→ Full .attr() Docs](https://react-test.dev/documentation#attr)**
   */
  attr(name: string): string | null;
  /**
   * Trigger a change in all of the matched elements. It should be awaited for the side effects to run and the component to re-rendered:
   *
   * ```js
   * const input = $(<input defaultValue="hello" />);
   * expect(input).toHaveValue("hello");
   * await input.change("world");
   * expect(input).toHaveValue("world");
   * ```
   *
   * **[→ Full .change() Docs](https://react-test.dev/documentation#change)**
   */
  change(value: string): Promise<null>;
  /**
   * Get the children nodes of all of the matched elements, optionally filtering them with a CSS selector:
   *
   * ```js
   * const list = $(<List />);
   * expect(list.children()).toHaveLength(3)
   * expect(list.children(".active")).toHaveLength(1);
   * ```
   *
   * **[→ Full .children() Docs](https://react-test.dev/documentation#children)**
   */
  children(selector?: string): ReactTest;
  /**
   * Trigger a click on all the matched elements. It should be awaited for the side effects to run and the component to re-rendered:
   *
   * ```js
   * const counter = $(<Counter />);
   * expect(counter.text()).toEqual("0");
   * await counter.click();
   * expect(counter.text()).toEqual("1");
   * ```
   *
   * **[→ Full .click() Docs](https://react-test.dev/documentation#click)**
   */
  click(): Promise<null>;
  /**
   * Find the first ancestor that matches the selector for each element (deduplicated):
   *
   * ```js
   * const list = $(<List />);
   * const item = list.find("a").closest("li");
   * expect(item.html()).toBe("<li><a>A</a></li>");
   * ```
   *
   * **[→ Full .closest() Docs](https://react-test.dev/documentation#closest)**
   */
  closest(selector?: string): ReactTest;
  /**
   * Read the data-attribute value of the first node and return its value:
   *
   * ```js
   * const card = $(<div data-id="25" data-selected />);
   * expect(card.data("id")).toBe("25");
   * expect(card.data("selected")).toBe("true");
   * expect(card.data("name")).toBe(null);
   * ```
   *
   * **[→ Full .data() Docs](https://react-test.dev/documentation#data)**
   */
  data(name: string): string | null;
  /**
   * Makes the component to wait for the specified period of time in milliseconds:
   *
   * ```js
   * const down = $(<CountDown />);
   * expect(down).toHaveText("3");
   * await down.delay(4000); // 4 seconds
   * expect(down).toHaveText("Done!");
   * ```
   *
   * **[→ Full .delay() Docs](https://react-test.dev/documentation#delay)**
   */
  delay(milliseconds?: number): Promise<null>;
  /**
   * Iterates over each of the nodes and returns the same collection of nodes as there was before:
   *
   * ```js
   * const items = $(<List />).find("li");
   * const texts = [];
   * items.each((node) => texts.push(node.innerText));
   * expect(texts).toEqual(["A", "B", "C"]);
   * ```
   *
   * **[→ Full .each() Docs](https://react-test.dev/documentation#each)** &nbsp; · | · &nbsp; **[\<ChatRoom /\> Example](https://react-test.dev/documentation#list)**
   */
  each(callback: callback): ReactTest;
  /**
   * Keep only the nodes that match the selector, removing the others:
   *
   * ```js
   * const items = $(<ChatRooms />).children();
   * const people = items.filter(".user").array("innerText");
   * expect(people).toEqual(["John", "Sarah"]);
   * ```
   *
   * **[→ Full .filter() Docs](https://react-test.dev/documentation#filter)** &nbsp; · | · &nbsp; **[\<ChatRoom /\> Example](https://react-test.dev/documentation#chatroom)**
   */
  filter(selector: string | callback): ReactTest;
  /**
   * Get all of the descendants of the nodes with an optional filter:
   *
   * ```js
   * const links = $(<ChatRooms />).find("a");
   * expect(links).toHaveAttribute("src");
   * ```
   *
   * **[→ Full .find() Docs](https://react-test.dev/documentation#find)**
   */
  find(selector: string | callback): ReactTest;
  /**
   * Get a native DOM Node given its index. Defaults to the first element:
   *
   * ```js
   * const item = $(<List />).children().get(0);
   * expect(item.innerText).toBe("First Item");
   * ```
   *
   * **[→ Full .get() Docs](https://react-test.dev/documentation#get)**
   */
  get(index?: number): Element;
  /**
   * Retrieve the OuterHTML of the first element matched, with the whitespace normalized:
   *
   * ```js
   * const items = $(<List />).children();
   * expect(items.html()).toBe("<li>First Item</li>");
   * ```
   *
   * **[→ Full .html() Docs](https://react-test.dev/documentation#html)**
   */
  html(): String;
  /**
   * Check whether all of the nodes match the selector:
   *
   * ```js
   * const items = $(<List />).children();
   * expect(items.is("li")).toBe(true);
   * ```
   *
   * **[→ Full .is() Docs](https://react-test.dev/documentation#is)**
   */
  is(selector: string | callback): Boolean;
  /**
   * Iterates over each of the nodes and returns a new collection with the nodes that were returned from the callback:
   *
   * ```js
   * const items = $(<List />).map(node => {
   *   return node.querySelectorAll("li");
   * }).array("nodeName");
   * expect(items).toBe(["LI", "LI"]);
   * ```
   *
   * **[→ Full .map() Docs](https://react-test.dev/documentation#map)**
   */
  map(callback: callback): ReactTest;
  /**
   * Remove the matched nodes from the collection. It's the opposite of .filter():
   *
   * ```js
   * const items = $(<ChatRooms />).children();
   * const groups = items.not(".user").array("innerText");
   * expect(groups).toEqual(["Summer", "Birthday"]);
   * ```
   *
   * **[→ Full .not() Docs](https://react-test.dev/documentation#not)**
   */
  not(selector: string): ReactTest;
  /**
   * Return a new collection with the direct parent of the current nodes with an optional filter:
   *
   * ```js
   * const list = $(<List />);
   * const items = list.find("li > a").parent();
   * expect(items.array("nodeName")).toEqual(["LI", "LI"]);
   * ```
   *
   * **[→ Full .parent() Docs](https://react-test.dev/documentation#parent)**
   */
  parent(selector?: string): ReactTest;
  /**
   * TODO:
   *
   * **[→ Full .siblings() Docs](https://react-test.dev/documentation#siblings)**
   */
  siblings(selector?: string): ReactTest;
  /**
   * Trigger a form submission on all the matched forms. It should be awaited for the side effects to run and the component to re-rendered:
   *
   * ```js
   * const onSubmit = jest.fn();
   * const createUser = $(<CreateUser onSubmit={onSubmit} />);
   * expect(onSubmit).not.toBeCalled();
   * await createUser.submit();
   * expect(onSubmit).toBeCalled();
   * ```
   *
   * **[→ Full .submit() Docs](https://react-test.dev/documentation#submit)**
   */
  submit(): Promise<null>;
  /**
   * Get the textContent of the first matched node:
   *
   * ```js
   * const greeting = $(<Greeting />);
   * expect(greeting.text()).toBe("Hello world");
   * ```
   *
   * **[→ Full .text() Docs](https://react-test.dev/documentation#text)**
   */
  text(): String;
  /**
   * Simulates typing the text on all the matched elements. It should be awaited for the side effects to run and the component to re-rendered:
   *
   * ```js
   * const input = $(<input />);
   * expect(input).toHaveValue("");
   * await input.type("Francisco");
   * expect(input).toHaveValue("Francisco");
   * ```
   *
   * **[→ Full .type() Docs](https://react-test.dev/documentation#type)**
   */
  type(text: string): Promise<null>;
  trigger(name: string, extra?: any): Promise<null>;
}
/**
 * Wrap a piece of async code that is expected to result in a re-render:
 *
 * ```js
 * const down = $(<CountDown />);
 * expect(down).toHaveText("3");
 * await act(() => delay(4000));
 * expect(down).toHaveText("Done!");
 * ```
 *
 * **[→ Full .act() Docs](https://react-test.dev/documentation#act)**
 */
export declare function act(callback: () => Promise<any>): Promise<null>;
export default function $(
  component: React.ReactNode | Array<Element>
): ReactTest;
export {};
