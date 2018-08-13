
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { isDev } = require('./utils');
const postcssConfig = require('./postcss');
module.exports = (ext, loaders = [], isVueLoader = false) => {
    const sourceMap = isDev;
    
//  loaders = (Array.isArray(loaders) ? loaders : [loaders]).map((loader) => {
//      return Object.assign(
//          { options: { sourceMap } },
//          typeof loader === 'string' ? { loader } : loader
//      )
//  })
    let is = false; 
    if(JSON.stringify(loaders) != '[]') {
        loaders = [`happypack/loader?id=${ext}`]
    }else {
        is = true;
    }
    
    const vueStyleLoader = {
        loader: 'vue-style-loader',
        options: { sourceMap }
    }
    
    const styleLoader = {
        loader: 'style-loader',
        options: { sourceMap }
    }
    
    loaders.unshift({
        loader: 'postcss-loader',
        options: postcssConfig(),
    })
    
    if(is) {
        loaders.unshift('happypack/loader?id=css');
    }else {
        loaders.unshift({
            loader: 'css-loader',
            options: {
                sourceMap,
                importLoaders: loaders.length, // Important!
                // 将来可能会取消该选项， 用optimize-css-assets-webpack-plugin代替
                //minimize: !sourceMap
            }
        })
    }
//  loaders.unshift({
//      loader: 'css-loader',
//      options: {
//          sourceMap,
//          importLoaders: loaders.length, // Important!
//          // 将来可能会取消该选项， 用optimize-css-assets-webpack-plugin代替
//          //minimize: !sourceMap
//      }
//  })
//  loaders.unshift('happypack/loader?id=css')
    
    if(!sourceMap) {
        loaders.unshift(MiniCssExtractPlugin.loader);
    }else {
        loaders.unshift(styleLoader);
    }
    
    const hotLoader = {
        loader: 'css-hot-loader',
        options: { sourceMap }
    }
    //console.log(loaders)
    return sourceMap ? [hotLoader].concat(loaders) : loaders;
}