import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Field } from 'simple-react-form';
import {Meteor} from 'meteor/meteor';

// register the components
import 'simple-react-form-bootstrap';

class PostsCreate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Form
        logErrors={true}
        autoSave={true}
        onSubmit={(form) => console.info('onSubmit', form)}
      >
        {/* TextFieldComponent */}
        <Field fieldName="string" type="string" label="String" />
        <Field fieldName="disabled_string" type="string" label="Disabled String" disabled={true} />
        <Field fieldName="text" type="text" label="Text" />
        <Field fieldName="number" type="number" label="Number" />
        <Field fieldName="date" type="date" label="Date" />
      </Form>
    );
  }
}

Meteor.startup(() => {
  ReactDOM.render(<PostsCreate />, document.getElementById('container'));
});
