/**
 * webpack.factory.js
 *
 * Configures webpack to build all elements of the site.
 *
 * This file imports the basic configuration of actions (e.g. webpack.tests.js),
 * and decorates them with path configurations and other project-specific setups.
 *
 * Note: Configurations defined here are imported and further extended by
 * webpack.production.config.js,
 *
 * Where possible, favor making changes in webpack configuration from here as
 * opposed to the shared configurations to keep it easy to apply upgrades.
 *
 * path
 * This module contains utilities for handling and transforming file paths.
 * @see http://node.readthedocs.io/en/latest/api/path/
 *
 * glob
 * Match files using the patterns the shell uses, like stars and stuff.
 * @see https://github.com/isaacs/node-glob
 *
 * file-exists
 * Check if filepath exists and is a file. Returns false for directories.
 * @see https://github.com/scottcorgan/file-exists
 *
 * packpath
 * Easily find the path(s) of package.json.
 * @see https://github.com/jprichardson/node-packpath
 *
 * whatwg-fetch
 * A window.fetch JavaScript polyfill.
 * @see https://github.com/github/fetch
 */

const path = require('path');
const glob = require('glob');
const fs = require('fs');
const fileExists = require('file-exists');

const pkgpath = require('packpath');
const pkg = require(path.resolve(pkgpath.self(), 'package.json'));

/**
 *
 * WARNING: Make sure package.json has a directories section with the following:
 * ...
 * "directories": {
 *   "dist": "public",
 *   "src": "src"
 * }
 * ...
 *
 */
const dirs = pkg.directories;

/*
 *
 * IMPORT SHARED WEBPACK WORKFLOWS
 *
 */
const staticConfig = require('./workflow/webpack.static');
const browserConfig = require('./workflow/webpack.browser');
const testsConfig = require('./workflow/webpack.tests');

/*
 *
 * HELPER FUNCTIONS
 *
 */
const baseOutput = config => Object.assign({
  outputPath: path.resolve(pkgpath.self(), dirs.dist),
}, config);


/*
 *
 * CREATE WEBPACK CONFIGURATIONS
 * The shared base configurations imported earlier are augmented with paths
 * and specific details here.
 *
 */
const configurationFactory = () => {

  // const renderStatic = staticConfig(baseOutput({
  //   entry: {
  //     styleguide: path.resolve(dirs.src, 'RenderStatic.jsx')
  //   }
  // }));

  // const styleguideBundle = browserConfig(baseOutput({
  //   entry: path.resolve(dirs.src, 'styleguide/styleguide.jsx'),
  //   outputScript: '/assets/styleguide.js',
  //   outputStyle: '/assets/styleguide.css'
  // }));

  const browserStyles = browserConfig(baseOutput({
    entry: path.resolve(dirs.src, 'styles.jsx'),
    outputStyle: 'assets/styles.css'
  }));

  const devScripts = browserConfig(baseOutput({
    entry: path.resolve(dirs.src, 'devScripts.js'),
    outputScript: 'assets/devScripts.js',
  }));

  const browserScripts = browserConfig(baseOutput({
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://0.0.0.0:3001',
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      'whatwg-fetch',
      path.resolve(dirs.src, 'scripts.js')
    ],
    outputScript: 'assets/scripts.js',
  }));

  const browserHeadScripts = browserConfig(baseOutput({
    entry: path.resolve(dirs.src, 'head.js'),
    outputScript: 'assets/head.js',
  }));

  // Send the tests to a tmp folder
  const componentTests = testsConfig(baseOutput({
    entry: path.resolve(dirs.src, 'tests.jsx'),
    outputScript: 'tmp/tests.js',
    reporter: path.resolve(
      pkgpath.self(), 'node_modules', '.bin', 'tap-min'
    )
  }));

  return [
    // renderStatic,
    // styleguideBundle,
    browserStyles,
    devScripts,
    browserScripts,
    browserHeadScripts,
    componentTests
  ];
};

/*
 *
 * EXPORT ALL CONFIGURATIONS
 * Consumers of this config (e.g. gulp) will pass these to webpack for execution.
 * Note that the export is a factory function (to avoid sharing the same config object across requires),
 * so call it after you require it.
 *
 */
module.exports = configurationFactory;
