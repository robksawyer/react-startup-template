/**
 * Allows the user to select a date on a form.
 * @see https://jquense.github.io/react-widgets/docs/#/datetime-picker?_k=8lap34
 *
 * Usage:
 *
 * const handleDateChange = field =>  (value: Date) => {
 *   console.log("Previous value: " + field.value);
 *   field.value = value;
 *   console.log("New value: " + field.value);
 * };
 * let datePickerData = {
 *    label: 'PurchaseDate',
 *    name:'datePurchased',
 *    id: 'datePurchased-1',
 *    bind: ()=> ({
 *      value: form.$('datePurchased').value,
 *      onChange: handleDateChange(form.$('datePurchased'))
 *    })
 * };
 *
 * <WidgetDatePicker field={datePickerData} />
*/

import React from 'react';
import { observer } from 'mobx-react';
import { DateTimePicker } from 'react-widgets';

export default observer(({ field, className='measure' }) => (
  <div className={className}>
    <label
      htmlFor={field.id}
      className="f7 db mb2 mt3 light-silver"
    >
      {field.label}
    </label>
    <DateTimePicker
      id={field.id}
      value={field.value}
      name={field.name}
      {...field.bind()}
      time={false}
    />
  </div>
));
