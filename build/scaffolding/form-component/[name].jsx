import React, { Component } from "react";
import { observable } from 'mobx';
import { inject, observer } from "mobx-react";
import { Redirect } from "react-router-dom";

// Form components
import MaterialTextField from '../inputs/MaterialTextField';
import MaterialToggle from '../inputs/MaterialToggle';
import FormControls from '../controls/FormControls';

// Form settings
import {{name}}Settings from './{{name}}Settings';

// Styles
import styles from './{{name}}.css';

@inject('store')
@observer
export default class {{name}} extends Component {

  @observable form;

  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.app = this.store.appStore;

    // function(successCallback, errorCallback)
    const successCallback = () => {};
    const errorCallback = () => {};
    this.form = new {{name}}Settings(successCallback, errorCallback);
    this.store.formStore.add('{{route}}', this.form);
  }

  componentDidMount() {
    // Show the mobx-react-dev-tools panel.
    // NOTE: You may need to update the path below to whatever your pathname
    //       is in the route file.
    // if(this.props.location.pathname === '/{{route}}'){
    //   this.store.formStore.open('{{route}}');
    // }

    // Show the mobx-react-dev-tools panel.
    this.store.formStore.select('{{route}}');
  }

  componentWillUnmount() {
    // Hide the dev tools
    // this.store.formStore.close('{{route}}');

    // @see https://github.com/foxhound87/mobx-react-form/issues/111
    this.form.clear();
  }

  render(){
    const {
      tagName:Tag = 'div',
      className = '',
      variant = 'default',
      children,
      ...attrs
    } = this.props;

    const form = this.form;

    // Form buttons to add onSubmit, onReset, onClear
    // See the FormControls component for more.
    const formControls = {onSubmit: true};

    // Where the user will be redirected after form submission is successful.
    const onSubmitRedirectPath = '/somewhere';

    return (
      <Tag className={`{{className}} {{className}}--${variant} ${className}`}>
        {children}
        <form onSubmit={form.onSubmit}>
          <MaterialTextField field={form.$('title')} />
          <p className="red">{form.$('title').error}</p>
          <MaterialTextField multiLine={true} type="textarea" rows={3} field={this.form.$('description')} />
					<p className="red">{this.form.$('description').error}</p>

          <FormControls controls={formControls} form={form} />
        </form>
        {!form.submitting  && form.isValid &&
            <Redirect to={onSubmitRedirectPath} />}
      </Tag>
    );
  }

}
