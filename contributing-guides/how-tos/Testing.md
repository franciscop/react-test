## Testing

Tests should make sure that the feature works, with some diverse examples if possible. The normal flow is defining some component to be tested, then execute some operation against it and assert the result:

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
