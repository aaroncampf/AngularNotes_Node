var webpack = require("webpack"); // jshint ignore:line
var path = require("path"); // jshint ignore:line
var webpackMerge = require("webpack-merge"); // jshint ignore:line

// Webpack Config
var webpackConfig = {
	entry: "./index.ts",
	output: {
		//publicPath: './dist',
		path: path.resolve(__dirname, "./dist"), // jshint ignore:line
	},

	plugins: [
		new webpack.ContextReplacementPlugin(
			/angular(\\|\/)core(\\|\/)@angular/,
			path.resolve(__dirname, './')
		)
	],

	module: {
		loaders: [

			// .ts files for TypeScript

			{
				test: /\.ts$/,
				loaders: [
					'awesome-typescript-loader',
					'angular2-template-loader',
					'angular2-router-loader'
				]
			},
			{ test: /\.scss$/, exclude: /node_modules/, loaders: ["style-loader", "css-loader", "sass-loader"]},
			{ test: /\.css$/, loaders: ["to-string-loader", "css-loader"]},
			{ test: /\.html$/, loader: "raw-loader" }
		]
	}
};

// Our Webpack Defaults
var defaultConfig = {
	devtool: "source-map",

	output: {
		filename: '[name].bundle.js',
		sourceMapFilename: '[name].map',
		chunkFilename: '[id].chunk.js'
	},

	resolve: {
		extensions: [ ".ts", ".js" ],
		modules: [ path.resolve(__dirname, "node_modules") ]  // jshint ignore:line
	},

	devServer: {
		historyApiFallback: true,
		watchOptions: { aggregateTimeout: 300, poll: 1000 },
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
		}
	},

	node: {
		global: true,
		crypto: 'empty',
		__dirname: true,
		__filename: true,
		process: true,
		Buffer: false,
		clearImmediate: false,
		setImmediate: false
	}
};
//
// module.exports = {
//   target: 'node'
// };
module.exports = webpackMerge(defaultConfig, webpackConfig); // jshint ignore:line