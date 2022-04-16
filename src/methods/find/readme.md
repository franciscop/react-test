### .find()

Get all of the descendants of the nodes with an optional filter

```js
.find(filter);
```

#### Parameters

`filter`: a string containing a selector that nodes must pass or a function that return a boolean. See [.filter()](#filter) for a better explanation

#### Return

An instance of React Test with the new children as nodes

#### Examples

Find all the links in the contact page:

```js
$(<ContactPage />).find("a");
```

Get the required fields within a submitting form:

```
u('form').on('submit', function(e){
  var required = u(this).find('[required]');
});
```
