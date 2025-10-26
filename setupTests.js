// setupTests.js
// This file runs after the test environment is set up and ensures jsdom globals are available.

// Manually require jsdom-global to inject window, document, etc., if not already present.
// This helps in cases where the environment loads asynchronously or has timing issues.
require("jsdom-global")();

// Optional: Verify that document is available
if (!document) {
  throw new Error("jsdom failed to initialize document");
}

// You can add other global setups here if needed, e.g., mocking browser APIs.
