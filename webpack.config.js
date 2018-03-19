/*
  Configures how assets served by the browser (e.g. CSS, JS, images) are processed by webpack.
*/
var path = require("path");
var fs = require("fs");
var webpack = require("webpack");
var pkg = require('./package.json');

// @see https://github.com/jantimon/html-webpack-plugin
var HtmlWebpackPlugin = require("html-webpack-plugin");

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
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://0.0.0.0:3001",
    "webpack/hot/only-dev-server",
    "babel-polyfill",
    "whatwg-fetch",
    "./src/index"
  ],
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".js", ".json", ".jsx"],
    enforceExtension: false,
  },
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, "public"),
    port: 3001,
    host: "0.0.0.0",
    publicPath: "/",
    historyApiFallback: true,
    disableHostCheck: true
  },
  output: {
    path: path.join(__dirname, "public"),
    publicPath: "/",
    filename: "app.[hash].js"
  },
  devtool: "eval",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          },
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
            options: {
              sourceMap: true
            }
          },
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
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: false,
              // modules: true,
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
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("local"),
        PORT: JSON.stringify(process.env.PORT),
        SUPPORT_EMAIL: JSON.stringify(process.env.SUPPORT_EMAIL),
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      hash: false,
      template: "./index.hbs",
      favicon: 'src/images/favicon.ico'
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb/),
  ]
};
