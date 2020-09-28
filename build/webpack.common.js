
const path = require('path')
const pkg = require('../package.json')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  entry: ['./src/main.js'],
  node: {
    fs: 'empty'
  },
  resolve: {
    alias: {
      '@': resolve('/src'),
      '_c': resolve('/src/components'),
      'mixins': resolve('/src/components/mixins')
    },
    extensions: ['*', '.js', '.vue']
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      exclude: /(node_modules|bower_components)/ // 千万别忘记添加exclude选项,不然运行可能会报错
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: /\.(css|scss|less)$/,
      use: ['style-loader', 'css-loader', 'sass-loader', 'less-loader']
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: ['file-loader']
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: ['file-loader']
    },
    {
      test: /\.(csv|tsv)$/,
      use: ['csv-loader']
    },
    {
      test: /\.xml$/,
      use: ['xml-loader']
    }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.VERSION': `'${pkg.version}'`
    }),
    new HtmlWebpackPlugin({
      title: 'Fota Admin',
      inject: true,
      favicon: path.resolve('public/favicon.ico'),
      template: resolve('public/index.html')
    })
  ]
}
