### .text()

```js
.text() -> String
```

Get the textContent of the first matched node:

```js
it("can get the simple text", () => {
  const greeting = $(
    <div>
      Hello <br /> world
    </div>
  );
  expect(greeting.text()).toBe("Hello world");
});
```
