import { getPlainTag, normalize } from "../../helpers/index";

export default function toHaveError(
  this: any,
  frag: any,
  expectedMessage?: string | RegExp,
): { pass: boolean; message: () => string } {
  frag = normalize(frag);

  if (
    !frag ||
    typeof frag !== "object" ||
    !("nodes" in frag) ||
    !("error" in frag)
  ) {
    return {
      pass: false,
      message: () =>
        `Expected a ReactTest instance with .nodes and .error properties, got ${this.utils.printReceived(
          frag,
        )}`,
    };
  }

  const hasError = !!frag.error;
  const actualMessage = hasError ? frag.error.message : undefined;
  const nodeTag = frag.nodes[0] ? getPlainTag(frag.nodes[0]) : "component";

  if (!hasError) {
    return {
      pass: false,
      message: () => `Expected ${nodeTag} to throw an error, but it did not`,
    };
  }

  if (expectedMessage === undefined) {
    return {
      pass: true,
      message: () =>
        `Expected ${nodeTag} not to throw an error, but it threw: "${actualMessage}"`,
    };
  }

  const matches =
    expectedMessage instanceof RegExp
      ? expectedMessage.test(actualMessage ?? "")
      : actualMessage === expectedMessage;

  return {
    pass: matches,
    message: () =>
      matches
        ? `Expected ${nodeTag} not to throw error matching ${this.utils.printExpected(expectedMessage)}`
        : `Expected ${nodeTag} to throw error matching ${this.utils.printExpected(expectedMessage)}, but got ${this.utils.printReceived(actualMessage)}`,
  };
}

// Register with Jest
expect.extend({ toHaveError });
