# Contributing

Thanks for contributing! We are actively looking for people who want to get started contributing to Open Source. Please feel free to open issues with questions or ask for clarification.

To get started contributing, first you have to get the repo working in your computer:

1. Clone the repository: `git clone git://github.com/franciscop/react-test.git && cd ./react-test`
1. Install the dependencies: `npm install`
1. Start watching the tests `npm start`
1. Modify any file within `/src` (code, tests or documentation)

After these steps, the library, tests and documentation will be automatically built each time a change is saved. Please try not to make a PR with broken tests.

## New methods

There are currently some new methods [suggested in the issues](https://github.com/franciscop/react-test/issues). Please contribute to any of those, on a first come first served basis.

To allow for more people to get started as contributors, please limit your contributions to **2 methods**. If you want more, please feel free to open an issue and I can give some slightly more difficult tasks.

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
  expect($button.children().first().nodeName).toBe("BUTTON");
  expect($button.html()).toBe("<button>Hello</button>");
});
```

## About "Up For Grabs"

I've been doing OSS for ~10 years and it has been immensely useful for me in many ways, so I'd love to help others get started. Reviewing the PRs is a bit more work than implementing the code myself, but that's not an issue as long as I can help others.

I've done an "up for grabs" before with [Umbrella JS](https://umbrellajs.com/), and the experience has been quite good. Unfortunately I'm not supporting that project anymore so issues are not visible there.
