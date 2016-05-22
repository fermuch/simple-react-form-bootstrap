import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Field } from 'simple-react-form';
import {Meteor} from 'meteor/meteor';

import '../lib';

class PostsCreate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Form
        state={this.state}
        logErrors={true}
        autoSave={true}
        onChange={({ title, body }) => this.setState({ title, body })}
        onSubmit={(form) => console.info('onSubmit', form)}
      >
        {/* TextFieldComponent */}
        <Field fieldName="string" type="string" label="String" />
        <Field fieldName="string" type="string" label="Disabled String" disabled={true} />
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
