const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { NODE_ENV = "production" } = process.env;

module.exports = {
  entry: "./src/index.tsx",
  mode: NODE_ENV,

  watch: NODE_ENV === "development",

  devServer: {
    stats: {
      children: false,
      maxModules: 0
    },
    port: 3001
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: path.join(__dirname, "/node_modules"),
        use: {
          loader: "ts-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  }
};
