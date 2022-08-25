const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const pages = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];

module.exports = {
  entry: pages.reduce((config, page) => {
    config[page] = `./page/${page}/main.js`;
    return config;
  }, {}),
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [].concat(
    pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          inject: true,
          template: `./page/${page}/index.html`,
          filename: `${page}.html`,
          chunks: [page],
        })
    )
  ),
  devServer: {
    watchFiles: ["page/**/*.html"],
  },
};
