
import Vue from 'vue';
import { $v, PromptBox } from '~/assets/js/public';
import axios from 'axios';

Vue.use({
    install(Vue) {
        // 提示框方法
        Vue.prototype.$box = PromptBox.common;
        // ajax方法
        Vue.prototype.$v = $v;
        Vue.prototype.$get = function(...arg) {
            $v.get.apply(this, arg);
        }
        Vue.prototype.$delete = function(...arg) {
            $v.delete.apply(this, arg);
        }
        Vue.prototype.$post = function(...arg) {
            $v.post.apply(this, arg);
        }
        Vue.prototype.$put = function(...arg) {
            $v.put.apply(this, arg);
        }
        Vue.prototype.$axios = axios;
    }
})
/*
export default {
    install(Vue) {
        Vue.prototype.$v = $v;
        Vue.prototype.$get = function(...arg) {
            $v.get.apply(this, arg);
        }
        Vue.prototype.$delete = function(...arg) {
            $v.delete.apply(this, arg);
        }
        Vue.prototype.$post = function(...arg) {
            $v.post.apply(this, arg);
        }
        Vue.prototype.$put = function(...arg) {
            $v.put.apply(this, arg);
        }
        Vue.prototype.$axios = axios;
    }
}
*/