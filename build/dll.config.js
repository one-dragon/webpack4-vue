

const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Options = require('./options');
const { resolve, join, isDev } = require('./utils');

module.exports = {
    mode: isDev ? 'development' : 'production',
    // mode: 'production',
    entry: {
        vendor: Array.from(new Set(['vue', 'axios', 'vue-router', 'vuex'].concat(Options.build.vendor)))
    },
    output: {
        path: resolve(__dirname, '../src/static'),
        filename: isDev ? 'vendor/[name].js' : 'vendor/[name].[chunkhash:3].js',
        library: '[name]_library'
    },
    resolve: {
        extensions: ['.js', '.vue', '.scss', '.less', '.json', '.json5'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        }
    },
    plugins: [
        
        // 删除文件
        new CleanWebpackPlugin(
            ['src/static/vendor'],                      // 匹配删除的文件
            {
                root: join(__dirname, '..'),            // 根目录
                verbose: true,                          // 开启在控制台输出信息
                dry: false,                             // 启用删除文件
            }
        ),
        
        // 拆分 bundles，同时还大大提升了构建的速度
        new webpack.DllPlugin({
            context: join(__dirname, '..'),
            name: '[name]_library',
            path: resolve(__dirname, '../src/static/vendor/manifest.json'),
        }),
        
        // 会根据模块的相对路径生成一个几位数的hash作为模块id
        new webpack.HashedModuleIdsPlugin(),
        
        
        /*
        // 压缩插件
        new UglifyJSPlugin({
            // cache: true,
            sourceMap: true,
            parallel: true,
            extractComments: {
                filename: 'LICENSES'
            },
            uglifyOptions: {
                output: {
                    beautify: false, //不需要格式化
                    comments: false //不保留注释
                },
                compress: {
                    warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
                    drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
                    collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                    reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                },
                // mangle: {
                //    except: ['$super', '$', 'exports', 'require']
                // }
            }
        }),
        */
    ],
    // optimization: {
        // minimizer: [
            // new UglifyJSPlugin({
                // cache: 'node_modules/.cache/dll-uglifyjs-webpack-plugin',
                // parallel: true,
                // sourceMap: true
            // })
        // ]
    // },
    ...(isDev ? {} : {
        optimization: {
            minimizer: [
                new UglifyJSPlugin({
                    cache: 'node_modules/.cache/dll-uglifyjs-webpack-plugin',
                    parallel: true,
                    sourceMap: true
                })
            ]
        }
    })
};