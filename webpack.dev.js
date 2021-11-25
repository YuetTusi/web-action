const path = require('path');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
	mode: 'development',
	entry: {
		index: path.join(__dirname, './src/renderer/index/index.tsx')
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, './dist/renderer')
	},
	target: 'electron-preload',
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		},
		extensions: ['.tsx', '.ts', '.js', '.json']
	},
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
			},
			{
				test: /\.(png|jpg|jpeg|gif|ico)$/,
				type: 'asset/resource',
				generator: {
					filename: 'images/[hash:16][ext]'
				}
			},
			{
				test: /\.(woff|woff2|ttf|otf|eot|svg)$/,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[hash:16][ext]'
				}
			},
			{
				test: /\.css$/,
				use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
			},
			{
				test: /\.less$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{
						loader: 'less-loader',
						options: {
							lessOptions: {
								// modifyVars: theme,
								javascriptEnabled: true
							}
						}
					}
				]
			},
			{
				test: /\.ya?ml$/,
				use: [{ loader: 'yaml-loader' }]
			}
		]
	},
	plugins: [
		new AntdDayjsWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './src/renderer/index/index.html'),
			filename: 'index.html',
			chunks: ['index']
		}),
		new FriendlyErrorsWebpackPlugin({
			clearConsole: false,
			compilationSuccessInfo: {
				messages: ['bundle finished...']
			}
		})
	]
};

module.exports = config;
