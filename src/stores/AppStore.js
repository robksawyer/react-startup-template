/**
 * AppStore
 * Logic that is more global and app specific.
 */
import { observable, action } from 'mobx';

// Utils
import request from '../utils/request';
// import encryptor from '../utils/encryptor';

export default class AppStore {

  @observable loading = false;
  @observable items;
  @observable item;
  @observable footerval;

  @observable notificationManager;

  constructor() {
    this.items = [];
    this.item = {};

    this.footerval = 'Copyright © 2018 React Startup Template';
  }

  /**
   * encrypt
   * Handles encrypting strings
   * @param {string} text
   * @return {object}
   */
  // encrypt(text) {
  //   //
  //   return encryptor.encrypt(text);
  // }

  /**
   * decrypt
   * Handles decrypting strings
   * @param {object} encrypted
   * @return {string}
   */
  // decrypt(encrypted) {
  //   return encryptor.decrypt(encrypted);
  // }


  /**
   * addNotification
   * Handles adding notifications to the queue.
   * @see https://github.com/igorprado/react-notification-system
   * @param message
   * @param level
   */
  @action addNotification(settings){
    this.notificationManager.addNotification(settings);
  }

  /**
   * addSimpleNotification
   * Handles adding notifications to the queue.
   * @see https://github.com/igorprado/react-notification-system
   * @param message
   * @param level
   */
  @action addSimpleNotification(message, level){
    this.notificationManager.addNotification({
      message: message,
      level: level
    });
  }

  /**
   * Handles API calls for common pages e.g. /watches
   * @param pathname The page path e.g. /watches. Fires a get request based on this.
   * @param id Id of the record.
   * @param withKeys (default false) Whether or not to use the clientId and clientSecret.
   */
  async fetchData(pathname, id, withKeys) {
    let options = {};
    if(withKeys) {
      options = {

      };
    }

    // Set loading flag
    this.loading = true;

    // Make a fetch request
    let { data } = await request.get(`${pathname}`, options);

    // data contains a results array
    try{
      data = data.results;
    } catch(err){
      console.log(err);
    }

    try{
      if(data){
        data.results && data.results.length > 0
          ? this.setData(data)
          : this.setSingle(data);
      }
    } catch(err){
      console.log(err);
    }

    // Switch loading flag
    this.loading = false;
  }

  @action setData(data) {
    this.items = data;
  }

  @action setSingle(data) {
    this.item = data;
  }

  /**
   * Handles clearing the items arrays
   */
  @action clearItems() {
    this.items = [];
    this.item = {};
  }

}
