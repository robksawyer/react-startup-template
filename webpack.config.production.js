/*
  Configures how assets served by the browser (e.g. CSS, JS, images) are processed by webpack.
*/
var path = require("path");
var fs = require("fs");
var webpack = require("webpack");
var pkg = require('./package.json');

// @see https://github.com/jantimon/html-webpack-plugin
var HtmlWebpackPlugin = require("html-webpack-plugin");

// @see https://github.com/webpack-contrib/extract-text-webpack-plugin
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// @see https://github.com/jantimon/favicons-webpack-plugin
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');

// @see https://github.com/mrsum/webpack-svgstore-plugin
const SvgStorePlugin = require('webpack-svgstore-plugin');

// Simulate config options from your production environment by
// customising the .env file in your project"s root folder.
// const config = require("./config/vars");
var envPath = "../../src/.env";
if(fs.existsSync(envPath)){
  require("dotenv").config({
    path: envPath,
  });
}

module.exports = {
  entry: {
    vendor: ["react", "react-dom", "react-router", "react-router-dom", "axios", "mobx", "mobx-react", "moment"],
    app: ["babel-polyfill", "./src/index.js"]
  },
  resolve: {
    modules: [path.resolve(__dirname, "app"), "node_modules"],
    extensions: [".js", ".json", ".jsx"],
    enforceExtension: false,
  },
  output: {
    path: path.join(__dirname, "public"),
    publicPath: "/",
    filename: "assets/[name].[hash].js",
    chunkFilename: "assets/[name].[chunkhash].js"
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.join(__dirname, "src"),
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.scss$/i,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true
              }
            },
            { loader: "resolve-url-loader" },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: false
            }
          },
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: "65-90",
                speed: 4
              }
            }
          },
          {
            loader: "file-loader",
            options: {
              hash: "sha512",
              digest: "hex",
              name: "[hash].[ext]"
            }
          },
        ]
      },
      {
        test: /\.svg$/,
        use: {
          loader: "svg-inline-loader",
        },
      },
      // @see https://survivejs.com/webpack/loading/fonts/
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "application/font-woff"
          }
        }
      },
      {
        test: /\.(otf|ttf|eot|svg)?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "/assets/fonts/[name]-[md5:hash:hex:8].[ext]"
          }
        }
      },
      {
        test: /\.(html)?$/,
        loader: 'file-loader',
        options: {
          name: "[name].[ext]"
        }
      },
      {
        test: /\.mp4$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'video/mp4',
        }
      },
      {
        test: /\.md$/,
        loader: 'null'
      },
    ]
  },
  plugins: [
    new SvgStorePlugin({prefix: 'icon--', svg: { style: '', class: 'accessibility' }}),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
        PORT: JSON.stringify(process.env.PORT),
        SUPPORT_EMAIL: JSON.stringify(process.env.SUPPORT_EMAIL),
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
        drop_console: true,
        screw_ie8: true
      },
      output: {
          comments: false
      }
    }),
    new ExtractTextPlugin("assets/styles.css"),
    new FaviconsWebpackPlugin('./src/images/logo.png'),
    new HtmlWebpackPlugin({
      favicon: './src/images/favicon.ico',
      hash: false,
      // The 200.html is specifically to solve issues related to Surge.
      // @see https://surge.sh/help/adding-a-200-page-for-client-side-routing
      filename: '200.html',
      template: "./index.hbs"
    })
  ]
};
