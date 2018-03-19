/**
 * FormStore
 * Logic that is specific to the forms in the app.
 */
import { observable, action } from "mobx";

// Utils
import request from '../utils/request';
import requestExternal from '../utils/request-external';

// Dev
import MobxReactFormDevTools from 'mobx-react-form-devtools';

export default class FormStore {

  // Forms
  @observable forms = {};

  @observable loading = false;

  @observable notificationManager;

  constructor() {
    console.log('Formstore created!');
  }

  /**
   * setup
   * Handles setting up the mobx-react-dev-tools.
   * @param
   * @return
   */
  setup(forms) {
    this.forms = forms;
    // select form to show into the devtools
    MobxReactFormDevTools.register(this.forms);
  }

  /**
   * add
   * Handles adding a form to mobx-react-dev-tools and the form object.
   * @param {string} key A mobx-react-form-dev-tools key (this'll be the name)
   * @param {object} value A mobx-react-form settings object
   * @return
   */
  add(key, value) {
    if(typeof(key) !== 'string'){
      console.log('FormStore: key must be an string');
      return false;
    }
    if(typeof(value) !== 'object'){
      console.log('FormStore: value must be an object');
      return false;
    }
    this.forms[key] = value;
    // register the new forms object
    MobxReactFormDevTools.register(this.forms);
  }

  /**
   * open
   * Handles showing mobx-react-dev-tools for a specific form.
   * @param {string} formName
   * @return
   */
  open(formName) {
    // select form to show into the devtools
    this.select(formName);

    // open the devtools (closed by default)
    MobxReactFormDevTools.open(true);
  }

  /**
   * select
   * Handles showing mobx-react-dev-tools for a specific form.
   * @param {string} formName
   * @return
   */
  select(formName) {
    // select form to show into the devtools
    MobxReactFormDevTools.select(formName);
  }

  /**
   * close
   * Handles hiding mobx-react-dev-tools for a specific form.
   * @param {string} formName
   * @return
   */
  close(formName) {
    // select form to show into the devtools
    MobxReactFormDevTools.select(formName);

    // open the devtools (closed by default)
    MobxReactFormDevTools.open(false);
  }


  /**
   * getToggleData
   * Handles getting the data from the toggle field.
   * @param {string} itemName
   */
  @action getToggleData = (field) => {
    return {
      label: field.label,
      name: field.name,
      id: field.value,
      bind: () => ({
        value: field.value,
        onToggle: this.handleToggle(field),
      }),
    };
  }

  /**
   * locationLookup
   * Handles looking up the location the user is currently in.
   * @param {function} callback
   */
  @action locationLookup = (callback) => {
    return requestExternal
            .get('https://ipinfo.io')
            .then(
              (res) => {
                callback(res.data);
              }
            )
            .catch(
              (err) => {
                if(err instanceof Error) {
                  console.log(err.message);
                } else {
                  console.log(err.data);
                }
              }
            );
  };

  /**
   * countryLookup
   * Handles looking up the country the user is currently in.
   * @param {function} callback
   */
  @action countryLookup = (callback) => {
    return requestExternal
            .get('https://ipinfo.io')
            .then(
              (res) => {
                const countryCode = (res.data && res.data.country) ? res.data.country : '';
                callback(countryCode);
              }
            )
            .catch(
              (err) => {
                if(err instanceof Error) {
                  console.log(err.message);
                } else {
                  console.log(err.data);
                }
              }
            );
  };

  /**
   * handleSelectChange
   * Handles focus change on select fields.
   * @param {object} field
   * @param {object} event
   * @param {number} key
   * @param {any} payload
   */
  @action handleSelectChange = field => (event: object, key: number, payload: any) => {
    event.preventDefault();
    console.log('Updating field named ' + field.name);
    console.log("Previous value: " + field.value);
    field.value = payload;
    console.log("New value: " + field.value);
    // Do some validation
    // this.form.validate(field.name).then(
    //   ({isValid}) => {
    //     console.log('Validating select change...');
    //     console.log(isValid);
    //   }
    // );
  };

  /**
   * handleToggle
   * Handles change on toggle fields.
   * @param {object} field
   * @param {object} event
   * @param {bool} isInputChecked
   * @see http://www.material-ui.com/#/components/toggle
   */
  @action handleToggle = field => (event: object, isInputChecked: bool) => {
    console.log('Updating field named ' + field.name);
    console.log("Previous value: " + field.value);
    field.value = isInputChecked;
    console.log("New value: " + field.value);
    // Do some validation
    // this.form.validate(field.name).then(
    //   ({isValid}) => {
    //     console.log('Validating toggle change...');
    //     console.log(isValid);
    //   }
    // );
  };

  /**
   * handleDateChange
   * Handles change on date fields.
   * @param {object} field
   * @param {Date} value
   */
  @action handleDateChange = field =>  (value: Date) => {
    console.log('Updating field named ' + field.name);
    console.log(typeof(value))
    console.log("Value: " + value);
    console.log("Previous value: " + field.value);
    field.value = value;
    console.log("New value: " + field.value);
    // Do some validation
    // TODO: Get this working
    // this.form.validate(field.name).then(
    //   ({isValid}) => {
    //     console.log('Validating date change...');
    //     console.log(isValid);
    //   }
    // );
  };

  /**
   * handleAsyncSelectChange
   * Handles change of an async select field.
   * @param {object} field
   * @param {object} item
   */
  @action handleAsyncSelectChange = field => (item: object) => {
    if (!item) { return; }
    console.log('Updating field named ' + field.name);
    console.log("Label: " + item.label);
    console.log("Value: " + item.value);
    console.log("Previous value: " + field.value);
    field.value = item.value;
    console.log("New value: " + field.value);
    // Do some validation
    // TODO: Get this working
    // this.form.validate(field.name).then(
    //   ({isValid}) => {
    //     console.log('Validating date change...');
    //     console.log(isValid);
    //   }
    // );
  };

  /**
   * Handles the change events for currency fields
   * @param {object} field
   * @param {string} raw
   * @param {string} display
   * @see https://github.com/robksawyer/react-materialui-currency
   */
  @action handleCurrencyFieldChange = (field) => (raw, display) => {
    console.log("Previous value: " + field.value);
    field.value = raw;
    console.log("New value: " + field.value);
  }

  /**
   * addNotification
   * Handles adding notifications to the queue.
   * @see https://github.com/igorprado/react-notification-system
   * @param settings
   */
  @action addNotification(settings){
    this.notificationManager.addNotification(settings);
  }


  /**
   * addSimpleNotification
   * Handles adding notifications to the queue.
   * @see https://github.com/igorprado/react-notification-system
   * @param {string} message Description
   * @param {string} level   Description
   *
   * @return {object} Description
   */
  @action addSimpleNotification(message, level){
    this.notificationManager.addNotification({
      message: message,
      level: level
    });
  }

  /**
   * checkIfEmailExists
   * Handles checking to see if the email address exists in the database.
   * @param {string} value
   * @param {string} attribute
   * @param {object} req
   * @param {function} passes
   * @return
   */
  @action checkIfEmailExists( value, attribute, req, passes ) {
    return request.get('/users/checkemail/' + escape( value ) )
      .then(
        ( res ) => {
          // res.data.results
          // should equal:
          // true (email not found)
          // false (email found)
          if ( res.data.results ) {
            // Email address is available
            passes( true, 'This email address is availble.');
          } else {
            passes( false, 'This email address is already registered.' );
          }
        }
      )
      .catch(
        ( err ) => {
          console.log( err );
          passes(false, err);
        }
      );
  }

}
