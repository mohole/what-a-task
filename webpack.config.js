'use strict';

const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	devtool: 'source-map',
	plugins: [
		new UglifyJSPlugin({
			sourceMap: true
		}),
		new WebpackNotifierPlugin({
			title: 'What a task',
			alwaysNotify: true
		})
	],
	module: {
		rules: [
		{
			test: /\.js?$/,
			exclude: ['node_modules', 'dist/bundle.js'],
			loader: 'babel-loader',
			query: {
				presets: ['es2015','react']
			}
		}]
	}
}