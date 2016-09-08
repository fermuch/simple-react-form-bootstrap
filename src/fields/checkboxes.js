import React from 'react'
import _ from 'underscore'
import { FieldType } from 'simple-react-form'
import { FormGroup, HelpBlock, ControlLabel, Checkbox } from 'react-bootstrap'

const propTypes = {
  inline: React.PropTypes.bool,
  parentClassName: React.PropTypes.string,
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]).isRequired
  }))
}

const defaultProps = {
  inline: false,
  parentClassName: ''
}

export default class CheckboxesComponent extends FieldType {

  constructor(props) {
    super(props)

    this.state = {
      value: props.value
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value })
  }

  onCheck(value, values) {
    let newValues = []
    if (_.contains(values, value)) {
      newValues = _.without(values, value)
    } else {
      newValues = _.union(values, [value])
    }
    this.props.onChange(newValues)
  }

  getOptions() {
    let options = []
    if (this.props.options) {
      if (typeof this.props.options === 'function') {
        options = this.props.options()
      } else {
        options = this.props.options
      }
    } else if (this.props.fieldSchema && this.props.fieldSchema.allowedValues) {
      let allowedValues = this.props.fieldSchema.allowedValues
      if (typeof allowedValues === 'function') {
        allowedValues = this.props.fieldSchema.allowedValues()
      }
      options = _.map(allowedValues, (allowedValue) => {
        return {
          label: allowedValue,
          value: allowedValue
        }
      })
    } else {
      throw new Error('You must set the options for the radio field')
    }
    return options
  }

  render() {
    const { fieldName, label, errorMessage, inline, parentClassName } = this.props
    const { value } = this.state

    return (
      <FormGroup validationState={errorMessage ? 'error' : undefined}>
        {label ? <ControlLabel>{label}</ControlLabel> : null}
        <div className={parentClassName}>
          {this.getOptions().map((option, i) => (
            <Checkbox
              key={`${fieldName}-${i}`}
              name={fieldName}
              defaultValue={option.value}
              onChange={(event) => this.onCheck(event.target.value, value)}
              checked={_.contains(value, option.value)}
              inline={inline}
              className={_.contains(value, option.value) && 'checked'}
            >
              {option.label}
            </Checkbox>
          ))}
        </div>
        {errorMessage && <HelpBlock>{errorMessage}</HelpBlock>}
      </FormGroup>
    )
  }
}

CheckboxesComponent.propTypes = propTypes
CheckboxesComponent.defaultProps = defaultProps
