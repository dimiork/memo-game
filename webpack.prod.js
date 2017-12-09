const merge = require('webpack-merge');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const common = require('./webpack.common.js');

module.exports = merge(common, {
	devtool: 'source-map',
	module: {
		rules: [
			{
			  test: /\.less$/,
			  use: ExtractTextPlugin.extract({
			    fallback: 'style-loader',
			      use: ['css-loader', 'less-loader']
			    })
			},
			{
  			test: /\.(png|jpeg|ttf|...)$/,
  			use: [
   				{ loader: 'url-loader', options: { limit: 8192 } } 
   				// limit => file.size =< 8192 bytes ? DataURI : File
  ]
}
		]
	},
  plugins: [
  	new ExtractTextPlugin("[name].bundle.css"),
    new UglifyJSPlugin({
    	sourceMap: true
    }),
    new webpack.DefinePlugin({
    	'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});