
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./base.config');
const Options = require('./options');
const { getDllVendor, isDev, join, entryHtml } = require('./utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const devConfig = merge(baseConfig, {
   	mode: 'development',
    // cheap-module-eval-source-map is faster for development
	//devtool: 'cheap-module-eval-source-map',
	devtool: 'cheap-source-map',
    output: {
        publicPath: `http://${Options.local.host}:${Options.local.port}/`,
    },
    devServer: {
        //contentBase: './dist',
        historyApiFallback: true,
        compress: false,
        hot: true,
        inline: true,
        progress: true,
        stats: { colors: true },
        quiet: true, // necessary for FriendlyErrorsPlugin
        overlay: {
            warnings: false,
            errors: true,
        },
        // watchOptions: {
        //     poll: true,
        // },
        disableHostCheck: true,
        host: Options.local.host,
        port: Options.local.port,
        proxy: Options.proxy
    },
    plugins: [
        
        /*
        // webpack4开发模式下自动设置，设置全局变量，代码中也可用
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: '"development"' },
        }),
       
       	// webpack4开发模式下自动设置，HMR shows correct file names in console on update.
        new webpack.NamedModulesPlugin(), 
        */
        
        /*
        // html打包，引入入口js文件
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/app/app.html',
            inject: true
        }),
       	*/
       	
        
        // 启用热替换模块(Hot Module Replacement)，也被称为 HMR。
        new webpack.HotModuleReplacementPlugin(),
        
        // 在编译出现错误时，跳过输出阶段，编译后提示。
        new webpack.NoEmitOnErrorsPlugin(),
        
        // 编译完成， 成功、失败提示
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: http://${Options.local.host}:${Options.local.port}`],
            },
			onErrors: (severity, errors) => {
		      	if (severity !== 'error') {
		        	return;
		      	}
		      	const notifier = require('node-notifier');
   				const pkg = require('../package.json');
		      	const error = errors[0];
   				notifier.notify({
		            title: pkg.name,
		            message: severity + ': ' + error.name,
		            subtitle: error.file || '',
		            icon: join(__dirname, 'icon.png')
		       })
		    }
        }),
        
        // 编译完成，自动打开浏览器
        new OpenBrowserPlugin({
            url: `http://${Options.local.host}:${Options.local.port}/`,
        }),
    ]
})



// options.js中的extend配置
if(typeof Options.build.extend === 'function') {
    const extendedConfig = Options.build.extend.call(this, devConfig, { isDev });
    // 只返回配置文件，以返回向后兼容性。
    if(extendedConfig !== undefined) {
        devConfig = extendedConfig;
    }
}

module.exports = new Promise((resolve, reject) => {
	// 设置html对应的入口js文件
	entryHtml(devConfig, resolve);
})
