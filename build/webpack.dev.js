const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    main: './src/main',
    vendors: ['vue', 'vue-router']
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin()
  ]
})
