const webpack = require('webpack');
const  path = require('path');

module.exports = {
  entry:
    './client/src/index.js'
  ,
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets:[ 'es2015', 'react', 'stage-2' ]
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  }
};
