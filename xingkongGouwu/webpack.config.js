var webpack = require ('webpack')
var HtmlWebpackPlugin = require ('html-webpack-plugin')
var ExtractTextPlugin = require ('extract-text-webpack-plugin')
var OpenBrowserPlugin = require ('open-browser-webpack-plugin')

module.exports = {
	entry: './src/script/app.js',
	
	output: {
		path: __dirname+'/build',
		//filename:'app_[hash].js'
		filename:'app.js'
	},
	
	devServer: {
		contentBase: './build',
		host: 'localhost',
		port:9000,
		historyApiFallback: false,
		proxy:{
			'/api1': {
		    	target: 'http://xkgwsj.duapp.com/indexm.php/',
		   		pathRewrite: {'^/api1': ''},
		   		changeOrigin: true
			},
			'/api': {
			    target: 'http://images.sctvgo.com/',
			   	pathRewrite: {'^/api': ''},
			   	changeOrigin: true
			}
		   
		}
		
	},
	
	module: {
		loaders: [
//			{
//				test:/\.css$/,
//				loader: 'style-loader!css-loader'
//			},
//			{
//				test:/\.scss$/,
//				loader: 'style-loader!css-loader!sass-loader'
//			}
			{
				test:/\.css$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
			},
			{
				test:/\.scss$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader!sass-loader'
				})
			},
			{
				test:/\.js$/,
				exclude: /node_modules/, 
				loader: 'react-hot-loader!babel-loader'
			}
		]
	},
	
	
	
	plugins: [
	
//		new webpack.optimize.UglifyJsPlugin({
//			compress: {
//				warnings: false
//			},
//			output: {
//				comments: false
//			}
//		}),
		
		new HtmlWebpackPlugin({
			template: './src/index.ejs',
			filename: 'index.html',
			title: '星空购物 - 四川广电星空电视购物官方网站'
		}),
		new ExtractTextPlugin({
			//filename: 'app_[hash].css',
			filename: 'app.css',
			disable: false,
			allChunks:true
		}),
		new OpenBrowserPlugin({
			url: 'http://localhost:9000'
		})
		
	],
	
	externals:{
		'$':'window.jquery',
		'react':'window.React',
		'react-dom' : 'window.ReactDOM',
		'react-router' : 'window.ReactRouter',
		'redux' : 'window.Redux',
		'react-redux' : 'window.ReactRedux'
	} 
}
