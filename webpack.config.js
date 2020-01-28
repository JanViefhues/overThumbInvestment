// var path = require("path");

var path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    // path: path.resolve(__dirname, "/dist"),
    path: __dirname + '/dist',
    filename: "./bundle.js"
  },
  // 3
  devServer: {
    contentBase: "./dist"
  }
};
