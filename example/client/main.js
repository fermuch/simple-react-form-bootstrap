import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Field } from 'simple-react-form';
import { Meteor } from 'meteor/meteor';

// register the components
import 'simple-react-form-bootstrap';
import 'simple-react-form-bootstrap/lib/extras/geocoder';

class PostsCreate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{padding: '10px', marginBottom: '150px'}}>
        <Form
          autoSave={true}
          logErrors={true}
          onSubmit={(form) => console.info('onSubmit', form)}
        >
          <center>
            <h1>TextFieldComponent</h1>
          </center>
          <Field
            fieldName="string"
            type="string"
            label="String"
            placeholder='type="string"'
            showLabel={true}
          />
          <Field
            fieldName="disabled_string"
            type="string"
            label="Disabled String"
            disabled={true}
            placeholder='type="string" disabled={true}'
            showLabel={true}
          />
          <Field
            fieldName="email"
            type="email"
            label="Email"
            placeholder='type="email"'
            showLabel={true}
          />
          <Field
            fieldName="password"
            type="password"
            label="Password"
            placeholder='type="password"'
            showLabel={true}
          />
          <Field
            fieldName="text"
            type="text"
            label="Text"
            placeholder='type="text"'
            showLabel={true}
          />
          <Field
            fieldName="number"
            type="number"
            label="Number"
            placeholder='type="number"'
            showLabel={true}
          />
          <Field
            fieldName="date"
            type="date"
            label="Date"
            showLabel={true}
          />

          <center>
            <h1>SelectFieldComponent</h1>
          </center>
          <Field
            fieldName="select"
            type="select"
            label="Select"
            placeholder='type="select"'
            showLabel={true}
            options={[
              {label: 'Option A', value: 'a'},
              {label: 'Option B', value: 'b'},
            ]}
          />

          <center>
            <h1>Tags (string-array)</h1>
          </center>
          <Field
            fieldName="string-array"
            type="string-array"
            label="String (array) (with maxTags!)"
            maxTags={2}
            showLabel={true}
          />



          <br /><br /><br /><br />
          <Field
            fieldName="geo"
            type="geocoder"
            label="Geocoder"
            zoom={17}
            center={{
              lat: -29.713710,
              lng: -57.085560
            }}
            showLabel={true}
          />

          <br /><br /><br /><br />
          <Field
            fieldName="datetime"
            type="datetime"
            label="DateTime"
            isValidDate={(currentDate) => {
              // no weekends
              return currentDate.day() !== 0 && currentDate.day() !== 6;
            }}
            showLabel={true}
          />


          <br /><br /><br /><br />
          <Field
            fieldName="autocomplete"
            type="autocomplete"
            label="Autocomplete"
            options={[
              {label: 'Option A', value: 'a'},
              {label: 'Option B', value: 'b'},
            ]}
            multi={false}
            showLabel={true}
          />
        </Form>
      </div>
    );
  }
}

Meteor.startup(() => {
  ReactDOM.render(<PostsCreate />, document.getElementById('container'));
});
