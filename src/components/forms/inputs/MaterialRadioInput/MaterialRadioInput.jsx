import React from 'react';
import { observer } from 'mobx-react';
import RadioButton from 'material-ui/RadioButton';

export default observer(({
  field,
  disabled = false,
  value = 'light',
  label = 'Change me',
  className = '',
  onChangeCallback,
  onBlurCallback
}) => {
  const onChange = field => (event: object, newValue: string) => {
    // Set a the new value for the field.
    field.set('value', newValue);

    // console.log(field.value);
    // Fire the callback.
    if(onChangeCallback){
      onChangeCallback(field);
    }
  }
  const onBlur = field => (event: object, newValue: string) => {
    // Fire the callback.
    if(onBlurCallback){
      onBlurCallback(field);
    }
  }

  return (
    <div className={className}>
      <label
        htmlFor={field.id}
        className="f7 db mb2 mt3 light-silver"
      >
      {field.label}
      </label>
      <RadioButton
        disabled={disabled}
        value={value}
        label={label}
        style={styles}
      />
    </div>
  )
});
