import {
  TextField,
  TextareaField,
  NumberField,
  DateField,
  EmailField,
  PasswordField,
  ColorField
} from './fields/string.js';
import {
  SelectField
} from './fields/select.js';
import {
  TagsField
} from './fields/tags.js';
import {
  DatetimeField
} from './fields/datetime.js';
import {
  AutocompleteField
} from './fields/autocomplete.js';
import RadioField from './fields/radio.js';
import CheckboxesField from './fields/checkboxes.js';
import {
  AutocompleteField
} from './fields/autocomplete.js';
import { ArrayField } from './fields/array.js';
import { ObjectField } from './fields/object.js';

import {registerType} from 'simple-react-form';

const registerTypes = () => {
  registerType({
    type: 'string',
    component: TextField,
  });
  registerType({
    type: 'text',
    component: TextField,
  });
  registerType({
    type: 'textarea',
    component: TextareaField,
  });
  registerType({
    type: 'number',
    component: NumberField,
  });
  registerType({
    type: 'date',
    component: DateField,
  });
  registerType({
    type: 'email',
    component: EmailField,
  });
  registerType({
    type: 'password',
    component: PasswordField,
  });
  registerType({
    type: 'color',
    component: ColorField,
  });
  registerType({
    type: 'autocomplete',
    component: AutocompleteField,
    allowedTypes: [ String, [ String ] ]
  });
  registerType({
    type: 'tags',
    component: TagsField,
  });
  registerType({
    type: 'string-array',
    component: TagsField,
  });
  registerType({
    type: 'array',
    component: ArrayField,
  });
  registerType({
    type: 'object',
    component: ObjectField
  });
  registerType({
    type: 'select',
    component: SelectField,
    allowedTypes: [ String, Number ]
  });
  registerType({
    type: 'datetime',
    component: DatetimeField,
    allowedTypes: [ Date, String ]
  });
  registerType({
    type: 'radio',
    component: RadioField
  });
  registerType({
    type: 'multiple-checkbox',
    component: CheckboxesField
  });
};
export default registerTypes;

export {
  TextField,
  TextareaField,
  NumberField,
  DateField,
  EmailField,
  PasswordField,
  ColorField,
  SelectField,
  TagsField,
  DatetimeField,
  AutocompleteField,
  RadioField,
  CheckboxesField,
  ArrayField,
  ObjectField
};
