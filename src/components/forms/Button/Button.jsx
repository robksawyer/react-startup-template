import React from 'react';
import { observer } from 'mobx-react';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';

// Styles
import './Button.css';

const ctrl = 'f6 link dim br2 ba bw1 ph3 pv2 mv2 mr1 dib b--light-gray bg-white light-red';
const fctrl = 'f5 link dim bn dib mid-gray bg-transparent light-red';

const checkLabel = (text, label) =>
  _.isInteger(_.parseInt(label)) || _.isNil(label)
    ? text : `${text} ${label}`;

export default observer(({
  onlyIcon = false,
  disabled = false,
  content = null,
  type = 'button',
  className,
  onClick,
  text,
  label,
  icon,
}) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`fc-button ` + ctrl + ` ` + className}
    data-tip={checkLabel(text, label)}
  >
    <ReactTooltip />
    {content ||
      <span>
        <i className={`fa fa-${icon}`} />
        {!onlyIcon && <b className="dn di-ns"> {checkLabel(text, label)}</b>}
      </span>}
  </button>
));
