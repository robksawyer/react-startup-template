/**
 * {{name}}Settings.js
 * Another mobx react form settings file.
 * @see https://github.com/foxhound87/mobx-react-form
 * @see https://github.com/skaterdav85/validatorjs
 *
 * Documentation
 * @see https://mobx.js.org/
 * @see https://foxhound87.github.io/mobx-react-form/docs/bindings/default.html#simple-usage
 * @see https://foxhound87.github.io/mobx-react-form/
 * @see http://tachyons.io/#style
 * @see https://github.com/skaterdav85/validatorjs#available-rules
 */
import { Form } from 'mobx-react-form';
import validatorjs from 'validatorjs';

// Utils
// import request from '../../../utils/request';
import request from '../../../utils/request-collector';

export default class {{name}}Settings extends Form {
  // Setup notification messages
  errorNotification = {
    title: 'Technical Error',
    message: 'There was a technical issue. Please try again in a few minutes.',
    level: 'error',
  };

  successNotification = {
    title: 'Success',
    message: 'Item successfully added.',
    level: 'success',
  };

  failedNotification = {
    title: 'Failed',
    message: 'Item was not added. Try again later.',
    level: 'error',
  };

  // Callback for submission success
  successCallback;

  // Callback for submission failure
  errorCallback;

  // Callback for validation success
  validationSuccess;

  // Callback for validation failure
  validationFailed;

  // The notification system
  notifier;

  constructor(
    store,
    successCallback,
    errorCallback,
    validationSuccess = () => {},
    validationFailed = () => {},
  ) {
    super(store);
    // Add the success callback
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;

    this.validationSuccess = validationSuccess;
    this.validationFailed = validationFailed;

    this.store = store;
    this.appStore = store.appStore;
    this.user = store.userStore;
    this.notifier = store.notificationStore;
  }

  /**
   * plugins
   * Below we are returning a `plugins` object using the `validatorjs` package
   * to enable `DVR` functionalities (Declarative Validation Rules).
   * @see https://foxhound87.github.io/mobx-react-form/docs/validation/modes/dvr-async.html
   */
  plugins() {
    const rules = {
      telephone: {
        function: (value) => value.match(/^\d{3}-\d{3}-\d{4}$/),
        message: 'The :attribute phone number is not in the format XXX-XXX-XXXX.',
      },
    };
    const asyncRules = {
      // Make a request to the API to confirm whether or not the email
      // address is already taken.
      example_rule: function( value, attribute, req, passes ) {
        request.get( '/path/example/' + escape( value ) )
          .then(
            ( res ) => {
              // res.data.results
              // should equal:
              // true (value not found)
              // false (value found)
              if ( res.data.results ) {
                // Value is available
                passes();
              } else {
                passes( false, 'This value is already registered.' );
              }
            }
          )
          .catch(
            ( err ) => {
              console.log( err );
              // passes(false, 'An error occurred when checking the value.');
            }
          )
      }
    }
    return {
      dvr: {
        package: validatorjs,
        extend: ( $validator ) => {
          // here we can access the `validatorjs` instance and we
          // can add the rules using the `register()` method.
          // @see https://foxhound87.github.io/mobx-react-form/docs/validation/modes/dvr-custom.html
          Object.keys(rules).forEach((key) =>
            $validator.register(key, rules[key].function, rules[key].message)
          );

          //   here we can access the `validatorjs` instance and we
          //   can add the rules using the `registerAsyncRule()` method.
          //   @see https://github.com/skaterdav85/validatorjs#asynchronous-validation
          Object.keys(asyncRules).forEach(
            (key) => $validator.registerAsyncRule(key, asyncRules[key])
          );
        }
      }
    };
  }

  /**
   * setup
   * Return the `fields` as a collection into the `setup()` method
   * with a `rules` property for the validation.
   */
  setup( props ) {
    return {
      fields: [
        'title',
        'description',
        'description.brief',
        'description.full',
      ],
      labels: {
        title: 'Title',
        description: {
          brief: 'For your records, add a brief description about the purchase.',
          full: 'Describe the purchase in detail.',
        },
      },
      types: {
        title: 'text',
        description: {
          brief: 'textarea',
          full: 'textarea',
        },
      },
      placeholders: {
        title: 'Add a title',
        description: {
          brief: 'Add a brief description.',
          full: 'Add a full description.',
        },
      },
      rules: {
        title: 'required|string|between:2,100',
        description: {
          brief: 'string|between:0,125',
          full: 'string|between:0,1000',
        },
      },
      options: {
        title: {
          validateOnChange: true,
        }
      },
      extra: [],
      values: [],
      hooks: []
    };
  }

  /**
   * hooks
   * Event Hooks
   */
  hooks() {
    return {
      /**
       * Success Validation Handler
       */
      onSuccess( form ) {
        // alert('Form is valid! Send the request here.');
        // get field values
        var fValues = form.values();

        console.log('Form Values!', form.values());

        // Fire the callback
        if(this.successCallback){
          this.successCallback(fValues);
        }
      },

      /**
       * Error Validation Handler
       */
      onError( form ) {
        // alert('Form has errors!');
        // get all form errors
        console.log( 'All form errors', form.errors() );

        // Fire the callback
        if(this.errorCallback){
          this.errorCallback(form);
        }
      }
    };
  }
}
