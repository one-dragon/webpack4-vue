
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./base.config');
const Options = require('./options');
const OptionsBuild = Options.build;
const { getDllVendor, join, isDev, entryHtml } = require('./utils');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

const glob = require('glob-all');
const PurifyCSSPlugin = require('purifycss-webpack');

const prodConfig = merge(baseConfig, {
	mode: 'production',
    // devtool: false,
    // devtool: 'hidden-source-map',
    devtool: 'source-map',
    /*
    output: {
        filename: 'js/[name].[chunkhash:3].js',
        chunkFilename: 'js/[name].[chunkhash:3].js',
        publicPath: OptionsBuild.output.publicPath || '/',
    },
    */
    output: Object.assign(
    	{ publicPath: OptionsBuild.output.publicPath || '/' },
    	OptionsBuild.output.filename ? {} : { filename: 'js/[name].[chunkhash:3].js' }, 
    	OptionsBuild.output.chunkFilename ? {} : { chunkFilename: 'js/[name].[chunkhash:3].js' }
    ),
    stats: {
		colors: true,
	},
    plugins: [
        
        new webpack.DefinePlugin({
            'process.env': { OUTPUT_PATH: '"' + (OptionsBuild.output.publicPath || '/') + '"' },
        }),
        /*
        // webpack4开发模式下自动设置，设置全局变量，代码中也可用
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: '"production"' },
        }),
       	
       	// webpack4开发模式下自动设置，scope hoistingScope Hoisting-作用域提升
        new webpack.optimize.ModuleConcatenationPlugin(),
        
        // webpack4开发模式下自动设置，在编译出现错误时，跳过输出阶段，编译后提示。
        new webpack.NoEmitOnErrorsPlugin(),
        */
       
        /*
        // html打包，引入入口js文件
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/app/app.html',
            chunks: ['manifest', 'vendor', 'app'],
            inject: true,
            minify: {                           //压缩HTML文件
                removeComments: true,           //移除HTML中的注释
                collapseWhitespace: true        //删除空白符与换行符
                //removeAttributeQuotes: true,  //移除属性的引号
            },
            chunksSortMode: function(chunk1, chunk2) {
                var order = ['manifest', 'vendor', 'app'];
                var order1 = order.indexOf(chunk1.names[0]);
                var order2 = order.indexOf(chunk2.names[0]);
                return order1 - order2;
            }
        }),
        */
        
        /*
        // 显示构建进度
        new webpack.ProgressPlugin((percentage, msg) => {
            const readline = require('readline');
            //移动光标
            readline.clearLine(process.stdout);
            console.log('  ' + (percentage * 100).toFixed(2) + '%', msg);
            readline.moveCursor(process.stdout, 0, -1);
        }),
        */
        
        
        // 打包过程，以百分比显示打包进度
        new ProgressBarPlugin({
            complete: chalk.green('█'),
            incomplete: chalk.white('█'),
            format: '  build :bar ' + chalk.green.bold(':percent') + ' :msg',
            //format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
            clear: false
        }),
        
        // 删除文件
        new CleanWebpackPlugin(
            //['dist/*'],     
            [`${ OptionsBuild.output.pathName || 'dist' }/*`],      // 匹配删除的文件
            {
                root: join(__dirname, '..'),       					// 根目录
                verbose: true,                          			// 开启在控制台输出信息
                dry: false,                             			// 启用删除文件
            }
        ),
        
        // css文件打包
        new MiniCssExtractPlugin({
    		filename: 'css/[name].[contenthash:3].css',
            chunkFilename: 'css/[name].[contenthash:3].css'
    	}),
    	
    	// 用于css的tree-shaking，去掉没有使用的css样式
    	// new PurifyCSSPlugin({
            // // Give paths to parse for rules. These should be absolute!
            // paths: glob.sync(join(__dirname, '../src/app/*.html')),
        // }),
        
        // 会根据模块的相对路径生成一个几位数的hash作为模块id
        new webpack.HashedModuleIdsPlugin(),
    ],
    optimization: {
    	minimizer: [
      		new UglifyJSPlugin({
        		cache: true,
		        parallel: true,
		        sourceMap: true,
		        uglifyOptions: {
		            compress: {
                        warnings: false,
                        drop_debugger: true,
                        drop_console: true
                    }
		        }
	      	}),
     	 	new OptimizeCssAssetsPlugin({
	      		//assetNameRegExp: /\.src\.css$/g,
	      		cssProcessor: require('cssnano'),
	      		cssProcessorOptions: { parser: require("postcss-safe-parser"), discardComments: { removeAll: true } },
	      		canPrint: true
    		})
    	]
  	},
})


// webpack可视化构建
if (OptionsBuild.analyze) {
    prodConfig.plugins.push(
        new BundleAnalyzerPlugin(Object.assign({}, OptionsBuild.analyze))
    )
}

// extend配置
if(typeof OptionsBuild.extend === 'function') {
    const extendedConfig = Options.build.extend.call(this, prodConfig, { isDev });
    // 只返回配置文件，以返回向后兼容性。
    if(extendedConfig !== undefined) {
        prodConfig = extendedConfig;
    }
}

module.exports = new Promise((resolve, reject) => {
	// 设置html对应的入口js文件
	entryHtml(prodConfig, resolve);
})




