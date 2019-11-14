const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: path.join(__dirname, 'src/js/main.js'),
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	resolve: { extensions: [".js"] },
	plugins: [
		new HtmlWebpackPlugin({ 
	 		filename: 'index.html',
	 		template: path.join(__dirname, 'src/index.html')
	 	}),
	 	new MiniCssExtractPlugin({
	      // Options similar to the same options in webpackOptions.output
	      // all options are optional
	      filename: 'styles.css',
	      ignoreOrder: false, // Enable to remove warnings about conflicting order
	    })
 	],
 	module: {
		rules: [
			{
				test: /.js?$/,
				exclude: /node_modules/,
				include: path.join(__dirname, 'src'),
				use: [
					{
						loader: 'babel-loader',
						options: { presets: ['@babel/preset-env'] }
					}
				]
			},
			//SE PRECISAR DE ARQUIVOS:
			// {
			// 	test: /\.(jpe?g|ico|png|gif|svg)$/i,
			// 	loader: 'file-loader?name=img/[name].[ext]' 
			// },
			{
		    	test: /\.s[ac]ss$/i,
		        use: [
		          // Creates `style` nodes from JS strings
		          'style-loader',
		          // Translates CSS into CommonJS
		          'css-loader',
		          // Compiles Sass to CSS
		          'sass-loader',
		        ],
		    },
			{
				test: /\.css$/, 
				use: [
		        	{
		            	loader: MiniCssExtractPlugin.loader,
		            	options: {
		              		// you can specify a publicPath here
		              		// by default it uses publicPath in webpackOptions.output
		              		publicPath: '../',
		              		hmr: process.env.NODE_ENV === 'development',
		            	},
		          	},
		          	'css-loader',
		        ]
			}
		]
	},
 	devServer: { 
		publicPath: "/", 
		contentBase: "./dist"
	}
}	