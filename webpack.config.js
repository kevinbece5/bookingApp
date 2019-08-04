const webpack = require('webpack');
module.exports = {
  entry: './src/index.js',
  //output of the bundle
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  //this will handle all the react code to be bundled right
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.css$/i,
        use: ['css-loader'],
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  //hot reloafer
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin()
  // ],
  // //When running npm start the output of dev server will be to this folder
  // devServer: {
  //   contentBase: './dist'
  // }
};