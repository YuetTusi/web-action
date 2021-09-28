const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
	mode: 'development',
	entry: {
		index: path.join(__dirname, './src/renderer/index/index.tsx')
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, './dist/renderer'),
		publicPath: 'http://localhost:8084'
	},
	target: 'electron-preload',
	devServer: {
		static: {
			directory: path.join(__dirname, './dist')
		},
		port: 8084,
		compress: true,
		open: false,
		client: {
			overlay: { errors: true }
		}
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				use: [{ loader: 'ts-loader' }]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './src/renderer/index/index.html'),
			filename: 'index.html',
			chunks: ['index']
		})
	]
};

module.exports = config;
