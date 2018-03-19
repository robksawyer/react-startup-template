import React, { Component } from 'react';
import { inject, observer } from "mobx-react";

// Styles
import styles from './{{name}}.css';

@inject('store')
@observer
export default class {{name}} extends Component {
  render(){
    const {
      tagName:Tag = 'div',
      className = '',
      variant = 'default',
      children,
      ...attrs
    } = this.props;

    return (
      <Tag className={`{{className}} {{className}}--${variant} ${className}`}>
        {children}
      </Tag>
    );
  }

}
