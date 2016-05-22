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
        onChange={({ title, body }) => this.setState({ title, body })}
      >
        <Field fieldName="title" type="string" label="Title" placeholder="just text here!"/>
      </Form>
    );
  }
}

Meteor.startup(() => {
  ReactDOM.render(<PostsCreate />, document.getElementById('container'));
});
