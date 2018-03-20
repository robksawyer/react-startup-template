/**
 * webpack.browser.js
 *
 * Configures how assets served by the browser (e.g. CSS, JS, images) are
 * processed by webpack.
 *
 * This is a shared base webpack configuration, and the options may be
 * overridden by consumers of this factory.
 *
 * Note: This configuration is used by all asset generation
 * (both for dist and styleguide), so changes apply in both places.
 *
 * Paths and such are passed down from the webpack.config.js, this only
 * configures the actions webpack will perform.
 *
 * path
 * This module contains utilities for handling and transforming file paths.
 * @see http://node.readthedocs.io/en/latest/api/path/
 *
 * glob
 * Match files using the patterns the shell uses, like stars and stuff.
 * @see https://github.com/isaacs/node-glob
 *
 * minimatch
 * A minimal matching utility.
 * @see https://github.com/isaacs/minimatch
 *
 * dotenv
 * Loads environment variables from .env for nodejs projects.
 * @see https://github.com/motdotla/dotenv
 *
 * webpack-merge
 * Merge designed for Webpack
 * @see https://github.com/survivejs/webpack-merge
 *
 * webpack-svgstore-plugin
 * Simple svg-sprite creating with webpack
 * @see https://github.com/mrsum/webpack-svgstore-plugin
 *
 * extract-text-webpack-plugin
 * Extract text from a bundle, or bundles, into a separate file.
 * @see https://github.com/webpack-contrib/extract-text-webpack-plugin
 *
 * postcss-pipeline-webpack-plugin
 * A webpack plugin to process generated assets with PostCSS pipeline
 * @see https://github.com/mistakster/postcss-pipeline-webpack-plugin
 *
 * html-webpack-plugin
 * Simplifies creation of HTML files to serve your webpack bundles
 * @see https://github.com/jantimon/html-webpack-plugin
 *
 * favicons-webpack-plugin
 * Let webpack generate all your favicons and icons for you
 * @see https://github.com/jantimon/favicons-webpack-plugin
 *
 */
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const match = require('minimatch');
const dotenv = require('dotenv');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const pkgpath = require('packpath');
const pkg = require(path.resolve(pkgpath.self(), 'package.json'));
const dirs = pkg.directories;
const envPath = require(path.resolve(pkgpath.self(), `./${dirs.src}/.env`));

// Plugins
const SvgStorePlugin = require('webpack-svgstore-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PostCssPipelineWebpackPlugin = require('postcss-pipeline-webpack-plugin');

const SharedConfig = require('./webpack.shared');


// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
if(fs.existsSync(envPath)){
  dotenv.config({
    path: envPath,
  });
}

module.exports = ({
  entry,
  outputPath = dirs.dist,
  publicPath = `./${dirs.dist}/`,
  outputScript = `${dirs.tmp}/bundle.js`,
  outputStyle = `${dirs.tmp}/bundle.css`,
}) => {
  return webpackMerge(
    SharedConfig({
      entry,
      outputPath,
      publicPath,
      outputScript
    }),
    {
      name: 'browser',
      module: {
        rules: [
          {
            test: /\.scss$/,
            use: [
              {
                loader: 'style-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              { loader: 'resolve-url-loader', },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          {
            test: /\.css$/,
            use: [
              { loader: 'style-loader', },
              { loader: 'css-loader', },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
            ]
          },
          // {
          //   test: /\.css$/,
          //   use: ExtractTextPlugin.extract({
          //     fallback: 'style-loader',
          //     use: [
          //       {
          //         loader: 'css-loader',
          //         options: {
          //           // minimize: false,
          //           sourceMap: true,
          //         }
          //       },
          //       {
          //         loader: 'postcss-loader',
          //         options: {
          //           sourceMap: true
          //         }
          //       }
          //     ]
          //   })
          // },
          {
            test: /\.svg$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  context: './source/',
                  name: `/${dirs.assets}/images/css/[name]-[md5:hash:hex:8].[ext]`,
                }
              },
              {
                loader: 'image-webpack-loader',
                options: {
                  bypassOnDebug: true,
                  optimizationLevel: 7,
                  interlaced: false,
                }
              },
            ]
          },
          {
            test: /\.(jpe?g|png|gif)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  context: './source/',
                  name: `/${dirs.assets}/images/css/[name]-[md5:hash:hex:8].[ext]`,
                }
              }
            ]
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  context: './source/',
                  name: `/${dirs.assets}/fonts/[name]-[md5:hash:hex:8].[ext]`,
                },
              }
            ]
          },
          {
            test: /\.json$/,
            use: [
              {
                loader: 'json-loader'
              }
            ]
          },
          {
            test: /\.md$/,
            use: [
              {
                loader: 'null-loader'
              }
            ]
          }
        ]
      },
      plugins: [
        new SvgStorePlugin({
          prefix: 'icon--',
          svg: {
            style: '',
            class: 'accessibility'
          }
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new FaviconsWebpackPlugin(
          path.resolve(pkgpath.self(), `./${dirs.src}/images/logo.png`)
        ),
        new ExtractTextPlugin(outputStyle),
        // new PostCssPipelineWebpackPlugin({
        //   suffix: undefined,
        //   pipeline: require('./postcss-plugins.js')
        // }),
        new HtmlWebpackPlugin({
          hash: false,
          template: "./index.hbs",
          favicon: path.resolve(pkgpath.self(), `./${dirs.src}/images/favicon.ico`),
        }),
        new webpack.ContextReplacementPlugin(
          /moment[\/\\]locale$/,
          /nb/
        ),
      ]
    }
  );
}
