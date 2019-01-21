
// 入口文件需要添加此段代码才能实现局部热更新，https://webpack.js.org/guides/hot-module-replacement/#enabling-hmr
if (module.hot) { module.hot.accept(); }

// 因为调用import()语法webpack会最后生成Promise语法， 所以transform-runtime解析不了， 需要先定义全局Promise语法让其解析
window.Promise = Promise;

// 加载公共css
require('~/assets/css/public');

// 引入vue
import Vue from 'vue';

// 引入主路由文件
import Login from '~/pages/login/login';

// 引入i18n
import i18n from '~/i18n';

// 引入添加vue原型链
import '~/assets/js/vue_prototype';

// 引入添加vue全局混入
import '~/assets/js/vue_mixin';

// 设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    data: {},
    i18n,
    render: h => h(Login)
})
