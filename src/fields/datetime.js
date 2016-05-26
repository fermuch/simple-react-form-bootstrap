import React from 'react';
// import _ from 'underscore';
// import TextField from 'material-ui/TextField';
import {FieldType, registerType} from 'simple-react-form';
import {FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';
import 'react-bootstrap-datetimepicker/css/bootstrap-datetimepicker.css';

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
    this.setState({ value: date });
    this.props.onChange(date);
  }

  render() {
    return (
      <FormGroup
        validationState={this.props.errorMessage ? 'error' : undefined}
      >
        { this.props.showLabel ? <ControlLabel>{this.props.label}</ControlLabel> : null }
        <DateTimeField
          ref='input'
          dateTime={this.state.value}
          onChange={this.onChange.bind(this)}
          onBlur={() => this.props.onChange(this.state.value)}
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
