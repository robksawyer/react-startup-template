/**
 * App.jsx
 */
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import LazyRoute from 'lazy-route';

import _ from 'lodash';

// Notifications
// import NotificationSystem from 'react-notification-system/dist/NotificationSystem';

// Dev Tools
import DevTools from 'mobx-react-devtools';
// import MobxReactFormDevTools from 'mobx-react-form-devtools';

// Components
import TopBar from './TopBar';

// Icons
import favicon from '../images/favicon.ico';

// Global styles
import globalStyles from './styles.jsx';

// Styles
import styles from './App.css';

@inject('store')
@observer
export default class App extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  componentDidMount() {
    // Setup the notification manager
    this.store.appStore.notificationManager = this.refs.notificationSystem;
  }

  checkAuth(e) {
    if (e) e.preventDefault();
  }

  render() {
    const {
      footerval
    } = this.store.appStore;

    return (
      <div className="wrapper sans-serif">
        {/* <NotificationSystem ref="notificationSystem" /> */}
        {/* <DevTools position={{ bottom: 0, left: '50px' }} /> */}
        {/* <MobxReactFormDevTools.UI /> */}
        <TopBar />
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <LazyRoute {...props} component={import('./Home')} />
            )}
          />
          <Route
            exact
            path="/:id([0-9])"
            render={props => (
              <LazyRoute {...props} component={import('./Home')} />
            )}
          />
          {/* <Route
            exact path="/pricing"
            render={props => (
              <LazyRoute {...props} component={import("./Pricing")} />
            )}
          /> */}
          {/* <Redirect
            exact
            path="/login"
            to="/"
          /> */}
        </Switch>
        <footer className="center">
          {footerval}
        </footer>
      </div>
    );
  }
}
