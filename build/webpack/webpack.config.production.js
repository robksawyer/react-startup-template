/**
 * webpack.config.production.js
 *
 * Configures webpack to build the site for production deployment.
 *
 * This file imports the webpack config factory and extends it to set production
 * tasks such as minification to enabled. Thus, changes to the debug build also
 * apply here unless this configuration actively undoes them.
 *
 * webpack
 * webpack is a module bundler
 * This means webpack takes modules with dependencies and emits static assets
 * representing those modules.
 * @see https://webpack.github.io/
 *
 * postcss-pipeline-webpack-plugin
 * A webpack plugin to process generated assets with PostCSS pipeline
 * @see https://github.com/mistakster/postcss-pipeline-webpack-plugin
 *
 * uglifyjs-webpack-plugin
 * This plugin uses UglifyJS v3 (`uglify-es`) to minify your JavaScript
 * @see https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 * dotenv
 * Loads environment variables from .env for nodejs projects.
 * @see https://github.com/motdotla/dotenv
 *
 * favicons-webpack-plugin
 * Let webpack generate all your favicons and icons for you
 * @see https://github.com/jantimon/favicons-webpack-plugin
 */

const fs = require('fs');
const path = require('path');
const dotenv = require("dotenv");
const pkgpath = require('packpath');
const webpack = require('webpack');

// Plugins
// const PostCssPipelineWebpackPlugin = require('postcss-pipeline-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const pkg = require(path.resolve(pkgpath.self(), 'package.json'));
const envPath = require(path.resolve(pkgpath.self(), './src/.env'));

let build = require('./webpack.factory')();

// Simulate config options from your production environment by
// customising the .env file in your project"s root folder.
if(fs.existsSync(envPath)){
  dotenv.config({
    path: envPath,
  });
}

// production specific configuration
module.exports = build.map(config => {

  // Check for test and static configs.
  if (config.name === 'test'
    || config.name === 'static') {
    return config;
  }

  config.devtool = 'source-map';

  // add production flag to build environment
  // libraries can key off this to import versions without debug info
  // (e.g. react turns off warnings in the console and gets much smaller because of this)
  config.plugins.unshift(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'API_ENDPOINT': JSON.stringify(process.env.API_LIVE_ENDPOINT),
      }
    })
  );

  // add css minification
  if (config.name === 'browser') {
    // config.plugins.push(
    //   new PostCssPipelineWebpackPlugin({
    //     suffix: undefined,
    //     pipeline: [
    //       require('cssnano')
    //     ]
    //   })
    // );
  }

  // uglify JS
  config.plugins.push(
    new UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    })
  );

  // set output filename hashing on for all js output files
  if(config.output.filename) {
    config.output.filename = hashify(config.output.filename);
  }

  // set output filename hashing on for all css output files (via ExtractTextPlugin)
  config.plugins
    .filter(plugin => plugin.filename)
    .forEach(plugin => plugin.filename = hashify(plugin.filename));

  return config;
});

// takes a path without a hash and adds one, e.g.
// /foo/bar.js -> /foo/bar-[hash].js
// (webpack adds the actual hash value)
function hashify(existingPath) {
  const extensionIndex = existingPath.lastIndexOf('.');
  const extension = existingPath.substring(extensionIndex);
  const fileName = existingPath.substring(0, extensionIndex);

  return `${fileName}-[hash]${extension}`;
}
