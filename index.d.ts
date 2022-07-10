import React from 'react';
interface Events {
    [key: string]: Array<EventListenerOrEventListenerObject>;
}
declare type callback = ((node: Element, i: number) => Element | any);
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
    trigger(name: string, extra?: any): Promise<null>;
    get(index: number): Element;
    map(callback: callback): ReactTest;
}
export default function $(component: React.ReactNode | Array<Element>): ReactTest;
export {};
