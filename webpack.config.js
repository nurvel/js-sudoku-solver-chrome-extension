const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

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
	// optimization: {
	// 	splitChunks: {
	// 		chunks: 'all',
	// 		cacheGroups: {
	// 			vendor: {
	// 				test: /[\\/]node_modules[\\/]/,
	// 				name: 'vendors',
	// 				chunks: 'all'
	// 			}
	// 		}
	// 	} //, minimizer: [new UglifyJsPlugin()]
	// },
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/popup.html',
			filename: './popup.html',
			chunks: [ 'popup' ]
		})
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
				use: [ { loader: 'url-loader' } ]
			},
			{
				test: /\.html$/,
				use: [ { loader: 'html-loader' } ]
			}
		]
	}
};
