/**
 * Creates a simple select list element.
 *
 * Usage:
 *
 */
import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export default class SimpleSelect extends Component {

  render(props){
    let { field, className = 'measure' } = this.props;

    return (
      <div className={className}>
        <label
          htmlFor={field.id}
          className="f7 db mb2 mt3 light-silver"
        >
          {field.label}
        </label>
        <select name={field.name} {...field.bind()}>
          {field.extra.map(({value, label}) =>
            <option key={value} value={value}>{label}</option>)}
        </select>
      </div>
    );
  }

};
