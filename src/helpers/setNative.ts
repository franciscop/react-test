// [INTERNAL USE ONLY]
// Set through the prototype's setter, since React ignores values set directly
export default (el: any, key: string, value: unknown) => {
  const desc = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), key);
  if (desc?.set) desc.set.call(el, value);
  else Object.defineProperty(el, key, { value, configurable: true });
};
