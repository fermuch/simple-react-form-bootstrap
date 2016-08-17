import React from 'react';
// import _ from 'underscore';
// import TextField from 'material-ui/TextField';
import {FieldType, registerType} from 'simple-react-form';
import {FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';
import DateTime from 'react-datetime';
// import 'react-datetime/css/react-datetime.css';

const propTypes = {};

const defaultProps = {};

class DateTimeFieldComponent extends FieldType {

  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  onChange(date) {
    if (date) {
      this.setState({ value: date.toDate() });
      this.props.onChange(date.toDate());
      return;
    }

    this.setState({ value: null });
    this.props.onChange(null);
    return null;
  }

  render() {
    return (
      <FormGroup
        validationState={this.props.errorMessage ? 'error' : undefined}
      >
        { this.props.label ? <ControlLabel>{this.props.label}</ControlLabel> : null }
        <DateTime
          ref='input'
          dateTime={this.state.value}
          onChange={this.onChange.bind(this)}
          onBlur={() => this.props.onChange(this.state.value)}
          value={this.state.value}
          {...this.passProps}
        />
        {this.props.errorMessage &&
          <HelpBlock>{this.props.errorMessage}</HelpBlock>
        }
      </FormGroup>
    );
  }
}

DateTimeFieldComponent.propTypes = propTypes;
DateTimeFieldComponent.defaultProps = defaultProps;

registerType({
  type: 'datetime',
  component: DateTimeFieldComponent,
  allowedTypes: [ Date, String ],
  description: 'Simple select field.'
});

export {
  DateTimeFieldComponent as DatetimeField
};
