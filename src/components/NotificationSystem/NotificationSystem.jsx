/**
 * NotificationSystem
 */
import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import merge from 'object-assign';
// Used the create short ids for React components
import shortid from 'shortid';

// Components
import NotificationContainer from './NotificationContainer';

// Constants
import Constants from './constants';

// Styles
import styles from './styles';

@inject('store')
@observer
class NotificationSystem extends Component {
  constructor(props) {
    super(props);

    this.isMounted = false;
    this.store = props.store.notificationStore;
    this.overrideStyle = props.style;
  }

  componentDidMount() {
    // Set mount status
    this.isMounted = true;

    // There should only be one instance of the Notification System.
    if (NotificationSystem.instance) {
      console.warn('NotificationSystem', 'Attempting to mount a second system into the DOM.');
    }
    NotificationSystem.instance = this;
  }

  componentWillUnmount() {
    this.isMounted = false;
    // Clear the instance val
    if (NotificationSystem.instance === this) {
      NotificationSystem.instance = null;
    }
  }

  /**
   * wrapper
   */
  wrapper() {
    if (!this.overrideStyle) return {};
    return merge({}, styles.Wrapper, this.overrideStyle.Wrapper);
  }

  @observable isMounted;
  @observable overrideStyle;

  /**
   * didNotificationGetRemoved
   * Handles removing the notification from the store.
   */
  didNotificationGetRemoved(uid) {
    let notification = this.store.notifications.get(uid);
    if (!notification) {
      return true;
    }

    // Remove the notification from the store map
    this.store.notifications.delete(uid);

    // Check to see if the notification still exists.
    const notificationCheck = this.store.notifications.get(uid);

    // Fire the callback
    if (!notificationCheck && notification.onRemove) {
      notification.onRemove(notification);
      notification = null;
    }
    // Send a result back
    if (!notificationCheck) {
      return true;
    }
    return false;
  }

  /**
   * didNotificationGetAdded
   * Handles firing the callback passed.
   */
  didNotificationGetAdded(uid) {
    const notification = this.store.notifications.get(uid);
    if (notification && notification.onAdd) {
      notification.onAdd(notification);
    }
  }

  render() {
    const {
      noAnimation,
      allowHTML,
    } = this.props;

    let containers = null;

    // Get the notifications from the store.
    // const notifications = notificationStore.notifications;
    if (this.store.notifications.size) {
      // Make the containers for the notification.
      containers = Object.keys(Constants.positions).map(
        (position) => {
          // Get the notifications based on a certain position.
          const tNotifications = [];
          this.store.notifications.forEach(
            (value) => {
              if (position === value.position) {
                tNotifications.push(value);
              }
            },
          );

          // If there aren't any notifications return null
          if (!tNotifications.length) {
            return null;
          }

          const tKey = shortid.generate();
          return (
            <NotificationContainer
              ref={`container-${tKey}`}
              key={`${tKey}-${position}`}
              position={position}
              onRemove={this.didNotificationGetRemoved}
              onAdd={this.didNotificationGetAdded}
              noAnimation={noAnimation}
              allowHTML={allowHTML}
            />
          );
        },
      );
    }

    return (
      <div
        className="notifications-wrapper"
        style={this.wrapper()}
      >
        { containers }
      </div>
    );
  }
}

NotificationSystem.defaultProps = {
  style: false,
  noAnimation: false,
  allowHTML: true,
  // children: '',
};

NotificationSystem.propTypes = {
  store: PropTypes.oneOfType([PropTypes.object]),
  style: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  noAnimation: PropTypes.bool,
  allowHTML: PropTypes.bool,
  // children: PropTypes.node,
};

export default NotificationSystem;
