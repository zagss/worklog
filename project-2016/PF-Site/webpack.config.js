const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
      app: './app/layout/main.js'
  },
  devtool: 'inline-source-map',
  devServer: {
      contentBase: './dist',
      hot: true,
      host: '192.168.168.147',
      disableHostCheck: true
  },
  module: {
      rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }
        },
        {
            test: /\.css|\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        },
        {
             test: /\.(png|svg|jpg|gif)$/,
             use: [{
                 loader: 'file-loader',
                 options: {
                     outputPath: 'img/'
                 }
             }]
        },
        {
			test: /\.art$/,
			use: [{
				loader: "art-template-loader"
			}]
		}
      ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
      template: __dirname + "/app/index.html"
    }),
     new webpack.NamedModulesPlugin(),
     new webpack.HotModuleReplacementPlugin(),
     new UglifyJsPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};