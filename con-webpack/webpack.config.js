var ET=require("extract-text-webpack-plugin");
module.exports={
	entry:__dirname+"/src/scripts/app.js",
	devtool:"source-map",   //source-map  在浏览器中显示源码
	output:{
		path:__dirname+"/prd/",  //当前目录
		filename:"boudle.js"
	},
	module:{
		loaders:[
			{
				test:/\.css$/,     //通过正则表达式筛选出所有的CSS文件
				loader:"style-loader!css-loader"		//编译之后输出
			},
			{
				test:/\.js$/,
				loader:"babel-loader"
			},
			{
				test:/\.scss$/,
				loader:"style-loader!css-loader!sass-loader"
				//loader:ET.extract({fallbackLoader:'style-loader',loader:'css-loader!sass-loader'})
			}
		]
	},
	/*plugins:[
		//new ET("boudle.css")
		new webpack.ProvidePlugin({
			$:"jQuery"
		})
	],*/
	/*devServer:{
		contentBase:"./webpack",		//本地服务器所加载的页面所在目录
		colors:true,					//终端中输出结果为彩色
		historyApiFallback:true,		//不跳转
		inline:true  					//实时刷新
	}*/
	//服务
	devServer:{
		contentBase:__dirname+"/prd",
		port:"80",//默认是8080
		inline:true,
		historyApiFallback:true,
		host:"localhost"
	}
}	