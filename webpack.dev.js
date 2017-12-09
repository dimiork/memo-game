const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	module: {
		rules: [
			{
			  test: /\.less$/,
			  use: ['style-loader', 'css-loader', 'less-loader']
			},
			// {
			// 	test: /\.(png|jpg)$/,
			//   use: 'url-loader'
			// },
			{
			  test: /\.(jpg|png|svg)$/,
			  use: {
			    loader: "file-loader",
			    options: {
			      // name: "[path][name].[hash].[ext]",
			      name: '[sha512:hash:base64:7].[ext]'
			    },
			  },
			}
		]
	},
	// output: {
 //    publicPath: "img/[hash]/"
 //  },
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    // host: "192.168.1.196"
  }
});