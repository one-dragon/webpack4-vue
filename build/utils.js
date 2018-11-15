const path = require('path');

// node-path封装
const join = path.join;
const resolve = path.resolve;
exports.join = join;
exports.resolve = resolve;

// console.log('process.argv----------');
// console.log(process.argv); // 获取参数：--config
// 是否为开发模式
const isDev =  process.env.NODE_ENV == 'development';
exports.isDev = isDev;


// 设置babel-loader里的options配置
exports.getBabelOptions = () => {
    const Options = require('./options');
    let obj = Object.assign(
        { plugins: [] }, 
        {
            babelrc: false,
            //cacheDirectory: true,
            //plugins: ['transform-runtime', 'transform-vue-jsx'],
        },
        Options.build.babel
    )
    obj.plugins = Array.from(new Set(['transform-runtime', 'transform-vue-jsx'].concat(obj.plugins)));
    if(!Options.build.babel.presets) {
        obj.presets = [
        	/*
            [
                'vue-app',
                { ie: 9, uglify: true }
            ]
            */
			[
	        	'env',
	        	{
	         	 	//'loose': true,
	          		'modules': false,
	          		'targets': ['> 1%', 'last 2 versions', 'not ie <= 8']
	        	}
	      	],
			'stage-2'
        ]
    }
    return obj;
}


// eslint配置
exports.createLintingRule = () => ({
    /*
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [ resolve(__dirname, '../src') ],
    options: {
        formatter: require('eslint-friendly-formatter'),
        // emitWarning: false
    }
    */
    // 使用happypack
    test: /\.(js|vue)$/,
    enforce: 'pre',
    use: 'happypack/loader?id=eslint',
    // include: [ resolve(__dirname, '../src') ]
    exclude: [ resolve(__dirname, '../src/static') ]
})


// 使用DllPlugin打包公共文件，获取对应的文件名
let getDllVendor = (callback) => {
    const fs = require('fs');
    fs.readdir(resolve(__dirname, '../src/static/vendor'), (err, files) => {
        if(err) {
            console.log('error:' + err.message);
            throw err.message;
            return;
        }
        let jsName = '';
        files.map((item) => {
            if(item.indexOf('vendor') > -1) {
                jsName = item;
                return;
            }
        })
        callback ? callback(jsName) : null;
    })
}
exports.getDllVendor = getDllVendor;



const Options = require('./options');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 根据 Options.build.entry里的配置生成对应入口js文件
exports.entryJS = () => {
	const list = Options.build.entry;
	let obj = {};
	list.map((item) => {
		let name = item.js.substr(item.js.lastIndexOf('/') + 1).replace('.js', '');
		obj[name] = `./src${item.js}`;
	})
	return obj;
}

// 根据 Options.build.entry里的配置生成对应入口html文件
exports.entryHtml = (config, resolve) => {
	const list = Options.build.entry;
	getDllVendor((jsVendor) => {
		list.map((item) => {
			let jsName = item.js.substr(item.js.lastIndexOf('/') + 1).replace('.js', '');
			let htmlName = item.html.substr(item.html.lastIndexOf('/') + 1).replace('.html', '');
			let htmlOptions = {
		        jsVendor: '',
		        filename: `${htmlName}.html`,
		        template: `./src${item.html}`,
		        inject: true,
		        chunksSortMode: 'none',
		        chunks: ['manifest', 'babel-runtime', jsName],
		    }
			// 生成模式
			if(!isDev) {
		    	htmlOptions.minify = {				//压缩HTML文件
		    		removeComments: true,           //移除HTML中的注释
		            collapseWhitespace: true        //删除空白符与换行符
		            //removeAttributeQuotes: true,  //移除属性的引号
		    	}
		    	htmlOptions.jsVendor = jsVendor 
                ? `<script src="${Options.build.output.publicPath || '/'}static/vendor/${jsVendor}"></script>` 
                : '';
                if(Options.build.useFundebug) {
                	htmlOptions.jsFundebug = `<script src="${Options.build.output.publicPath || '/'}static/fundebug/fundebug.js" apikey="${Options.build.useFundebug}"></script>`;
                }
		    }else{// 开发模式
		    	htmlOptions.jsVendor = jsVendor 
	            ? `<script src="http://${Options.local.host}:${Options.local.port}/static/vendor/${jsVendor}"></script>` 
	            : '';
		    }
		    config.plugins.push(
	            // html打包，引入入口js文件
	            new HtmlWebpackPlugin(htmlOptions)
	        )
		})
		// 生产时使用runtimeChunk插件打包公共文件,把manifest.js文件打到html中减少一次http请求
		if(!isDev) {
			const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
			config.plugins.push(
				new InlineManifestWebpackPlugin('manifest')
			)
		}
		resolve(config);
	})
}
