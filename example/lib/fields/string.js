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
    console.info(fieldType);
    return (
      <FormGroup
        validationState={this.props.errorMessage ? 'error' : undefined}
      >
        <ControlLabel>{this.props.label}</ControlLabel>
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
          <HelpBlock>Help text with validation state.</HelpBlock>
        }
      </FormGroup>
    );
  }
}

TextFieldComponent.propTypes = propTypes;
TextFieldComponent.defaultProps = defaultProps;

registerType({
  type: 'text',
  component: TextFieldComponent,
});

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
