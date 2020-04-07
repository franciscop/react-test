### .toBeEnabled()

Check whether none of the matched elements have the attribute "disabled":

```js
const $button = $(<button />);
const $input = $(<input disabled />);

expect($button).toBeEnabled();
expect($input).not.toBeEnabled();
```

For a list of items, it checks whether **all of them are enabled** or **all of them are disabled**:

```js
const $form = $(
  <form>
    <input id="banana" />
    <input id="orange" />

    <textarea id="apple" />
    <textarea id="pear" disabled />

    <button id="mango" disabled />
    <button id="coconut" disabled />
  </form>
);

// All of them are enabled
expect($form.find("input")).toBeEnabled();

// All of them are disabled
expect($form.find("button")).not.toBeEnabled();
```

For the same React code, these **do not pass**:

```js
// ERROR! Only one of them is enabled
expect($form.find("textarea")).toBeEnabled();
// Expected <textarea id="pear" disabled=""> not to include the attribute "disabled"

// ERROR! At least one of them is enabled
expect($form.find("textarea")).not.toBeEnabled();
// Expected <textarea id="apple"> to include the attribute "disabled"
```
