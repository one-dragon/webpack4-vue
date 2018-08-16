
// 入口文件需要添加此段代码才能实现局部热更新，https://webpack.js.org/guides/hot-module-replacement/#enabling-hmr
if (module.hot) { module.hot.accept(); }

// 因为调用import()语法webpack会最后生成Promise语法， 所以transform-runtime解析不了， 需要先定义全局Promise语法让其解析
window.Promise = Promise;

// 加载css
require('~/assets/css/public');

import Vue from 'vue';
import router from '~/router/test';
import i18n from '~/i18n';
import store from '~/store';
import ajax from '~/assets/js/ajax';
Vue.use(ajax);

new Vue({
    el: '#app',
    data: {},
    router,
    i18n,
    store
})

/*
async function f() {
    let promise = new Promise((resolve) => {
        setTimeout(() => resolve('done!'), 1000)
    })
    let result = await promise // 直到promise返回一个resolve值（*）
    alert(result) // 'done!'
}
f();
*/
