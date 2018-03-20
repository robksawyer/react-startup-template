/**
 * webpack.shared.js
 *
 * Defines the shared webpack config used by all workflows.
 *
 * This is a shared base webpack configuration, and the options may be
 * overridden by consumers of this factory.
 *
 * webpack
 * webpack is a module bundler
 * This means webpack takes modules with dependencies and emits static assets
 * representing those modules.
 * @see https://webpack.github.io/
 *
 * path
 * This module contains utilities for handling and transforming file paths.
 * @see http://node.readthedocs.io/en/latest/api/path/
 *
 */

const path = require('path');
const pkgpath = require('packpath');
const pkg = require(path.resolve(pkgpath.self(), 'package.json'));

const webpack = require('webpack');

const dirs = pkg.directories;

module.exports = ({
  entry,
  outputPath = dirs.dist,
  publicPath = '/',
  outputScript = `${dirs.tmp}/bundle.js`
}) => ({
  resolve: {
    modules: [path.resolve(pkgpath.self(), 'src'), 'node_modules'],
    extensions: ['.js', '.json', '.jsx'],
    enforceExtension: false,
  },
  entry: entry,
  output: {
    path: outputPath,
    filename: outputScript
  },
  devtool: 'eval',
  // publicPath: publicPath,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          },
        ]
      },
      {
        test: /\.json$/,
        use: [
          {
            loader: 'null-loader'
          },
          // {
          //   loader: 'json-loader'
          // }
        ]
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('local'),
        'API_CLIENT_ID': JSON.stringify(process.env.API_CLIENT_ID),
        'API_CLIENT_SECRET': JSON.stringify(process.env.API_CLIENT_SECRET),
        'API_ENDPOINT': JSON.stringify(process.env.API_ENDPOINT),
        'API_TIMEOUT': JSON.stringify(process.env.API_TIMEOUT),
        'PORT': JSON.stringify(process.env.PORT),
        'CLOUDINARY_URL': JSON.stringify(process.env.CLOUDINARY_URL),
        'STRIPE_PUBLIC_KEY_LIVE': JSON.stringify(process.env.STRIPE_PUBLIC_KEY_LIVE),
        // 'STRIPE_SECRET_KEY_LIVE': JSON.stringify(process.env.STRIPE_SECRET_KEY_LIVE),
        'STRIPE_PUBLIC_KEY_TEST': JSON.stringify(process.env.STRIPE_PUBLIC_KEY_TEST),
        // 'STRIPE_SECRET_KEY_TEST': JSON.stringify(process.env.STRIPE_SECRET_KEY_TEST),
        'STRIPE_PAYMENT_SERVER_URL_LOCAL': JSON.stringify(process.env.STRIPE_PAYMENT_SERVER_URL_LOCAL),
        'STRIPE_PAYMENT_SERVER_URL_LIVE': JSON.stringify(process.env.STRIPE_PAYMENT_SERVER_URL_LIVE),
        'ENCRYPT_PASSWORD': JSON.stringify(process.env.ENCRYPT_PASSWORD),
        'ENCRYPT_ALGORITHM': JSON.stringify(process.env.ENCRYPT_ALGORITHM),
      }
    }),
  ]
});
