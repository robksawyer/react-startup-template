/**
 * {{name}}.jsx
 */
import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

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
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.app = this.store.appStore;

    this.form = new {{name}}Settings(
      this.store,
      this.submissionSuccessHandler(),
      this.submissionErrorHandler(),
      this.validationSuccess,
      this.validationFailed,
    );
    // this.form.validate({ showErrors: false });
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
    // this.store.formStore.select('{{route}}');
  }

  componentWillUnmount() {
    // Hide the dev tools
    // this.store.formStore.close('{{route}}');

    // @see https://github.com/foxhound87/mobx-react-form/issues/111
    this.form.clear();
  }

  /**
   * validationSuccess
   */
  validationSuccess(formValues) {
    console.log(formValues);
    this.submissionValidated = true;
  }

  /**
   * validationFailed
   */
  validationFailed(formValues) {
    console.log('{{name}}: Validation failed.');
    this.submissionValidated = false;
  }

  /**
   * submissionSuccessHandler
   */
  submissionSuccessHandler = () => (apiResults) => {
    if (apiResults) {
      // this.purchase = apiResults.results;
      this.submissionSuccess =
        apiResults.results &&
        apiResults.results._id &&
        apiResults.results._id !== ''
          ? true
          : false;
    } else {
      console.error('{{name}}: An unexpected error occured. Please contact us.');
    }
  }

  /**
   * submissionErrorHandler
   */
  submissionErrorHandler = () => (error) => {
    if (error) {
      console.error(error);
      console.error('{{name}}: An error occured. :( Please contact us if you continue to have issues.');
    }
  }


  @observable form;
  @observable submissionValidated = false;
  @observable submissionSuccess = false;

  render() {
    const {
      tagName: Tag,
      className,
      variant,
      children,
    } = this.props;

    const form = this.form;

    // Form buttons to add onSubmit, onReset, onClear
    // See the FormControls component for more.
    const formControls = { onSubmit: true };

    // Where the user will be redirected after form submission is successful.
    const onSubmitRedirectPath = '/somewhere';

    return (
      <Tag className={`{{className}} {{className}}--${variant} ${className}`}>
        {children}
        <form onSubmit={form.onSubmit}>
          <MaterialTextField field={form.$('title')} />
          <MaterialTextField
            multiline
            type="textarea"
            rows={3}
            field={this.form.$('description.brief')}
          />
          <FormControls controls={formControls} form={form} />
        </form>
        {!form.submitting && form.isValid &&
          <Redirect to={onSubmitRedirectPath} />}
      </Tag>
    );
  }
}

{{name}}.propTypes = {
  store: PropTypes.oneOfType([PropTypes.object]),
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
};

{{name}}.defaultProps = {
  tagName: 'div',
  className: 'page san-serif mw7 center mb3',
  variant: 'default',
  children: '',
};
