/**
 * webpack.config.js
 *
 * Configures webpack to build the site for development.
 *
 * This file imports the webpack config factory which is
 * useful for developing by default.
 */

const debug = false;

/**
 * The following is helpful for debugging the final configuration file
 * that gets sent to Webpack.
 */
if (debug) {
  console.log('-------------- CONFIGURATION ---------------');
  console.log(require('./webpack.factory')()[0].resolve);
  console.log(require('./webpack.factory')()[0].plugins);
  console.log(require('./webpack.factory')()[0].module.rules);
  console.log('--------------------------------------------');
}

module.exports = !debug ? require('./webpack.factory')() : console.log('Working in debug mode.');
