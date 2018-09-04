const webpack = require('webpack');
const path = require('path');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const stagingLevel = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const API_BASE_URL = {
    production: 'https://mpa.firebaseapp.com/api',
    development: 'http://localhost:5001/mikutter-plugin-archive/us-central1/api'
};

module.exports = {
  module: {
    rules: [
        {test: /.tsx?$/, loader: 'awesome-typescript-loader'},
        {test: /.css$/, use: ['style-loader', 'css-loader']}
    ]
  },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

  plugins: [
      new UglifyJSPlugin(),
      new webpack.DefinePlugin({
          'API_BASE': JSON.stringify(API_BASE_URL[stagingLevel])
      })
  ],
  entry: './src/index.tsx',

  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },

  mode: 'development',

  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      name: true,

      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    }
  }
};