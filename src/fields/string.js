import React from 'react';
// import TextField from 'material-ui/TextField';
import {FieldType, registerType} from 'simple-react-form';
import {FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';

const propTypes = {
  changeOnKeyDown: React.PropTypes.bool,
  fieldType: React.PropTypes.string
};

const defaultProps = {
  changeOnKeyDown: true
};

class TextFieldComponent extends FieldType {

  constructor(props) {
    super(props);
    this.type = props.type || 'text';
    this.state = { value: props.value };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  onKeyDown(event) {
    if (event.keyCode === 13) {
      this.props.onChange(this.state.value);
    }
  }

  onChange(event) {
    this.setState({ value: event.target.value });
    if (this.props.changeOnKeyDown) {
      this.props.onChange(event.target.value);
    }
  }

  render() {
    var fieldType = this.props.fieldType || this.type;
    return (
      <FormGroup
        validationState={this.props.errorMessage ? 'error' : undefined}
      >
        { this.props.label ? <ControlLabel>{this.props.label}</ControlLabel> : null }
        <FormControl
          ref='input'
          value={this.state.value || ''}
          type={fieldType}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled}
          onChange={this.onChange.bind(this)}
          onKeyDown={this.onKeyDown.bind(this)}
          onBlur={() => this.props.onChange(this.state.value)}
          componentClass={fieldType === 'text' ? 'textarea' : 'input'}
          {...this.passProps}
        />
        {this.props.errorMessage &&
          <HelpBlock>{this.props.errorMessage}</HelpBlock>
        }
      </FormGroup>
    );
  }
}

TextFieldComponent.propTypes = propTypes;
TextFieldComponent.defaultProps = defaultProps;

// text
registerType({
  type: 'text',
  component: TextFieldComponent,
});


// string
class StringFieldComponent extends TextFieldComponent {
  constructor(props) {
    super(props);
    this.type = 'string';
  }
}
registerType({
  type: 'string',
  component: StringFieldComponent,
});


// number
class NumberFieldComponent extends TextFieldComponent {
  constructor(props) {
    super(props);
    this.type = 'number';
  }
}
registerType({
  type: 'number',
  component: NumberFieldComponent,
});


// date
class DateFieldComponent extends TextFieldComponent {
  constructor(props) {
    super(props);
    this.type = 'date';
  }
}
registerType({
  type: 'date',
  component: DateFieldComponent,
});

// email
class EmailFieldComponent extends TextFieldComponent {
  constructor(props) {
    super(props);
    this.type = 'email';
  }
}
registerType({
  type: 'email',
  component: EmailFieldComponent,
});

// password
class PasswordFieldComponent extends TextFieldComponent {
  constructor(props) {
    super(props);
    this.type = 'password';
  }
}
registerType({
  type: 'password',
  component: PasswordFieldComponent,
});

// color
class ColorFieldComponent extends TextFieldComponent {
  constructor(props) {
    super(props);
    this.type = 'color';
  }
}
registerType({
  type: 'color',
  component: ColorFieldComponent,
});
