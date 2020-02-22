### .attr()

Read the attributes for the first matched element:

```js
.attr("name")
```

It will read the attributes of the matched elements:

```js
const $input = $(<input name="email" placeholder="me@example.com" />);
expect($input.attr("name")).toBe("email");
expect($input.attr("placeholder")).toBe("me@example.com");
```



#### Example: external links have "noopener noreferrer"

```js
// Find all of the external links first
const $links = $(<Page />).find("a[target=_blank]");

// Get an array witth the rel= attributes
const rels = $links.toArray().map(link => $(link).attr("rel"));

// Make sure they follow the schema
for (let rel of rels) {
  expect(rel).toBe("noopener noreferrer");
}
```

TODO: with shortname:

```js
// Find all of the external links first
const $links = $(<Page />).find("a[target=_blank]");

// Make sure they *all* have rel="noopener noreferrer"
expect($links).toHaveAttribute('rel', 'noopener noreferrer');
```
