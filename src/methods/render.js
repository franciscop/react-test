const Window = require("window");
const ReactDOM = require("react-dom");

const render = component => {
  const window = new Window();

  const container = window.document.createElement("div");
  container.id = "root";
  window.document.body.appendChild(container);

  ReactDOM.render(component, container);

  return container.childNodes[0];
};

// This takes a react object like <Button /> and returns the DOM tree
export default obj => {
  if (!obj) return [];

  // A react instance, so render it to jsdom:
  if (obj.$$typeof) {
    return [render(obj)];
  }

  // It's already parsed
  return (Array.isArray(obj) ? obj : [obj]).filter(
    obj => typeof obj === "object"
  );
};
