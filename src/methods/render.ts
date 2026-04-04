import React from "react";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";

declare global {
  // eslint-disable-next-line no-var
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}

global.IS_REACT_ACT_ENVIRONMENT = true;

interface RenderContainer extends HTMLDivElement {
  root: Root;
  render: (component: React.ReactNode) => void;
  component: React.ReactElement;
}

const createCatcher = () => {
  class Catcher extends React.Component<
    { children?: React.ReactNode },
    { error: Error | null }
  > {
    static error: Error | undefined;

    constructor(props: { children?: React.ReactNode }) {
      super(props);
      this.state = { error: null };
      window.addEventListener("error", this.onError.bind(this));
    }
    static getDerivedStateFromError(error: Error) {
      return { error };
    }
    componentWillUnmount() {
      window.removeEventListener("error", this.onError);
    }
    onError(event: ErrorEvent) {
      // This elevates the errors from local in the render tree
      // to global in the test level
      event.preventDefault();
      this.componentDidCatch(event.error);
    }
    componentDidCatch(error: Error) {
      Catcher.error = error;
    }
    render() {
      if (this.state && this.state.error) return null;
      return this.props.children;
    }
  }

  return Catcher;
};

const createContainer = (): RenderContainer => {
  const Catcher = createCatcher();
  const container = window.document.createElement("div") as RenderContainer;
  container.id = "root";
  window.document.body.appendChild(container);
  const root = createRoot(container);
  container.root = root;

  // Render the component and catch any error during this rendering
  container.render = (component) => {
    container.component = component as React.ReactElement;
    const comp = React.createElement(Catcher, null, component);
    act(() => root.render(comp));
    if (Catcher.error) {
      act(() => root.unmount());
      throw Catcher.error;
    }
  };

  return container;
};

// This takes a react object like <Button /> and returns the DOM tree
export default (obj?: unknown): Node[] => {
  if (!obj) return [];

  // A react instance or a plain value, so render it to jsdom:
  if (
    (obj as Record<string, unknown>).$$typeof ||
    ["string", "number", "boolean"].includes(typeof obj)
  ) {
    const container = createContainer();
    container.render(obj as React.ReactNode);
    return [...container.childNodes];
  }

  // It's already parsed
  return (Array.isArray(obj) ? obj : [obj]).filter(
    (obj) => typeof obj === "object"
  ) as Node[];
};
