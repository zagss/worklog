var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var publicPath = '/dist/'; //服务器路径
var path = __dirname + '/dist/';

var plugins = [];

if(process.argv.indexOf('-p') > -1){  //生产环境
  plugins.push(new webpack.DefinePlugin({ // 编译生产版本
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }));
  publicPath = '/lafeng-app/dist/';
  path = __dirname + '/lafeng-app/dist/';
}
plugins.push(new webpack.BannerPlugin("Author is Zagss , important things to say three times!"));
plugins.push(new ExtractTextPlugin('[name].css'));
plugins.push(new HtmlWebpackPlugin({
  filename: '../index.html', //生成html存放路径 相对于path
  template: './src/template/index.html'//html模板路径
}));
plugins.push(new webpack.HotModuleReplacementPlugin());//热加载插件
module.exports = {
  entry: {
    app: './src/main', //入口文件
  },
  output: {
    publicPath,
    path,//打包后的文件存放的地方
    filename: "[name].js"//打包后输出文件的文件名
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        loader: 'url?limit=500000&name=[name].[ext]' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用ba
      }
    ]
  },
  plugins,
  postcss: [
    require('autoprefixer') //调用autoprefixer插件
  ],
  devServer: {
    contentBase: "./dist",//本地服务器所加载的页面所在的目录
    colors: true,//终端中输出结果为彩色
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
    hot: true
  }

}
