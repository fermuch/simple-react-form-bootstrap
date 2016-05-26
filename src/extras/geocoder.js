import React from 'react';
import _ from 'underscore';
// import TextField from 'material-ui/TextField';
import {FieldType, registerType} from 'simple-react-form';
import {FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';
import GMaps from './vendor/gmaps';

import { GoogleMap, Marker } from 'react-google-maps';
import { triggerEvent } from 'react-google-maps/lib/utils';
import { default as ScriptjsLoader } from 'react-google-maps/lib/async/ScriptjsLoader';


const propTypes = {
  zoom: React.PropTypes.number.isRequired,
  center: React.PropTypes.shape({
    lat: React.PropTypes.number.isRequired,
    lng: React.PropTypes.number.isRequired
  }).isRequired,
  restrictTo: React.PropTypes.string
};

const defaultProps = {};

class GeocoderFieldComponent extends FieldType {

  constructor(props, context) {
    super(props, context);
    this.state = {
      value: {
        address: props.value && props.value.address,
        lat: props.value && props.value.lat,
        lng: props.value && props.value.lng
      }
    };

    if (props.value && props.value.lat && props.value.lng) {
      this.state.marker = {
        key: 'default',
        defaultAnimation: 2,
        position: {
          lat: props.value && props.value.lat,
          lng: props.value && props.value.lng
        }
      };
    }

    this.geoSearch = _.debounce(
      this.geoSearch.bind(this),
      200
    );
    this.onWindowResize = _.throttle(
      this.onWindowResize.bind(this),
      500
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

  onMapClick(event) {
    this.setState({
      marker: {
        position: event.latLng,
        defaultAnimation: 2,
        key: Date.now()
      }
    });
    this.props.onChange({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      address: this.state.value && this.state.value.address
    });
  }

  geoSearch(placeName) {
    const self = this;
    GMaps.geocode({
      address: this.props.restrictTo ?
        `${placeName}, ${this.props.restrictTo}` :
        placeName,
      callback(data, status) {
        if (placeName === self.state.value.address && status === 'OK' && data.length > 0) {
          const geo = data[0].geometry.location;
          const newData = {
            lat: geo.lat(),
            lng: geo.lng(),
            address: placeName
          };
          self.setState({
            value: newData
          });
          self.props.onChange(newData);
        }
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    let newState = {
      value: nextProps.value
    };
    if (nextProps.value && nextProps.value.lat && nextProps.value.lng) {
      newState.marker = {
        key: 'default',
        defaultAnimation: 2,
        position: {
          lat: nextProps.value.lat,
          lng: nextProps.value.lng
        }
      };
      this._googleMapComponent.panTo(newState.marker.position);
    }

    this.setState(newState);
  }

  componentDidMount() {
    window.addEventListener(`resize`, this.onWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener(`resize`, this.onWindowResize);
  }

  onWindowResize() {
    triggerEvent(this._googleMapComponent, `resize`);
  }

  render() {
    const {marker} = this.state;

    return (
      <FormGroup
        validationState={this.props.errorMessage ? 'error' : undefined}
      >
        { this.props.label ? <ControlLabel>{this.props.label}</ControlLabel> : null }
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
          <HelpBlock>{this.props.errorMessage}</HelpBlock>
        }
        <ScriptjsLoader
            hostname={"maps.googleapis.com"}
            pathname={"/maps/api/js"}
            query={{v: `3`, libraries: 'geometry,drawing,places'}}
            loadingElement={
              <div>
                Loading...
              </div>
            }
            containerElement={
              <div
                {...this.props}
                style={{
                  height: `100%`,
                  minHeight: `300px`,
                }}
              />
            }
            googleMapElement={
              <GoogleMap
                ref={(map) => (this._googleMapComponent = map)}
                defaultZoom={this.props.zoom}
                defaultCenter={this.props.center}
                onClick={this.onMapClick.bind(this)}
                options={{scrollwheel: false}}
              >
                <Marker
                  {...marker}
                />
              </GoogleMap>
            }
          />
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
