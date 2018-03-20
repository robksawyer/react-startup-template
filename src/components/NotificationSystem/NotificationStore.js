/**
 * DEPRECATED
 * NotificationStore.js
 * Handles notifications throughout the app.
 *
 * TODO: I'd really like this to work with react-notification-system, but I just
 * can't figure it out.
 *
 * @see https://github.com/igorprado/react-notification-system
 */

import { observable, action, toJS } from 'mobx';
import merge from 'object-assign';

// Constants
import Constants from './constants';

export default class NotificationStore {
  @observable initialized;
  // The notification objects
  @observable notifications;
  // The notification React component elements
  @observable components;
  // Transition duration
  transitionDuration = 0.5;

  // Notification uid
  uid = 3400;

  constructor() {
    // Set some defaults
    this.initialized = false;
    this.notifications = new Map();
    this.components = new Map();
  }

  /**
   * addNotification
   * Add a notification object. This displays the notification based on the
   * object you passed.
   * Returns the notification object to be used to programmatically dismiss a
   * notification.
   * @param {object} notificationSettings A settings object that describes a notification
   * @return
   */
  @action('ADD_NOTIFICATION')
  addNotification(notificationSettings) {
    // Create a temp notification object
    const tNotification = merge({}, Constants.notification, notificationSettings);

    // Cleanup the data.
    tNotification.autoDismiss = parseInt(tNotification.autoDismiss, 10);
    // Set a default auto dismiss
    if (typeof tNotification.autoDismiss === 'undefined') {
      tNotification.autoDismiss = 5;
    }
    if (isNaN(tNotification.autoDismiss)) {
      console.error('\'autoDismiss\' setting must be a number.');
    }

    // Set a default uid
    tNotification.uid = this.uid;
    // Increment the uid
    this.uid += 1;

    // TODO: Figure out a better way to handle this.
    tNotification.ref = `notification-${tNotification.uid}`;

    if (!tNotification.level) {
      console.error('notification level is required.');
    }

    if (Object.keys(Constants.levels).indexOf(tNotification.level) === -1) {
      console.error(`'${tNotification.level}' is not a valid level.`);
    }

    if (Object.keys(Constants.positions).indexOf(tNotification.position) === -1) {
      console.error(`'${tNotification.position}' is not a valid position.`);
    }

    // Some preparations
    // TODO: Make these switch statements
    tNotification.position = tNotification.position.toLowerCase();
    tNotification.level = tNotification.level.toLowerCase();

    // do not add if the notification already exists based on supplied uid
    if (this.notifications.size > 0) {
      for (let i = 0; i < this.notifications.size; i += 1) {
        try {
          if (this.notifications.get(this.uid)) {
            return false;
          }
        } catch (err) {
          console.log(err);
        }
      }
    }

    // Add the new notification to the stack
    // You can retrieve a notification via `this.notifications.get(SOME_UID);`
    this.notifications.set(tNotification.uid, tNotification);
    return tNotification;
  }

  /**
   * getNotificationRef
   * @param {int} uid The notification uid.
   * @return {string}
   */
  @action('GET_NOTIFICATION')
  getNotificationRef(uid) {
    // return foundNotification;
    return this.notifications[uid].ref;
  }

  /**
   * removeNotification
   * @param {int} uid The id of the notifcation to remove.
   */
  @action('DELETE_NOTIFICATION')
  removeNotification(uid) {
    return this.hideNotification(uid);
  }

  /**
   * editNotification
   * Edit a notification programmatically. You can pass an object previously
   * returned by addNotification() or by onAdd() callback. If passing an object,
   * you need to make sure it must contain the uid property. You can pass only
   * the uid too: editNotification(uid).
   * @param {int, object} notification Notification object must contain uid.
   * @return {object}
   */
  @action('EDIT_NOTIFICATION')
  editNotification(notificationSettings, newNotificationSettings) {
    let foundNotification = null;
    // NOTE: Find state notification to update by using
    // `setState` and forcing React to re-render the component.
    const uid = notificationSettings.uid ? notificationSettings.uid : notificationSettings;

    const newNotifications = this.notifications.filter(
      (storeNotification) => {
        if (uid === storeNotification.uid) {
          foundNotification = storeNotification;
          return false;
        }
        return true;
      },
    );

    if (!foundNotification) {
      return;
    }

    newNotifications.push(merge(
      {},
      foundNotification,
      newNotificationSettings,
    ));

    this.notifications.replace(newNotifications);
  }

  /**
   * clearNotifications
   * Handles clearing all of the notifications
   * @see https://mobx.js.org/refguide/array.html
   */
  @action('CLEAR_NOTIFICATIONS')
  clearNotifications() {
    // Clear the store
    this.notifications.clear();
  }

  /**
   * addSimpleNotification
   * Handles adding notifications to the queue.
   * @param {string} message Message of the notification
   * @param {string} level Level of the notification. Available: success, error, warning and info
   */
  @action addSimpleNotification(message, level) {
    this.addNotification({
      message,
      level,
    });
  }

  /**
   * addErrorNotification
   * Handles adding an error notification to the queue.
   * @param {string} message Message of the notification
   */
  @action addErrorNotification(message) {
    this.addNotification({
      message,
      level: 'error',
    });
  }

  /**
   * addSuccessNotification
   * Handles adding an success notification to the queue.
   * @param {string} message Message of the notification
   */
  @action addSuccessNotification(message) {
    this.addNotification({
      message,
      level: 'success',
    });
  }

  /**
   * addWarningNotification
   * Handles adding an warning notification to the queue.
   * @param {string} message Message of the notification
   */
  @action addWarningNotification(message) {
    this.addNotification({
      message,
      level: 'warning',
    });
  }

  /**
   * addInfoNotification
   * Handles adding an info notification to the queue.
   * @param {string} message Message of the notification
   */
  @action addInfoNotification(message) {
    this.addNotification({
      message,
      level: 'info',
    });
  }
}