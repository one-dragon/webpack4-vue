
const { join, isDev } = require('./utils');
const Options = require('./options');
//const createResolver = require('postcss-import-resolver');
module.exports = function postcssConfig(isArr) {
    const pluginsArr = [
    	/*
        require('postcss-import')({
            resolve: createResolver({
                alias: {
                    '@': join(__dirname, '..', 'src'),
                    '~': join(__dirname, '..', 'src'),
                },
            })
        }),
        */
        // require('postcss-url')();
        // require('postcss-cssnext')(),
        // require('cssnano')({ safe: true }),
        require('autoprefixer')({ browsers: ['last 5 versions', 'Firefox >= 51'] }),
        ...(Options.build.postsccPlugins ? Options.build.postsccPlugins : [])
    ]
    return {
        sourceMap: isDev,
        useConfigFile: false,
        // ident: 'postcss',
        plugins: isArr ? pluginsArr : (loader) => pluginsArr,
    }
}
