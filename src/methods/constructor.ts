import type { ReactNode } from "react";

import { createContainer, type RenderContainer } from "./render";

const needsRoot = (obj: unknown): boolean =>
  ["string", "number", "boolean"].includes(typeof obj) ||
  Boolean((obj as Record<string, unknown>).$$typeof);

export interface ReactTest {
  root: RenderContainer | null;
  nodes: Node[];
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
  ctx: Partial<Pick<ReactTest, "root">> = {},
): ReactTest {
  if (!(this instanceof ReactTest))
    return new (ReactTest as unknown as new (
      obj: unknown,
      ctx?: Partial<Pick<ReactTest, "root">>,
    ) => ReactTest)(obj, ctx);

  this.root = null;
  try {
    if (needsRoot(obj)) {
      this.root = createContainer();
      this.root.render(obj as ReactNode);
      // React can replace the top-level elements, so read them from the root
      Object.defineProperty(this, "nodes", {
        get: () => {
          if (!this.root) return [];
          if (!this.root.isConnected) return this.root.snapshot ?? [];
          return [...this.root.childNodes];
        },
        enumerable: true,
      });
    } else {
      this.root = ctx.root ?? null;
      this.nodes = (Array.isArray(obj) ? obj : obj ? [obj] : []).filter(
        (o) => typeof o === "object",
      ) as Node[];
    }
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
  new (obj: unknown, ctx?: Partial<Pick<ReactTest, "root">>): ReactTest;
  (obj: unknown, ctx?: Partial<Pick<ReactTest, "root">>): ReactTest;
  prototype: ReactTest;
};

export default $;
