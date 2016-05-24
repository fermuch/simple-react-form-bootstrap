import React from 'react';
import _ from 'underscore';
// import TextField from 'material-ui/TextField';
import {FieldType, registerType} from 'simple-react-form';
import {FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';
import GMaps from './vendor/gmaps';


const propTypes = {};

const defaultProps = {};

class GeocoderFieldComponent extends FieldType {

  constructor(props) {
    super(props);
    this.state = { value: {
      address: props.value && props.value.address,
      lat: props.value && props.value.lat,
      lng: props.value && props.value.lng
    }};

    this.geoSearch = _.debounce(
      this.geoSearch.bind(this),
      3000
    );
  }

  onChange(event) {
    let newState = {
      ...this.state.value,
      address: event.target.value
    };
    this.setState(newState);
    this.props.onChange(newState);
    this.geoSearch(event.target.value);
  }

  geoSearch(placeName) {
    const self = this;
    GMaps.geocode({
      address: `${placeName}, paso de los libres, argentina`,
      callback(data, status) {
        if (placeName === self.state.value && status === 'OK' && data.length > 0) {
          const geo = data[0].geometry.location;
          console.info({lat: geo.lat(), lng: geo.lng()});
        }
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  render() {
    return (
      <FormGroup
        validationState={this.props.errorMessage ? 'error' : undefined}
      >
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl
          ref='input'
          value={(this.state.value && this.state.value.address) || ''}
          type={'text'}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled}
          onChange={this.onChange.bind(this)}
          onBlur={() => this.props.onChange(this.state.value)}
          componentClass={'input'}
          {...this.passProps}
        />
        {this.props.errorMessage &&
          <HelpBlock>Help text with validation state.</HelpBlock>
        }
      </FormGroup>
    );
  }
}

GeocoderFieldComponent.propTypes = propTypes;
GeocoderFieldComponent.defaultProps = defaultProps;

registerType({
  type: 'geocoder',
  component: GeocoderFieldComponent
});
