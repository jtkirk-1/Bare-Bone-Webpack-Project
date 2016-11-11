var webpack = require('webpack');
var path = require('path');

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = process.env.WEBPACK_ENV;

var plugins = [];

plugins.push(new webpack.HotModuleReplacementPlugin());
plugins.push(new webpack.NoErrorsPlugin());

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
}

var config = {
  entry: {
    app: ['./src/entryPoint.js', 'webpack-hot-middleware/client']
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
  },
  output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.[name].js',
        publicPath: '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components|dist)/
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  plugins: plugins
};

module.exports = config;
