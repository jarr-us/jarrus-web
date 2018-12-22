/* eslint-disable */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const CSSExtract = new ExtractTextPlugin('styles.css');
require('dotenv').config({ path: '.env.test' });

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/**/*Spec.js'
    ],
    reporters: ['mocha'],
    mochaReporter: {
      ignoreSkipped: true,
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    browserNoActivityTimeout: 90000,
    singleRun: true,
    concurrency: Infinity,
    webpack:  {
      plugins: [
        CSSExtract,
        new webpack.DefinePlugin({
          'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
          'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
          'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
          'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
          'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
          'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
        })
      ],
        module: {
        rules: [{
          loader: 'babel-loader',
          test: /\.jsx?$/,
          exclude: /node_modules/        
        }, {
          test: /\.s?css$/,
          use: CSSExtract.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          })
        }]
      }
    },
    preprocessors: {
      './src/app.js': ['babel'],
      'test/**/*Spec.js': ['webpack']
    },
  })
}