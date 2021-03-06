// require("babel-core/register");
require("babel-polyfill");

const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const browserConfig = {
  mode: "production",
  entry: ["babel-polyfill", "./src/browser/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: "babel-loader" },
      { test: /\.css$/, use: ["css-loader"] },
      {
        test: /\.(gif|svg|jpg|png)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true",
    }),
  ],
};

const serverConfig = {
  mode: "production",
  entry: ["babel-polyfill", "./src/server/index.js"],
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: "babel-loader" },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
      {
        test: /\.(gif|svg|jpg|png)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      __isBrowser__: "false",
    }),
  ],
};

module.exports = [browserConfig, serverConfig];
