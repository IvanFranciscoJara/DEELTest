var path = require('path')
const webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env) => {
  console.log('TIPO', env.TIPO, __dirname)
  return {
    entry: env.TIPO === 'functCom' ? './src/index.js' : './src/indexClass.js',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'index_bundle.js',
      publicPath: '/',
    },
    devtool: 'cheap-module-source-map',

    devServer: {
      port: 9000,
      historyApiFallback: true,
    },
    node: {
      fs: 'empty',
    },
    module: {
      rules: [
        { test: /\.(js)$/, include: path.resolve(__dirname, 'src'), use: 'babel-loader' },
        { test: /\.css$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
        { test: /\.s[ac]ss$/i, use: ['style-loader', 'css-loader', 'sass-loader'] },
      ],
    },
    mode: 'development',
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
      }),
    ],
  }
}
