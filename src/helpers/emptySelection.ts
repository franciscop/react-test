// [INTERNAL USE ONLY]
// Fails both `expect()` and `expect().not`, since there is nothing to check
export default (isNot: boolean | undefined, matcher: string) => {
  const msg = `Expected an element for .${matcher}(), but the selection is empty`;
  return { pass: !!isNot, message: () => msg };
};
