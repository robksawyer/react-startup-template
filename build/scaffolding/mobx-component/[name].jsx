/**
 * {{name}}.jsx
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

// Styles
import styles from './{{name}}.css';

@inject('store')
@observer
export default class {{name}} extends Component {
  render() {
    const {
      tagName: Tag,
      className,
      variant,
      children,
    } = this.props;

    return (
      <Tag className={`{{className}} {{className}}--${variant} ${className}`}>
        {children}
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
  className: '',
  variant: 'default',
  children: '',
};
