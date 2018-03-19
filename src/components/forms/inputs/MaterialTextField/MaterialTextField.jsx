import React from 'react';
import { observer } from 'mobx-react';
import TextField from 'material-ui/TextField';

export default observer(({
    field,
    disabled = false,
    type = 'text',
    className = 'measure',
    placeholder = null,
    floatingLabelText,
    validatingText = 'validating...',
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
    if(multiLine) {
        type = "textarea";
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
                multiLine={multiLine}
                floatingLabelText={floatingLabelText}
                rows={rows}
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
                multiLine={multiLine}
                rows={rows}
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
