import render from "./render.ts";

type EventHandler = (event: Event) => void;

export interface ReactTest {
  nodes: Node[];
  events: Record<string, EventHandler[]>;
  error?: Error;
  length: number;
  [Symbol.iterator](): Generator<Node, void, unknown>;

  // Methods
  attr(name: string): string | null;
  array(): Node[];
  array(callback: string): unknown[];
  array<T>(callback: (node: Node, index: number, arr: Node[]) => T): T[];
  change(value: string | boolean): Promise<null>;
  children(selector?: string): ReactTest;
  click(): Promise<void>;
  closest(selector?: string): ReactTest;
  data(name: string): string | null;
  delay(time: number): Promise<void>;
  each(callback?: (node: Node, index: number, arr: Node[]) => void): ReactTest;
  filter(
    selector?: string | ReactTest | ((node: Node, index: number) => boolean)
  ): ReactTest;
  find(selector?: string): ReactTest;
  get(index?: number): Node | null;
  html(): string;
  is(selector?: string | ReactTest | ((node: Node) => boolean)): boolean;
  map(
    callback?: (node: Node) => Node | NodeList | Node[] | null | undefined
  ): ReactTest;
  not(filter?: string | ReactTest): ReactTest;
  parent(): ReactTest;
  props(
    props:
      | Record<string, unknown>
      | ((prev: Record<string, unknown>) => Record<string, unknown>)
  ): ReactTest;
  render(component: unknown): ReactTest;
  siblings(selector?: string): ReactTest;
  submit(): Promise<void>;
  text(): string;
  trigger(type: string, extra?: Record<string, unknown>): Promise<void>;
  type(input: string): Promise<void>;
}

function ReactTest(
  this: ReactTest,
  obj: unknown,
  ctx: Partial<Pick<ReactTest, "events">> = {}
): ReactTest {
  if (!(this instanceof ReactTest))
    return new (ReactTest as unknown as new (
      obj: unknown,
      ctx?: Partial<Pick<ReactTest, "events">>
    ) => ReactTest)(obj, ctx);

  this.events = ctx.events || {};
  const originalAddEventListener = window.addEventListener.bind(window);

  window.addEventListener = (
    event: string,
    callback: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ) => {
    this.events[event] = this.events[event] || [];
    this.events[event].push(callback as EventHandler);
    originalAddEventListener(
      event,
      callback,
      options as boolean | AddEventListenerOptions
    );
  };

  document.addEventListener = (
    event: string,
    callback: EventListenerOrEventListenerObject
  ) => {
    this.events[event] = this.events[event] || [];
    this.events[event].push(callback as EventHandler);
  };

  try {
    this.nodes = render(obj);
  } catch (error) {
    this.nodes = [];
    this.error = error as Error;
  }

  // Add a .length that goes to measure the nodes
  Object.defineProperty(this, "length", { get: () => this.nodes.length });

  return this;
}

// Allow to iterate with for...of and destructure it like [...$list.find('li')]
ReactTest.prototype[Symbol.iterator] = function* (this: ReactTest) {
  for (const node of this.nodes) {
    yield node;
  }
};

const $ = ReactTest as unknown as {
  new (obj: unknown, ctx?: Partial<Pick<ReactTest, "events">>): ReactTest;
  (obj: unknown, ctx?: Partial<Pick<ReactTest, "events">>): ReactTest;
  prototype: ReactTest;
};

export default $;
