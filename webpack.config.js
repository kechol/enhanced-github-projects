const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    content: './src/content',
    options: './src/options',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devtool: 'sourcemap',
  module: {
    rules: [{
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }],
    }, {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }],
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: '*',
      context: 'src',
      ignore: [
        '*.js',
        '*.ts',
        '*.tsx'
      ]
    }])
  ]
};
