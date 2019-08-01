const path = require("path");
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

const { NODE_ENV = "production" } = process.env;

module.exports = {
  entry: './src/index.ts',

  mode: NODE_ENV,
  
  watch: NODE_ENV === 'development',

  externals: [ nodeExternals() ],

  target: 'node',

  output: {
    filename: "index.js",
    path: path.resolve(__dirname, 'dist')
  },
  
  resolve: {
    extensions: [".ts", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: path.join(__dirname, '/node_modules'),
        use: ["ts-loader"]
      }
    ]
  },

  plugins: [
      new WebpackShellPlugin({
          onBuildEnd: ['yarn run:dev']
      })
  ],
};
