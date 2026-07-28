import render, { createContainer, type RenderContainer } from "./render";

const needsRoot = (obj: unknown): boolean =>
  ["string", "number", "boolean"].includes(typeof obj) ||
  Boolean((obj as Record<string, unknown>).$$typeof);

type EventHandler = (event: Event) => void;

export interface ReactTest {
  root: RenderContainer | null;
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
  eq(index?: number): ReactTest;
  filter(
    selector?: string | ReactTest | ((node: Node, index: number) => boolean),
  ): ReactTest;
  find(selector?: string): ReactTest;
  first(): ReactTest;
  get<T extends Node = Node>(index?: number): T | null;
  html(): string;
  is(selector?: string | ReactTest | ((node: Node) => boolean)): boolean;
  last(): ReactTest;
  map(
    callback?: (node: Node) => Node | NodeList | Node[] | null | undefined,
  ): ReactTest;
  not(filter?: string | ReactTest): ReactTest;
  parent(): ReactTest;
  props(
    props:
      | Record<string, unknown>
      | ((prev: Record<string, unknown>) => Record<string, unknown>),
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
  ctx: Partial<Pick<ReactTest, "events" | "root">> = {},
): ReactTest {
  if (!(this instanceof ReactTest))
    return new (ReactTest as unknown as new (
      obj: unknown,
      ctx?: Partial<Pick<ReactTest, "events">>,
    ) => ReactTest)(obj, ctx);

  this.root = null;
  this.events = ctx.events || {};
  const originalWindowAddEventListener = window.addEventListener.bind(window);
  const originalDocumentAddEventListener =
    document.addEventListener.bind(document);

  window.addEventListener = (
    event: string,
    callback: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ) => {
    this.events[event] = this.events[event] || [];
    this.events[event].push(callback as EventHandler);
    originalWindowAddEventListener(
      event,
      callback,
      options as boolean | AddEventListenerOptions,
    );
  };

  document.addEventListener = (
    event: string,
    callback: EventListenerOrEventListenerObject,
  ) => {
    this.events[event] = this.events[event] || [];
    this.events[event].push(callback as EventHandler);
    originalDocumentAddEventListener(event, callback);
  };

  try {
    if (needsRoot(obj)) {
      this.root = createContainer();
      this.nodes = render(this.root, obj);
    } else {
      this.root = ctx.root ?? null;
      this.nodes = (Array.isArray(obj) ? obj : obj ? [obj] : []).filter(
        (o) => typeof o === "object",
      ) as Node[];
    }
  } catch (error) {
    this.nodes = [];
    this.error = error as Error;
  } finally {
    window.addEventListener = originalWindowAddEventListener;
    document.addEventListener = originalDocumentAddEventListener;
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
  new (
    obj: unknown,
    ctx?: Partial<Pick<ReactTest, "events" | "root">>,
  ): ReactTest;
  (obj: unknown, ctx?: Partial<Pick<ReactTest, "events" | "root">>): ReactTest;
  prototype: ReactTest;
};

export default $;
