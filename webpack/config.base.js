const path = require('path')

const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const resolve = str => path.resolve(__dirname, str)

copyPluginConfig = [
  {
      from: resolve('../src/favicon.png'),
      to: resolve('../dist'),
  },
]

module.exports = {
  target: 'web',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlPlugin({ template: './src/index.html' }),
    new CopyPlugin(copyPluginConfig),
  ],
}
