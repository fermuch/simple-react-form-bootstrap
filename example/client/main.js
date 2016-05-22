import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Field } from 'simple-react-form';
import { Meteor } from 'meteor/meteor';

// register the components
import 'simple-react-form-bootstrap';

class PostsCreate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{padding: '10px', marginBottom: '150px'}}>
        <Form
          autoSave={true}
          logErrors={true}
          onSubmit={(form) => console.info('onSubmit', form)}
        >
          <center>
            <h1>TextFieldComponent</h1>
          </center>
          <Field
            fieldName="string"
            type="string"
            label="String"
            placeholder='type="string"'
          />
          <Field
            fieldName="disabled_string"
            type="string"
            label="Disabled String"
            disabled={true}
            placeholder='type="string" disabled={true}'
          />
          <Field
            fieldName="text"
            type="text"
            label="Text"
            placeholder='type="text"'
          />
          <Field
            fieldName="number"
            type="number"
            label="Number"
            placeholder='type="number"'
          />
          <Field
            fieldName="date"
            type="date"
            label="Date"
          />

          <center>
            <h1>SelectFieldComponent</h1>
          </center>
          <Field
            fieldName="select"
            type="select"
            label="Select"
            placeholder='type="select"'
            options={[
              {label: 'Option A', value: 'a'},
              {label: 'Option B', value: 'b'},
            ]}
          />

          <center>
            <h1>Tags (string-array)</h1>
          </center>
          <Field
            fieldName="string-array"
            type="string-array"
            label="String"
            placeholder='type="string"'
          />
        </Form>
      </div>
    );
  }
}

Meteor.startup(() => {
  ReactDOM.render(<PostsCreate />, document.getElementById('container'));
});
