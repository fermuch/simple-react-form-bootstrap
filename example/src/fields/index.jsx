import React from 'react';
import { Form, Field } from 'simple-react-form';
import Text, {
  TextareaField,
  NumberField,
  DateField,
  PasswordField,
  ColorField
} from 'simple-react-form-bootstrap/lib/fields/string';

// load the CSS
import './styles.css';

class FieldsDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.renderFormState = this.renderFormState.bind(this);
  }

  renderFormState() {
    return (
      <div>
        Form state:
        <pre>{JSON.stringify(this.state, undefined, 2)}</pre>
      </div>
    );
  }

  render() {
    return (
      <div className="demos">
        <h1>Field demos</h1>
        {this.renderFormState()}
        <Form state={this.state} onChange={changes => this.setState(changes)}>
          <h2>String field</h2>
          <Field
            fieldName='string_01'
            label='Normal'
            type={Text}
          />
          <Field
            fieldName='string_02_1'
            label='changeOnKeyDown=false (press enter to update the state)'
            changeOnKeyDown={false}
            type={Text}
          />
          <Field
            fieldName='string_02_2'
            label='Placeholder'
            placeholder='I am a placeholder'
            type={Text}
          />
          <Field
            fieldName='string_02_3'
            label='Disabled'
            disabled={true}
            type={Text}
          />
          <Field
            fieldName='string_03'
            label='Validation error'
            /*
              ErrorMessage is normally set by simple-react-form,
              there is no need to set it manually.
            */
            errorMessage="Foobar this is an error"
            type={Text}
          />
          <h3>The String field also comes with other types of fields</h3>
          <Field
            fieldName='string_04'
            label='Textarea'
            type={TextareaField}
          />
          <Field
            fieldName='string_05'
            label='Number'
            type={NumberField}
          />
          <Field
            fieldName='string_06'
            label="Date"
            type={DateField}
          />
          <Field
            fieldName='string_07'
            label="Password"
            type={PasswordField}
          />
          <Field
            fieldName='string_08'
            label="Color"
            type={ColorField}
          />
        </Form>
        {this.renderFormState()}
      </div>
    );
  }
}

export default FieldsDemo;
