/**
 * webpack.tests.js
 *
 * Configures how unit test files are processed by webpack.
 * This is a shared base webpack configuration, and the options may be
 * overridden by consumers of this factory.
 *
 * Note: Tests are compiled with babel and written to a temporary folder,
 * executed, and then deleted after the build (by post-clean)
 *
 * Paths and such are passed down from the webpack.config.js, this only configures the actions webpack will perform.
 *
 * tap-webpack-plugin
 * Run TAP tests on every compile with webpack
 * @see https://www.npmjs.com/package/tap-webpack-plugin
 *
 * webpack-merge
 * Merge designed for Webpack
 * @see https://github.com/survivejs/webpack-merge
 */

const TapWebpackPlugin = require('tap-webpack-plugin');
const webpackMerge = require('webpack-merge');

const path = require('path');
const pkgpath = require('packpath');
const pkg = require(path.resolve(pkgpath.self(), 'package.json'));
const dirs = pkg.directories;
const envPath = require(path.resolve(pkgpath.self(), `./${dirs.src}/.env`));

const SharedConfig = require('./webpack.shared')

module.exports = ({
  entry,
  reporter = 'tap-dot',
  outputPath = dirs.dist,
  publicPath = `./${dirs.dist}/`,
  outputScript = `${dirs.tmp}/bundle.js`,
}) => {
  return webpackMerge(
    SharedConfig({
      entry,
      outputPath,
      publicPath,
      outputScript
    }),
    {
      name: 'test',
      target: 'node',
      node: {
        fs: 'empty'
      },
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
      module: {
        rules: [
          {
            test: /\.(css|md|json|jpe?g|png|gif|svg|woff|woff2|eot|ttf)$/i,
            loader: 'null-loader'
          }
        ]
      },
      plugins: [
        new TapWebpackPlugin({
          reporter: reporter
        })
      ]
    }
  );
}
