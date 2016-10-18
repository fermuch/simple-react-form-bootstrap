import React from 'react';
import { ObjectComponent } from 'simple-react-form';
import { FormGroup, HelpBlock, ControlLabel } from 'react-bootstrap';

class BootstrapObject extends ObjectComponent {
  render() {
    return (
      <FormGroup validationState={this.props.errorMessage ? 'error' : undefined}>
        {this.props.label ? <ControlLabel>{this.props.label}</ControlLabel> : null}
        <div className={this.props.parentClassName}>
          {this.getChildrenComponents()}
        </div>
        {this.props.errorMessage && <HelpBlock>{this.props.errorMessage}</HelpBlock>}
      </FormGroup>
    );
  }
}

BootstrapObject.propTypes = {
  ...ObjectComponent.propTypes,
  parentClassName: React.PropTypes.string
};

BootstrapObject.defaultProps = {
  ...ObjectComponent.defaultProps,
  parentClassName: ''
};

export {
  BootstrapObject as ObjectField
};
