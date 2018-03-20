/**
 * webpack.static.js
 *
 * Configures how static site elements (e.g. JSX -> HTML templates) are processed by webpack.
 * This is a shared base webpack configuration, and the options may be
 * overridden by consumers of this factory.
 *
 * Note: The styleguide (webpack.styleguide.js) shares this base configuration,
 * so keep in mind alterations here also apply there.
 *
 * Paths and such are passed down from the webpack.config.js, this only configures the actions webpack will perform.
 *
 * path
 * This module contains utilities for handling and transforming file paths.
 * @see http://node.readthedocs.io/en/latest/api/path/
 *
 * glob
 * Match files using the patterns the shell uses, like stars and stuff.
 * @see https://github.com/isaacs/node-glob
 *
 * static-generator-webpack-plugi
 * Minimal, unopinionated static site generator powered by webpack
 * @see https://github.com/markdalgleish/static-site-generator-webpack-plugin
 *
 * webpack-merge
 * Merge designed for Webpack
 * @see https://github.com/survivejs/webpack-merge
 */
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const pkgpath = require('packpath');
const pkg = require(path.resolve(pkgpath.self(), 'package.json'));
const dirs = pkg.directories;
const envPath = require(path.resolve(pkgpath.self(), `./${dirs.src}/.env`));

// Plugins
const StaticGeneratorPlugin = require('static-generator-webpack-plugin');

const SharedConfig = require('./webpack.shared')

module.exports = ({
  entry = {},
  locals = {},
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
      name: 'static',
      output: {
        libraryTarget: 'umd'
      },
      module: {
        rules: [
          {
            test: /\.svg$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  context: './source/',
                  name: '/assets/images/content/[name]-[md5:hash:hex:8].[ext]',
                }
              },
              {
                loader: 'image-webpack-loader',
                options: {
                  bypassOnDebug: true,
                  optimizationLevel: 7,
                  interlaced: false,
                }
              }
            ]
          },
          {
            test: /\.(jpe?g|png|gif)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  context: './source/',
                  name: '/assets/images/content/[name]-[md5:hash:hex:8].[ext]',
                },
              }
            ]
          },
          {
            test: /\.md$/,
            use: [
              {
                loader: 'html-loader'
              },
              {
                loader: 'markdown-loader',
                options: { }
              }
            ]
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          },
          {
            test: /\.(css|woff|woff2|eot|ttf)$/,
            loader: 'null-loader'
          }
        ]
      },
      plugins: Object.keys(entry).map(key => (
        new StaticGeneratorPlugin(key, locals)
      ))
    }
  );
}
