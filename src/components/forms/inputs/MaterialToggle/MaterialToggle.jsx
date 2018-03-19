/**
 * Usage:
 *
 * const handleToggle = (event: object, isInputChecked: bool) => {
 *   let field = this.form.$(event.target.name);
 *   console.log("Previous value: " + field.value);
 *   field.value = isInputChecked;
 *   console.log("New value: " + field.value);
 * };
 * let toggleData = {
 *    label: form.$('stillOwn').label,
 *    name: form.$('stillOwn').name,
 *    id: form.$('stillOwn').value,
 *    onToggle: handleToggle,
 *    bind: () => ({
 *      value: form.$('stillOwn').value
 *    })
 * };
 *
 * <MaterialToggle field={toggleData} />
 */

import React from 'react';
import { observer } from 'mobx-react';
import Toggle from 'material-ui/Toggle';

export default observer(({
  onToggle = (event: object, isInputChecked: bool) => {
    console.log(event);
    console.log(isInputChecked);
  },
  field
}) => (
  <div>
    <br />
    <Toggle
      labelPosition="right"
      label={field.label}
      name={field.name}
      defaultToggled={field.value}
      // defaultToggled={field.value}
      // The following should be handled via bind.
      onToggle={onToggle}
      // onFocus={field.onFocus}
      // onBlur={field.onBlur}
      {...field.bind({

      })}
    />
    <small
      id="name-desc"
      className="f7 black-60 db mt1 mb3 red"
    >
      {field.error}
    </small>
  </div>
));
