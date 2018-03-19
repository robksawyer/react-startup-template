import React, { Component } from "react";
import { observable } from 'mobx';
import { inject, observer } from "mobx-react";
import { Redirect } from "react-router-dom";

// Form handling
import MaterialTextField from '../inputs/MaterialTextField';
import MaterialPasswordField from '../inputs/MaterialPasswordField';
import MaterialToggle from '../inputs/MaterialToggle';
import FormControls from '../controls/FormControls';

// Form settings
import LoginFormSettings from './LoginFormSettings';

@inject('store')
@observer
export default class LoginForm extends Component {

  @observable form;

  constructor(props) {
    super(props);
    this.store = this.props.store;

    const {
        authenticate,
    } = this.store.userStore;

    // function(successCallback, errorCallback)
    this.form = new LoginFormSettings(authenticate(this));
    this.store.formStore.add('login', this.form);
  }

  componentDidMount() {
    // Show the mobx-react-dev-tools panel.
    // if(this.props.location.pathname === '/login'){
    //   this.store.formStore.open('login');
    // }
    this.store.formStore.select('login');
  }

  componentWillUnmount() {
    // this.dispose();
    // Hide the dev tools
    // this.store.formStore.close('login');

    // @see https://github.com/foxhound87/mobx-react-form/issues/111
    this.form.clear();
  }

  render() {

    const {
      authenticated,
      authenticating,
    } = this.store.userStore;

    const form = this.form;

    return (
      <div className="fl w-100 w-50-ns measure center ph2 ph5-ns pv5 page login">
        <form onSubmit={form.onSubmit}>
          <MaterialTextField field={form.$('email')} />
          <p className="red">{form.$('email').error}</p>
          <MaterialPasswordField field={form.$('password')} />
          <p className="red">{form.$('password').error}</p>

          <FormControls controls={{onSubmit: true}} form={form} />
        </form>

        {!authenticating && authenticated &&
          <Redirect to="/dashboard" />}
      </div>
    );
  }
}
