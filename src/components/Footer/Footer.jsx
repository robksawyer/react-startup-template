import React, { PropTypes } from 'react';
import styles from './Footer.css';


export const Footer = (props) => {
  const {
    tagName: Tag,
    className,
    variant,
    children,
  } = props;

  return (
    <Tag className={`footer footer--${variant} ${className}`}>
      <div className="cf w-100 f7 center white bt bw2 b--mint-light-gray pv5 tc grad2">
        <span>{children}</span>
      </div>
    </Tag>
  );
};

Footer.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.any]),
  variant: PropTypes.oneOf(['default']),
};

Footer.defaultProps = {
  tagName: 'div',
  className: '',
  children: 'Copyright &copy; 2018 React Startup Template',
  variant: 'default',
};


export default Footer;
