import ReactJSDOM from "react-jsdom";

// This takes a react object like <Button /> and returns the DOM tree
export default obj => {
  if (!obj) return [];

  // A react instance, so render it to jsdom:
  if (obj.$$typeof) {
    return [ReactJSDOM.render(obj)];
  }

  // It's already parsed
  return (Array.isArray(obj) ? obj : [obj]).filter(
    obj => typeof obj === "object"
  );
};
