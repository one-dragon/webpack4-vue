
const webpack = require('webpack');
const { resolve, join } = require('./utils');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
   	mode: 'production',
	entry: {
		fundebug: 'fundebug-javascript'
	},
	output: {
        path: resolve(__dirname, '../src/static'),
        filename: 'fundebug/[name].js',
    },
    plugins: [
        
        // 删除文件
        new CleanWebpackPlugin(
            ['src/static/fundebug'],                    // 匹配删除的文件
            {
                root: join(__dirname, '..'),       		// 根目录
                verbose: true,                          // 开启在控制台输出信息
                dry: false,                             // 启用删除文件
            }
        ),
        
        // 会根据模块的相对路径生成一个几位数的hash作为模块id
        new webpack.HashedModuleIdsPlugin(),
    ],
    optimization: {
    	minimizer: [
      		new UglifyJSPlugin({
        		cache: 'node_modules/.cache/fundebug-uglifyjs-webpack-plugin',
		        parallel: true,
		        sourceMap: true
	      	})
    	]
  	},
}
