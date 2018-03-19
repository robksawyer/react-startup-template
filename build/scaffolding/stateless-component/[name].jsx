import React, { PropTypes } from 'react';
import styles from './{{name}}.css';


export const {{name}} = (props) => {
  const {
    tagName:Tag,
    className,
    variant,
    children,
    ...attrs
  } = props;

  return (
    <Tag className={`{{className}} {{className}}--${variant} ${className}`} {...attrs}>
      {children}
    </Tag>
  );
}

{{name}}.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default'])
};

{{name}}.defaultProps = {
  tagName: 'div',
  className: '',
  variant: 'default'
};


export default {{name}};
