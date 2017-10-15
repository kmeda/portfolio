var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');


const VENDOR_LIBS = ['jquery'];

module.exports = {
  entry: {
    bundle: './src/app.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: ''
  },
  resolve: {
    alias: {
        "TweenLite": path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
        "TweenMax": path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
        "TimelineLite": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
        "TimelineMax": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
        "ScrollMagic": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
        "animation.gsap": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
        "debug.addIndicators": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use : {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'es2015', 'stage-0']
            }
        }
      },
      {
        test: /\.pug$/,
        use: ["html-loader", "pug-html-loader"]﻿
      },
      {
        test: /\.(scss|sass)$/,
        exclude: /node_modules/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader','sass-loader']
        })),
      },
      {
      test: /\.(jpe?g|png|gif|svg)$/,
      exclude: /node_modules/,
      use: [
        { loader: 'url-loader',
          options: {limit: 40000}},
        'image-webpack-loader']
      },
      {
       test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
       use: 'url-loader?limit=10000&mimetype=application/font-woff'
     },
     {
       test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
       use: 'url-loader?limit=10000&mimetype=application/octet-stream'
     },
     {
       test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
       use: 'file-loader'
     },
     {
       test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
       use: 'url-loader?limit=10000&mimetype=image/svg+xml'
     },
     {
     test: /\.html$/,
      loader: 'html-loader?attrs[]=video:src'
    }, {
      test: /\.mp4$/,
      loader: 'url?limit=10000&mimetype=video/mp4'
    }

    ]
  },
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true
  },
  watchOptions: {
  ignored: /node_modules/
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.pug'
    }),
    new ExtractTextPlugin({
    filename: 'styles.css',
    allChunks: true
  }),
    new webpack.ProvidePlugin({
     $: "jquery",
     jQuery: "jquery"
   }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};
