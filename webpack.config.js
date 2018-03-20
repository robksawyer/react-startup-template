/**
 * webpack.config.js
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
 *
 * html-webpack-plugin
 * Simplifies creation of HTML files to serve your webpack bundles
 * @see https://github.com/jantimon/html-webpack-plugin
 *
 * webpack-svgstore-plugin
 * Simple svg-sprite creating with webpack
 * @see https://github.com/mrsum/webpack-svgstore-plugin
 *
 * dotenv-webpack
 * A secure webpack plugin that supports dotenv and other environment
 * variables and only exposes what you choose and use.
 * @see https://github.com/mrsteele/dotenv-webpack
 *
 * globalize-webpack-plugin
 * Use globalize-webpack-plugin if your application uses Globalize
 * for internationalization/localization.
 * @see https://github.com/rxaviers/globalize-webpack-plugin
 *
 * case-sensitive-paths-webpack-plugin
 * This Webpack plugin enforces the entire path of all required modules
 * match the exact case of the actual path on disk.
 * @see https://github.com/Urthen/case-sensitive-paths-webpack-plugin
 *
 */
const webpack = require('webpack');

const path = require('path');
const pkgpath = require('packpath');
const pkg = require('./package.json');

const dirs = pkg.directories;
const envPath = path.resolve(pkgpath.self(), `./${dirs.src}/.env`);

// Webpack plugins
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const SvgStorePlugin = require('webpack-svgstore-plugin');

// const GlobalizePlugin = require('globalize-webpack-plugin');

module.exports = {
  name: 'development',
  target: 'web',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0:3001',
    'webpack/hot/only-dev-server',
    'whatwg-fetch',
    `./${dirs.src}/index.js`,
  ],
  resolve: {
    modules: [
      path.resolve(pkgpath.self(), dirs.src),
      'node_modules',
      'node_modules/react-hot-loader/patch',
    ],
    extensions: ['.js', '.json', '.jsx'],
    enforceExtension: false,
  },
  devServer: {
    hot: true,
    contentBase: path.join(pkgpath.self(), dirs.dist),
    port: 3001,
    host: '0.0.0.0',
    publicPath: '/',
    historyApiFallback: {
      disableDotRule: true,
    },
    disableHostCheck: true,
    clientLogLevel: 'info',
  },
  output: {
    path: path.join(pkgpath.self(), dirs.dist),
    publicPath: '/',
    filename: `${dirs.assets}/app.[hash].js`,
  },
  // @see https://webpack.js.org/configuration/devtool/
  // devtool: 'eval',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /\.test\.(js|jsx)/, /\.stories\.(js|jsx)/],
        use: [
          { loader: 'react-hot-loader/webpack' },
          { loader: 'babel-loader' },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              hash: 'sha512',
              digest: 'hex',
              name: '[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          },
        },
      },
      {
        test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader',
      },
      {
        test: /\.mp4$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'video/mp4',
        },
      },
    ],
  },
  plugins: [
    // new SvgStorePlugin({
    //   prefix: 'icon--',
    //   svg: {
    //     style: '',
    //     class: 'accessibility',
    //   },
    // }),
    // new GlobalizePlugin({
    //   production: false, // true: production, false: development
    //   developmentLocale: 'en', // locale to be used for development.
    //   supportedLocales: ['en'], // locales that should be built support for.
    //   // cldr: function() {}, // CLDR data (optional)
    //   messages: 'messages/[locale].json', // messages (optional)
    //   // timeZoneData() {}, // time zone data (optional)
    //   output: 'i18n/[locale].[hash].js', // build output.
    //   // moduleFilter: filterFunction, // filter for modules to exclude from processing
    //   // tempdirBase: '.', // optional for non create-react-apps
    // }),
    new Dotenv({
      // load this now instead of the ones in '.env'
      path: envPath,
      // load '.env.example' to verify the '.env' variables are all set.
      // Can also be a string to a different file.
      safe: true,
      // load all the predefined 'process.env' variables which will trump
      // anything local per dotenv specs.
      systemvars: true,
      // hide any errors
      silent: false,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin({ debug: false }),
    new FaviconsWebpackPlugin(`./${dirs.src}/images/logo.png`),
    new HtmlWebpackPlugin({
      hash: false,
      template: './index.hbs',
      favicon: `${dirs.src}/images/favicon.ico`,
    }),
    // new webpack.ContextReplacementPlugin(\/moment[/\\]locale$/, /nb/),
  ],
};
