/**
 * Creates a select list element with Material UI elements.
 *
 * @see https://medium.com/@foxhound87/validate-field-onblur-using-props-bindings-in-mobx-react-form-3de48ba00576
 *
 * Usage:
 * const conditionSelectData = {
 *   label: this.form.$('condition').label,
 *   name: this.form.$('condition').name,
 *   bind: () => ({
 *    value: this.form.$('condition').value,
 *      onChange: formStore.handleSelectChange(this.form.$('condition')),
 *    }),
 *    extra: [
 *      { label: 'New', value: 'new' },
 *      { label: 'Used', value: 'used' }
 *    ]
 *  };
 *
 * <MaterialSelect className="f7 db mb2 mt3 light-silver" field={conditionSelectData} />
 */
import React from 'react';
import { observer } from 'mobx-react';

// Used the create short ids for React components
import shortid from 'shortid';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  customWidth: {
    width: 150,
  },
};

/**
 * handleSelectChange
 * Handles focus change on select fields.
 */
// const handleSelectChange = field => (event: object, key: number, payload: any) => {
//   event.preventDefault();
//   console.log("Previous value: " + field.value);
//   field.value = payload;
//   console.log("New value: " + field.value);
// };

export default observer((
  {
    field,
    className = 'f7 db mb2 mt3 light-silver'
  }) => (
  <div>
    <label
      htmlFor={field.id}
      className={className}
    >
      {field.label}
    </label>
    <SelectField key={shortid.generate()} {...field.bind()}>
      {field.extra.map( ({value, label}) =>
        <MenuItem key={shortid.generate()} value={value} primaryText={label} />
      )}
    </SelectField>
  </div>
));
