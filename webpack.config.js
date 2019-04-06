const path = require('path');

module.exports = {
  entry: './src/inject/index.ts',
  output: {
    filename: 'inject.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
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
};
