import React from 'react';
import { FormGroup, HelpBlock, Button, ControlLabel } from 'react-bootstrap';
import { ArrayComponent } from 'simple-react-form';

class BootstrapArray extends ArrayComponent {

  renderChildrenItem({ index, children }) {
    return (
      <div className={this.props.childrenClassName} key={`${this.props.fieldName}.${index}`}>
        <div className="col-sm-11">
        {this.renderChildrenItemWithContext({index, children})}
        </div>
        <div className="col-sm-1 text-right">
          {this.renderRemoveButton(index)}
        </div>
      </div>
    );
  }

  renderRemoveButton(index) {
    if (this.props.disabled) {
      return;
    }
    return (
      <Button bsStyle="danger" onClick={() => this.removeItem(index)}>
        <i className={this.props.removeButtonIcon} />
      </Button>
    );
  }

  renderAddButton() {
    if (!this.props.showAddButton) {
      return;
    }
    if (this.props.disabled) {
      return;
    }
    return (
      <Button bsStyle="primary" onClick={() => this.addItem()}>
        <i className={this.props.addButtonIcon} />
      </Button>
    );
  }

  render() {
    return (
      <FormGroup validationState={this.props.errorMessage ? 'error' : undefined}>
        {this.props.label ? <ControlLabel>{this.props.label}</ControlLabel> : null}
        <div className={this.props.parentClassName}>
          {this.renderChildren()}
        </div>
        <div>
          {this.renderAddButton()}
        </div>
        {this.props.errorMessage && <HelpBlock>{this.props.errorMessage}</HelpBlock>}
      </FormGroup>
    );
  }
}

BootstrapArray.propTypes = {
  ...ArrayComponent.propTypes,
  parentClassName: React.PropTypes.string,
  childrenClassName: React.PropTypes.string,
  addButtonIcon: React.PropTypes.string,
  removeButtonIcon: React.PropTypes.string
};

BootstrapArray.defaultProps = {
  ...ArrayComponent.defaultProps,
  parentClassName: '',
  childrenClassName: 'row',
  addButtonIcon: 'fa fa-plus',
  removeButtonIcon: 'fa fa-minus'
};

export {
  BootstrapArray as ArrayField
};
