### .attr()

```js
.attr(name) -> String|null
```

Read the attribute value of the first node and return its value:

```js
it("can read the different attributes of an input", async () => {
  const input = $(<input name="email" defaultValue="" disabled />);
  expect(input.attr("name")).toBe("email");
  expect(input.attr("value")).toBe("");
  expect(input.attr("disabled")).toBe("");
  expect(input.attr("placeholder")).toBe(null);
});
```

#### Parameters

`name` (required): the name of the attribute to select.

#### Return

`String|null`: the value of the attribute, or null if the attribute is not set at all.

#### Examples

All the possible returns for different situations:

```js
const input = $(<input name="email" defaultValue="" disabled />);
expect(input.attr("name")).toBe("email");
expect(input.attr("value")).toBe("");
expect(input.attr("disabled")).toBe("");
expect(input.attr("placeholder")).toBe(null);
```

- `input.attr("name")`: returns `"email"`, since it has a key and string value.
- `input.attr("value")`: returns `""`, since the value (defaultValue) is set but empty.
- `input.attr("disabled")`: returns `""`, since a boolean attribute value defaults to an empty string.
- `input.attr("placeholder")`: returns `null`, since the attribute is not set at all.

Find `.find()` to find a specific attribute, use the attribute selector:

```js
const $form = $(<LoginForm />);
const $firstName = $form.find('[name="firstname"]');
expect($firstName).toHaveValue("");
await $firstName.type("John");
expect($firstName).toHaveValue("John");
```

Check all external links have the `"noopener noreferrer"` value for `rel`:

```js
// Find all of the external links first
const $links = $(<Page />).find("a[target=_blank]");

// Make sure they follow the schema
for (let link of $links) {
  expect($(link).attr("rel")).toBe("noopener noreferrer");
}
```

When [`.toHaveAttribute()`](#tohaveattribute) is available, you can shorten it:

```js
// Find all of the external links first
const $links = $(<Page />).find("a[target=_blank]");

// Make sure they *all* have rel="noopener noreferrer"
expect($links).toHaveAttribute("rel", "noopener noreferrer");
```

If you are asserting things, you might prefer [`.toHaveAttribute()`](#tohaveattribute) instead of the above:

```js
const $input = $(<input name="email" placeholder="me@example.com" />);
expect($input).toHaveAttribute("name", "email");
expect($input).toHaveAttribute("placeholder", "me@example.com");
```

#### Related

- `expect().toHaveAttribute()`: Jest Matcher to check that the element(s) matched have the specified attribuye and/or value.
