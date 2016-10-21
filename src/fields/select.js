import React from 'react';
import _ from 'underscore';
// import TextField from 'material-ui/TextField';
import {FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';

const propTypes = {
  /**
   * The options for the select input. Each item must have label and value.
   */
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]).isRequired,
  }))
};

const defaultProps = {};

class SelectFieldComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  onChange(event) {
    this.setState({ value: event.target.value });
    this.props.onChange(event.target.value);
  }

  renderItems() {
    let options = null;
    if (this.props.options) {
      options = this.props.options;
    } else if (this.props.fieldSchema && this.props.fieldSchema.allowedValues) {
      let allowedValues = this.props.fieldSchema.allowedValues;
      if (typeof allowedValues === 'function') {
        allowedValues = this.props.fieldSchema.allowedValues();
      }
      options = _.map(allowedValues, function (allowedValue) {
        return {
          label: allowedValue,
          value: allowedValue,
        };
      });
    } else {
      throw new Error('You must set the options for the select field');
    }

    return options.map((item) => {
      return <option key={item.value} value={item.value}>{item.label}</option>;
    });
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
          placeholder={this.props.placeholder || this.props.passProps.placeholder}
          disabled={this.props.disabled}
          onChange={this.onChange.bind(this)}
          onBlur={() => this.props.onChange(this.state.value)}
          componentClass="select"
          {...this.props.passProps}
        >
          {this.renderItems()}
        </FormControl>
        {this.props.errorMessage &&
          <HelpBlock>{this.props.errorMessage}</HelpBlock>
        }
      </FormGroup>
    );
  }
}

SelectFieldComponent.propTypes = propTypes;
SelectFieldComponent.defaultProps = defaultProps;

export {
  SelectFieldComponent as SelectField
};
