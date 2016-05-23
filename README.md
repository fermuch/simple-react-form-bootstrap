# simple-react-form-bootstrap

Bootstrap fields for [simple-react-form][]. Based on [react-bootstrap][].

`npm install simple-react-form-bootstrap --save`

[Demo](https://simple-react-form-bootstrap.herokuapp.com) | [Source](https://github.com/fermuch/simple-react-form-bootstrap/tree/master/example)

## How to use

Check out [simple-react-form](https://github.com/nicolaslopezj/simple-react-form/#installation), but instead of using
`simple-react-form-material-ui` you use `simple-react-form-bootstrap`.

## Fields
* **TextFieldComponent**:
```jsx
  // available types:
  // - string, textarea, number, date
  <Field
    type="string"
    fieldName="author"
    label="Author Name"
  />
```

* **SelectFieldComponent**
```jsx
  <Field
    type="select"
    fieldName="sex"
    label="Sex"
    options={[
      {label: 'Male', value: 'male'},
      {label: 'Female', value: 'female'},
    ]}
  />
```

* **Tags**
```jsx
  // NOTE: if you use [String] in SimpleSchema, it will render this widget.
  // NOTE: you'll need to add some css. Check out: https://github.com/olahol/react-tagsinput#styling
  <Field
    fieldName="string-array"
    type="string-array"
    label="String (array) (with maxTags!)"
    maxTags={2}
  />
```



[simple-react-form]: https://github.com/nicolaslopezj/simple-react-form/
[react-bootstrap]: https://react-bootstrap.github.io
