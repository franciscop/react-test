# Contributing

Thanks for contributing! We are actively looking for people who want to get started contributing to Open Source. Please feel free to open issues with questions or ask for clarification.

To get started contributing, first you have to get the repo working in your computer. We recommend following this guide:

[**A Step by Step Guide to Making Your First GitHub Contribution**](https://codeburst.io/a-step-by-step-guide-to-making-your-first-github-contribution-5302260a2940).

Once you have the repository locally and inside the repo folder with the terminal, you can install and test it with node.js/npm:

1. Install the dependencies: `npm install`
1. Start watching the tests `npm start`
1. Modify any file within `/src` (code or tests)

This will run the tests on any change, making sure nothing breaks. Please try not to make a PR with broken tests (but if you cannot make it work, it's okay).

The documentation is a plain `readme.md` in the same folder as the code, and to see the websitet in the browser you can run:

1. For editing the documentation: `npm run docs`

This will run a local server, launch the browser page and rebuild+reload when any `readme.md` changes.

## New methods

There are currently some new methods [suggested in the issues](https://github.com/franciscop/react-test/labels/good%20first%20issue). Please contribute to any of those, on a first come first served basis.

Every method is inside a single folder, and this folder contains 3 files:

- `index.js`: the implementation of the method.
- `test.js`: the javascript tests that will run with `npm start` and `npm test`.
- `readme.md`: the documentation of the method including intro, parameters, examples, etc.

To allow for more people to get started as contributors, please limit your contributions to **2 methods** (one per Pull Request). If you want more, please feel free to open an issue and I can give some slightly more difficult tasks.

You can follow some of the existing methods in src/[METHOD]. We'd recommended to copy one of the existing ones and modify the files to have a base to get started, like `.children()`.

## Testing

Tests should make sure that the feature work, with some diverse examples if possible. The normal flow is defining some component to be tested, then execute some operation against it and assert the result:

```js
it("Has the correct html without selector", async () => {
  const $hello = $(
    <div>
      <button>Hello</button>
    </div>
  );
  expect($hello.children().first().nodeName).toBe("BUTTON");
});
```

You can also keep it in a variable if you want to assert multiple things:

```js
it("Has the correct html without selector", async () => {
  const $hello = $(
    <div>
      <button>Hello</button>
    </div>
  );
  const $button = $hello.children();
  expect($button.first().nodeName).toBe("BUTTON");
  expect($button.text()).toBe("Hello");
});
```

## About "Up For Grabs"

I've been doing OSS for ~10 years and it has been immensely useful for me in many ways, so I'd love to help others get started. Reviewing the PRs is a bit more work than implementing the code myself, but that's not an issue as long as I can help others.

I've done an "up for grabs" before with [Umbrella JS](https://umbrellajs.com/), and the experience has been quite good. Unfortunately I'm not supporting that project anymore so issues are not visible there.
