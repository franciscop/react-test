### .attr()

Read the attributes of the first matched element:

```js
.attr("name")
```

It will read the attributes of the matched elements:

```js
const $input = $(<input name="email" placeholder="me@example.com" />);
expect($input.attr("name")).toBe("email");
expect($input.attr("placeholder")).toBe("me@example.com");
```

You can select items with a CSS selector that matches attributes:

```js
const $form = $(<LoginForm />);
const $firstName = $form.find('[name="firstname"]');
expect($firstName).toHaveValue("");
await $firstName.type("John");
expect($firstName).toHaveValue("John");
```

If you are asserting things, you might prefer [`.toHaveAttribute()`](#tohaveattribute) instead of the above:

```js
const $input = $(<input name="email" placeholder="me@example.com" />);
expect($input).toHaveAttribute("name", "email");
expect($input).toHaveAttribute("placeholder", "me@example.com");
```

#### Example: external links have "noopener noreferrer"

This security feature makes sure no one can hijack your page's data:

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
