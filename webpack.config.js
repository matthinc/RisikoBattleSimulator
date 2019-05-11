const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const dist = path.join(__dirname, 'dist');

const extractor = new MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: '[id].css'
})

const dev = process.env.NODE_ENV !== 'production'

module.exports = {
  watch: true,
  mode: process.env.NODE_ENV,
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: dist,
    publicPath: '/dist/'
  },
  plugins: [
    extractor
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: [
              'transform-class-properties',
              'transform-decorators-legacy',
              'transform-object-rest-spread',
              'transform-decorators'
            ]
          }
        }]
      },
      {
        test: /\.scss$/,
        use: [
          dev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          dev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
