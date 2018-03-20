/**
 * webpack.config.production.js
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
 * favicons-webpack-plugin
 * Let webpack generate all your favicons and icons for you
 * @see https://github.com/jantimon/favicons-webpack-plugin
 *
 * html-webpack-plugin
 * Simplifies creation of HTML files to serve your webpack bundles
 * @see https://github.com/jantimon/html-webpack-plugin
 *
 * extract-text-webpack-plugin
 * Extract text from bundle into a file.
 * @see https://github.com/webpack-contrib/extract-text-webpack-plugin
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
 * case-sensitive-paths-webpack-plugin
 * This Webpack plugin enforces the entire path of all required modules
 * match the exact case of the actual path on disk.
 * @see https://github.com/Urthen/case-sensitive-paths-webpack-plugin
 *
 */
const path = require('path');
const webpack = require('webpack');

const pkgpath = require('packpath');

const pkg = require(path.resolve(pkgpath.self(), 'package.json'));
const dirs = pkg.directories;
const envPath = path.resolve(pkgpath.self(), `./${dirs.src}/.env.production`);

// Webpack plugins
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
// const SvgStorePlugin = require('webpack-svgstore-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
  name: 'production',
  target: 'web',
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'axios',
      'mobx',
      'mobx-react',
      'moment',
    ],
    app: [
      'babel-polyfill',
      `./${dirs.src}/index.js`,
    ],
  },
  resolve: {
    modules: [path.resolve(pkgpath.self(), dirs.src), 'node_modules'],
    extensions: ['.js', '.json', '.jsx'],
    enforceExtension: false,
  },
  output: {
    path: path.resolve(pkgpath.self(), dirs.dist),
    publicPath: '/',
    filename: `${dirs.assets}/[name].[hash].js`,
    chunkFilename: `${dirs.assets}/[name].[chunkhash].js`,
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /\.test\.(js|jsx)/, /\.stories\.(js|jsx)/],
        include: path.join(__dirname, dirs.src),
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.scss$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
            { loader: 'resolve-url-loader' },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
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
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
        drop_console: true,
        screw_ie8: true,
      },
      output: {
        comments: false,
      },
    }),
    new ExtractTextPlugin(`${dirs.assets}/styles.css`),
    new FaviconsWebpackPlugin(`./${dirs.src}/images/logo.png`),
    new CaseSensitivePathsPlugin({ debug: false }),
    new HtmlWebpackPlugin({
      favicon: `./${dirs.src}/images/favicon.ico`,
      hash: false,
      // The 200.html is specifically to solve issues related to Surge.
      // @see https://surge.sh/help/adding-a-200-page-for-client-side-routing
      filename: '200.html',
      template: './index.hbs',
    }),
  ],
};
