import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

// Components
import TopNav from '../TopNav';

// Styles
import styles from './TopBar.css';

@observer
export default class TopBar extends Component {

  render() {
    return (
      <div className="topbar w-100 z-5 bg-none pv3 relative white">
        <TopNav location={this.props.location} />
      </div>
    );
  }
}
