/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const { AutoWebPlugin } = require('web-webpack-plugin');
const webpack = require('webpack');

const ignorePages = ['action_creators', 'action_types', 'reducers'];

const getPageEntris = () => {
  return fs
    .readdirSync(path.resolve(__dirname, '..', 'src', 'pages'))
    .filter(item => !ignorePages.includes(item))
    .reduce((target, next) => {
      if (next === '.DS_Store') {
        return '';
      }
      let fpath = `./src/pages/${next}/index.js`;
      if (!fs.existsSync(fpath)) {
        fpath = `${fpath}x`; // jsx
      }
      if (!fs.existsSync(fpath)) {
        throw new Error(`No page entry file for ${path.dirname(fpath)}.`);
      }
      target[next] = fpath;
      return target;
    }, {});
};

exports.entry = Object.assign({
  vendor: path.resolve(__dirname, '../src/assets/vendor'),
}, getPageEntris());

exports.getAutoWebPlugin = () => {
  return new AutoWebPlugin(path.resolve(__dirname, '../src/pages/'), {
    template(pageName) {
      let templatePath = path.resolve(__dirname, '../src/pages/', pageName, 'index.html');
      if (!fs.existsSync(templatePath)) {
        templatePath = path.resolve(__dirname, '../src/assets/template.html');
      }
      return templatePath;
    },
    ignorePages,
    htmlMinify: false,
  });
};

exports.resolve = {
  // 加快搜索速度
  modules: [
    path.resolve(__dirname, '..', 'src'),
    path.resolve(__dirname, '..', 'node_modules'),
  ],
  // es tree-shaking
  mainFields: ['browser', 'main'],
  // 加快编译速度
  alias: {},
  extensions: ['.jsx', '.js'],
};

exports.getCommonsChunkPlugin = () => {
  return new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: 5,
  });
};
