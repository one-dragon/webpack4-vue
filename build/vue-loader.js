
const styleLoader = require('./style-loader');
const postcssConfig = require('./postcss');
const { getBabelOptions, isDev, resolve } = require('./utils');
module.exports = {
    postcss: postcssConfig.call(this, true),
    extractCSS: !isDev,
    cssSourceMap: isDev,
    preserveWhitespace: false,
    hotReload: false,
    // 设置为 true 的时候会开启基于文件系统的选项缓存，使得主 vue-loader 的选项可以分享给其它线程中的子 loader。只在和 HappyPack 或 thread-loader 配合使用的时候才用得到。
    threadMode: true,
    loaders: {
        js: [
          	{
            	loader: 'cache-loader',
            	options: {
              		cacheDirectory: resolve('node_modules/.cache/cache-loader-vue-script')
            	}
          	},
          	{
          		loader: 'babel-loader',
          		options: getBabelOptions()
          	}
        ],
        css: styleLoader.call(this, 'css', [], true),
        less: styleLoader.call(this, 'less', 'less-loader', true),
        scss: styleLoader.call(this, 'scss', 'sass-loader', true),
        sass: styleLoader.call(
            this,
            'sass',
            { loader: 'sass-loader', options: { indentedSyntax: true } },
            true
        ),
    },
    transformToRequire: {
        video: 'src',
        source: 'src',
        img: 'src',
        image: 'xlink:href'
    }
}