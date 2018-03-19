/**
 * A basic currency field that is Material UI styled.
 * @see https://github.com/robksawyer/react-materialui-currency
 */
import React from 'react';
import { observer } from 'mobx-react';
import CurrencyField from 'react-materialui-currency';

export default observer(({
  field,
  precision = 2,
  className = 'measure',
  separator = '.',
  delimiter = ',',
  unit = '$',
  onChange
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={field.id}
        className="f7 db mb2 mt3 light-silver"
      >
        {field.label}
      </label>
      <CurrencyField
                    name={field.name}
                    hintText=''
                    underlineShow={true}
                    precision={precision}
                    separator={separator}
                    delimiter={delimiter}
                    unit={unit}
                    onChange={onChange}
                  />
    </div>
  )
});
