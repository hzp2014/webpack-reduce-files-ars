// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const fs = require('fs');
const path = require('path');
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const {
  entry,
  resolve,
  getAutoWebPlugin,
  getCommonsChunkPlugin,
} = require('./webpack/config');

module.exports = {
  entry: entry,
  output: {
    path: path.resolve(__dirname, 'public/cdn'),
    filename: '[name]_[chunkhash].js',
  },
  resolve: resolve,
  module: {
    // 这些库都是不依赖其它库的库 不需要解析他们可以加快编译速度
    noParse: /node_modules\/(moment|chart\.js)/,
    rules: [
      {
        test: /\.jsx?$/,
        // cacheDirectory 缓存babel编译结果加快重新编译速度
        loader: 'babel-loader?cacheDirectory',
        // 只命中src目录里的js文件，加快webpack搜索速度
        include: [path.resolve(__dirname, 'src')]
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // 'NODE_ENV': JSON.stringify('production')
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      },
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   // 最紧凑的输出
    //   beautify: false,
    //   // 删除所有的注释
    //   comments: false,
    //   compress: {
    //     // 在UglifyJs删除没有用到的代码时不输出警告
    //     warnings: false,
    //     // 删除所有的 `console` 语句，可以兼容ie浏览器
    //     drop_console: true,
    //     // 内嵌定义了但是只用到一次的变量
    //     collapse_vars: true,
    //     // 提取出出现多次但是没有定义成变量去引用的静态值
    //     reduce_vars: true,
    //   }
    // }),
    new webpack.HashedModuleIdsPlugin({
      hashDigestLength: 10,
    }),
    new webpack.NamedChunksPlugin(),
    getAutoWebPlugin(),
    getCommonsChunkPlugin(),
    new CleanWebpackPlugin('public/cdn/*')
    // new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
  ],
};
