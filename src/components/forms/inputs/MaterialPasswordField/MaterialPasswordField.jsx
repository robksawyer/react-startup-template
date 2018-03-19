import React from 'react';
import { observer } from 'mobx-react';
import TextField from 'material-ui/TextField';
import MdVpnKey from 'react-icons/lib/md/vpn-key';

export default observer(({
    field,
    disabled = false,
    type = 'password',
    className = 'measure',
    placeholder = null,
    validatingText = 'validating...',
    floatingLabelText = <MdVpnKey />,
    multiLine = false,
    rows = 1,
    onChangeCallback,
    onBlurCallback
}) => {
    const onChange = field => (event: object, newValue: string) => {
        // console.log('--- onChange ---');
        // console.log('field.value: ' + field.value);
        // console.log('newValue: ' + newValue);
        // console.log('----------------');

        // Set a the new value for the field.
        field.set('value', newValue);

        // console.log(field.value);
        // Fire the callback.
        if(onChangeCallback){
            onChangeCallback(field);
        }
    }
    const onBlur = field => (event: object, newValue: string) => {
        // console.log('--- onBlur ---');
        // console.log('field.value: ' + field.value);
        // console.log('newValue: ' + newValue);
        // console.log('--------------');

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
            { disabled &&
              <TextField
                disabled
                floatingLabelText={floatingLabelText}
                // Basically overwriting the default bindings here
                // @see https://foxhound87.github.io/mobx-react-form/docs/bindings/default.html
                {...field.bind({
                  disabled,
                  type,
                  placeholder,
                })}
              />
            }
            { !disabled &&
              <TextField
                floatingLabelText={floatingLabelText}
                // Basically overwriting the default bindings here
                // @see https://foxhound87.github.io/mobx-react-form/docs/bindings/default.html
                {...field.bind({
                  type,
                  placeholder,
                  validatingText,
                  onChange: onChange(field),
                  onBlur: onBlur(field),
                })}
              />
            }
            <br />
        </div>
    )
});
