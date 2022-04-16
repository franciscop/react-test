### .text()

Retrieve the textContent of the elements:

```js
.text()
```

Whitespace is normalized for easy comparison:

```js
$(
  <div>
    Hello <br /> world
  </div>
).text();
// "Hello world"
```
