import Window from "window";
import ReactDOM from "react-dom";

const render = (component) => {
  const window = new Window();

  const container = window.document.createElement("div");
  container.id = "root";
  window.document.body.appendChild(container);

  ReactDOM.render(component, container);

  return [[...container.childNodes], window];
};

// This takes a react object like <Button /> and returns the DOM tree
export default (obj) => {
  if (!obj) return [[]];

  if (["string", "number", "boolean"].includes(typeof obj)) {
    return render(obj);
  }

  // A react instance, so render it to jsdom:
  if (obj.$$typeof) {
    return render(obj);
  }

  // It's already parsed
  return [
    (Array.isArray(obj) ? obj : [obj]).filter((obj) => typeof obj === "object"),
  ];
};
