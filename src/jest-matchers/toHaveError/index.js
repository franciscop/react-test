import { getPlainTag, normalize } from "../../helpers";

export default function toHaveError(frag, expectedMessage) {
  const isAffirmative = !this.isNot;
  frag = normalize(frag);

  // Validate input
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
          frag
        )}`,
    };
  }

  const hasError = !!frag.error;
  const actualMessage = hasError ? frag.error.message : undefined;
  const nodeTag = frag.nodes[0] ? getPlainTag(frag.nodes[0]) : "component";

  if (isAffirmative) {
    // expect().toHaveError()
    if (!hasError) {
      return {
        pass: false,
        message: () => `Expected ${nodeTag} to throw an error, but it did not`,
      };
    }

    // No message provided, just check for any error
    if (expectedMessage === undefined) {
      return {
        pass: true,
        message: () => "Error thrown as expected",
      };
    }

    // Match specific message
    const pass = actualMessage === expectedMessage;
    return {
      pass,
      message: () =>
        pass
          ? "Error message matched"
          : `Expected ${nodeTag} to throw error with message ${this.utils.printExpected(
              expectedMessage
            )}, but got ${this.utils.printReceived(actualMessage)}`,
    };
  } else {
    // expect().not.toHaveError()
    if (hasError) {
      return {
        pass: false,
        message: () =>
          `Expected ${nodeTag} not to throw an error, but it threw: "${actualMessage}"`,
      };
    }

    // No error, as expected
    return {
      pass: true,
      message: () => "No error thrown as expected",
    };
  }
}

// Register with Jest
expect.extend({ toHaveError });
