const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
	mode: process.env.NODE_ENV || 'development',
	entry: {
		content: './src/content.js',
		popup: './src/popup.js'
	},
	output: {
		filename: './[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	optimization: {
		minimizer: [new UglifyJsPlugin()]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/popup.html',
			filename: './popup.html',
			chunks: [ 'popup' ]
		}),
		new CopyWebpackPlugin([
			{ from: './manifest.json', to: './manifest.json' }
		  ])
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ]
					}
				}
			},
			{
				test: /\.css$/,
				use: [ { loader: 'style-loader' }, { loader: 'css-loader' } ]
			},
			{
				test: /\.(png|jpg)/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.html$/,
				use: [ { loader: 'html-loader' } ]
			}
		]
	}
};
