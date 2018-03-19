import React, {PureComponent} from 'react';

export default class UpdateBlocker extends PureComponent {
  render() {
    return (this.props.children) ? <div>{this.props.children}</div> : <div></div>;
  }
}
