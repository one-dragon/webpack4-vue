# webpack4-vue
webpack4 + Vue2全家桶(vue-router、vuex、vue-i18n)配合axios请求插件搭建的多页面或单页面应用  PC端用的element-ui2

一、 安装

1.安装node
    
    本地电脑中安装nodejs，因为webpack4不再支持node 4，可以直接升级到8.x以上版本，也是为了更好的支持es6语法， 我的node版本为v9.8.0，请下载node进行安装，如果node版本不一致，可能会需要重新安装node-sass，命令为npm i node-sass -S --legacy-bundling。

2.安装依赖包
    
    下载当前工程，cmd打开到当前目录下，输入npm install安装package.json中的依赖(注意npm3.x或以上的版本安装包是平行依赖安装的，如果不想平行安装可以输入npm install --legacy-bundling，但是需要npm为3.x版本，可npm降版本至3.x。)

3.输入命令
    
    下载依赖后，在cmd中(当前目录下)输入npm run dev命令，当前命令表示开发模式下打包编译并且是实时的，生产模式打包命令npm run build，在package.json中scripts有相关命令。

4.打开首页
    
    编译完成后浏览器会自动打开当前开发地址，可以看到首页内容


二、目录

1.build文件夹

    build文件夹下是webpack4相关的配置内容。
    
2.src文件夹

    src文件夹是开发目录，里面分为：
    app文件夹的入口文件(可放置html和对应的主入口文件)
    assets资源文件夹，可放置图片、js、css、font等文件
	components文件夹，可放置公共vue组件
    i18n文件夹为国际化文件内容，可配置前端的国际化语言
    pages文件夹放置对应主页面的vue文件页面，并配合router文件生成路由
    router文件夹配置路由
    static文件夹放置静态文件
    store文件夹放置vuex配置内容
    
3.eslintrc.js

    .eslintrc.js为配置eslint内容，默认在config.js中开启eslint验证
    
4.config.js

    config.js为配置暴露出来的api内容，可以配置开发模式下的端口号、反向代理、入口文件，还有相关webpack配置选项，并且有对应的注解

5.package.json
	
	相关依赖安装，和启动编译命令
	

三、打包

1.打包公共文件：
    
	打包公共文件使用DllPlugin插件，在config.js中可配置打包公共文件选项，相应命令为npm run dll，也可直接运行npm run dev，每次都会重新打包dll，打包完成后会在src\static\vendor下生成vendorJS公共文件，提升编译速度

2.fundebug文件打包：
	
	相应命令为npm run fundebug
	生成模式下devtool为'hidden-source-map'，因为代码为压缩，debug看不出原始代码结构，而且'hidden-source-map'生成的map文件不会在相对应的js底部注释链接，所以想再生产模式下查看原始代码需使用fundebug这类监控平台。
	需要在官网(https://www.fundebug.com/)注册生成apikey，在config.js中配置当前的apikey，再把生产模式下生成的map文件上传到官网中，报错就可以看到报错处对应的原始代码了(要想一直使用官网的Source Map支持功能需要花钱...)。
	
3.打包命令

	npm run server命令为开发模式，直接运行编译。
	
	npm run prod命令为生产模式，直接运行编译。
	
	npm run dll命令为打包公共文件，生成目录为src\static\vendor\vendor.js。
	
	npm run fundebug命令为打包fundebug文件，生成目录为src\static\fundebug\fundebug.js。
	
    npm run dev命令为开发模式，该命令会先打包公共文件后再正常编译，每次修改代码都会自动编译并自动刷新页面，打包的内容都在内存之中，目录中是看不到的，基于webpack-dev-server插件的，还可以在config.j里配置反向代理(跨域请求ajax)、开发地址等。
    
    npm run build命令为生产模式，该命令会先打包公共文件和fundebug后再正常编译，打包完成后会在目录中生成dist文件夹，该文件夹内容都是压缩版的，可以放到服务器中。


四、相关技术文档

webpack4参考网站： <a href="http://webpack.css88.com/" target="_blank">http://webpack.css88.com/</a>

Vue官网： <a href="https://cn.vuejs.org/" target="_blank">https://cn.vuejs.org/</a>

vue-router： <a href="https://router.vuejs.org/zh-cn/" target="_blank">https://router.vuejs.org/zh-cn/</a>

vuex： <a href="https://vuex.vuejs.org/zh-cn/" target="_blank">https://vuex.vuejs.org/zh-cn/</a>

vue-i18n： <a href="https://kazupon.github.io/vue-i18n/en/" target="_blank">https://kazupon.github.io/vue-i18n/en/</a>

element-ui： <a href="http://element-cn.eleme.io/#/zh-CN" target="_blank">http://element-cn.eleme.io/#/zh-CN</a>

vux： <a href="https://vux.li/" target="_blank">https://vux.li/</a>

es6入门教程： <a href="http://es6.ruanyifeng.com/" target="_blank">http://es6.ruanyifeng.com/</a>

scss中文教程： <a href="https://www.sass.hk/guide/" target="_blank">https://www.sass.hk/guide/</a>