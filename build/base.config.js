

const webpack = require('webpack');
const { resolve, join, getBabelOptions, createLintingRule, isDev, entryJS } = require('./utils');
const Options = require('./options');
const OptionsBuild = Options.build;
const styleLoader = require('./style-loader');
const vueLoader = require('./vue-loader');
const vueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const baseConfig = {
	entry: entryJS(),
   	output: {
        path: resolve(__dirname, `../${ OptionsBuild.output.pathName || 'dist' }`),
        filename: OptionsBuild.output.filename
        	? typeof(OptionsBuild.output.filename) == 'function' 
        		? OptionsBuild.output.filename(isDev) : OptionsBuild.output.filename 
        	: 'js/[name].js',
        chunkFilename: OptionsBuild.output.chunkFilename
        	? typeof(OptionsBuild.output.chunkFilename) == 'function' 
        		? OptionsBuild.output.chunkFilename(isDev) : OptionsBuild.output.chunkFilename 
        	: 'js/[name].js',
    },
    resolve: {
    	extensions: ['.js', '.vue', '.scss', '.less', '.json', '.json5'],
    	alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': join(__dirname, '..', 'src'),
            '~': join(__dirname, '..', 'src'),
        }
    },
    module: {
    	rules:[
    		...(OptionsBuild.useEslint ? [createLintingRule()] : []),
    		{
                test: /\.vue$/,
                use: (isDev ? [] : [{ loader: 'thread-loader' }]).concat([
                	{
                		loader: 'vue-loader',
                		options: vueLoader,
                	}
                ])
           	},
	        {
	            test: /\.jsx?$/,
	           	use: (isDev ? [] : [{ loader: 'thread-loader' }]).concat([
		          	{
		            	loader: 'cache-loader',
		            	options: {
		              		cacheDirectory: resolve('node_modules/.cache/cacheLoaderJS')
		            	}
		          	},
		          	{
		          		loader: 'babel-loader',
		          		options: getBabelOptions()
		          	}
		        ]),
		        //exclude: [ resolve(__dirname, '../src/static') ],
	           	include:  Array.isArray(OptionsBuild.babelInclude) && OptionsBuild.babelInclude.length > 0 
	           	? OptionsBuild.babelInclude
	           	: [ resolve(__dirname, '../src') ]
	        },
	        {
        		test: /\.json$/,
        		loader: 'json-loader'
      		},
      		{
                // 使所有以 .json5 结尾的文件使用 `json5-loader`
                test: /\.json5$/,
                loader: 'json5-loader',
            },
	        { 
                test: /\.css$/, 
                use: styleLoader.call(this, 'css'),
            },
            { 
                test: /\.less$/, 
                use: styleLoader.call(this, 'less', 'less-loader'),
            },
            {
                test: /\.sass$/,
                use: styleLoader.call(this, 'sass', {
                    loader: 'sass-loader',
                    options: { indentedSyntax: true }
                }),
            },
            {
                test: /\.scss$/, 
                use: styleLoader.call(this, 'scss', 'sass-loader'),
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 1000, // 1KO
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000, // 1 KO
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(webm|mp4)$/,
                loader: 'file-loader',
                options: {
                    name: 'videos/[name].[hash:7].[ext]'
                }
            }
    	]
    },
    plugins: [
    	
    	// 启用Dll
    	new webpack.DllReferencePlugin({
            context: join(__dirname, '..'),
            manifest: require("../src/static/vendor/manifest.json"),
        }),
        
        // 调用vue-loade中的plugin.js
    	new vueLoaderPlugin(),
    	
    	// 复制文件
        new CopyWebpackPlugin([{
            from: resolve(__dirname, '../src/static'),
            to: 'static',
        }])

    ].concat(OptionsBuild.plugins),
	optimization: {
     	splitChunks: {
     		/*
	     	chunks: "initial", 				// 必须三选一： "initial" | "all"(默认就是all) | "async" 
	     	minSize: 0, 					// 最小尺寸，默认0
	     	minChunks: 1, 					// 最小 chunk ，默认1
	     	maxAsyncRequests: 1, 			// 最大异步请求数， 默认1
	     	maxInitialRequests : 1, 		// 最大初始化请求书，默认1
	     	name: function(){}, 			// 名称，此选项可接收 function
	     	*/
	     	cacheGroups:{ 					// 这里开始设置缓存的 chunks
	         	vendor: { 					// key 为entry中定义的 入口名称
	         		priority: 1, 			// 缓存组优先级
	             	chunks: "all",
	             	test: /[\\/]node_modules[\\/]babel-runtime/,
	             	name: 'babel-runtime',
	         	}
	     	}
		},
		// 对应每个entery入口文件生成对应的runtime~chunk文件名
		//runtimeChunk: true,
		// the default name is "runtime"
		//runtimeChunk: 'single',
		// specify another name
		runtimeChunk: {
            name: 'manifest'
        }
    }
}

module.exports = baseConfig;












// 通过预热 worker 池(worker pool)来防止启动 worker 时的高延时。
/*
if(!isDev) {
    const threadLoader = require('thread-loader');
    threadLoader.warmup({
        // pool options, like passed to loader options
        // must match loader options to boot the correct pool
    }, [
        // modules to load
        // can be any module, i. e.
        'vue-loader',
        'cache-loader',
        'babel-loader',
        'babel-plugin-transform-runtime',
        'babel-preset-stage-2',
        'babel-preset-env',
        'uglifyjs-webpack-plugin',
        'optimize-css-assets-webpack-plugin',
        'mini-css-extract-plugin',
        'style-loader',
        'css-loader',
        'postcss-loader',
        'sass-loader',
        'cssnano',
    ]);
}
*/