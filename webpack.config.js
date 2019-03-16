// Path const: Webpack uses this to work with directorires
const path = require('path');

// Modules
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const miniExtractCss = new MiniCssExtractPlugin({
	filename: 'bundle.css'
})

// Main conf object: Write options and tell Webpack what to do
module.exports = {
	// Entry point: Webpack uses this file to start a job
	entry: './src/javascript/index.js',
	// Output's path and filename/Webpack bundle file
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	// Modules
	module: {
		rules: [
			{
				// Apply rules for all js files
				test: /\.js$/,
				// Ignored files / dirs when transforming modules
				exclude: '/(node_modules)/',
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				// Apply rule for .sass, .scss or css files
				test: /\.(sa|sc|c)ss$/,
				// Set loaders to transform files.
				// Loader are applying from right to left.
				// The first loader will be applied after others
				use: [
					{
						// Get all transformed CSS into single bundled file
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'sass-loader',
						options: {
							implementation: require('sass')
						}
					}
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				use: [
					{
						loader: 'file-loader',
						// Set different formats and dirs to save
						options: {
							outputPath: 'images'
						}
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|svg)$/,
				use: [
					{
						loader: 'file-loader',
						// Set different formats and dirs to save
						options: {
							outputPath: 'fonts'
						}
					}
				]
			}
		]
	},
	plugins: [
		miniExtractCss
	],
	// Webpack Mode
	// * Default mode for Webpack is production.
	// * Webpack would do different things depend on this mode
	mode: 'development'
};