/**
 * Handles login via a mobx react form.
 * @see https://github.com/foxhound87/mobx-react-form
 */
import { Form } from 'mobx-react-form';
import validatorjs from 'validatorjs';

export default class LoginFormSettings extends Form {
  successCallback;
  errorCallback;

  constructor( successCallback, errorCallback ) {
    super();
    // Add the success callback
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;
  }

  /*
    Below we are returning a `plugins` object using the `validatorjs` package
    to enable `DVR` functionalities (Declarative Validation Rules).
  */
  plugins() {
    return { dvr: validatorjs };
  }

  /*
    Return the `fields` as a collection into the `setup()` method
    with a `rules` property for the validation.
  */
  setup(props) {
    return {
      fields: [
        'email',
        'password'
      ],
      labels: {
        email: 'Email',
        password: 'Password',
      },
      types: {
        email: 'text',
        password: 'password',
      },
      placeholders: {},
      rules: {
        email: 'required|email|string|between:5,25',
        password: 'required|string|between:5,25',
      },
      extra: [

      ],
      values: [

      ],
      hooks: [

      ]
    };
  }

  /*
    Event Hooks
  */
  hooks() {
    return {

      // onSubmit(form){
      //   console.log('Submitting the form.');
      //   console.log(form);
      // },

      /*
        Success Validation Handler
      */
      onSuccess(form) {
        // alert('Form is valid! Send the request here.');
        // console.log('Form Values!', form.values());
        // get field values
        var fValues = form.values();
        if(this.successCallback){
          this.successCallback(fValues)
        }
      },
      /*
        Error Validation Handler
      */
      onError(form) {
        // alert('Form has errors!');
        // get all form errors
        console.log('All form errors', form.errors());
        if(this.errorCallback){
          this.errorCallback(form)
        }
      }
    };
  }
}
