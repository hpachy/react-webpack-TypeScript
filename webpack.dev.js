const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    open: true,
  },
  output: {
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader", // 2. inject styles to dom
          "css-loader", // 1. Turns CSS into commonjs
          // for sass just add sass-loader to turns sass into CSS
        ],
      },
    ],
  },
});
