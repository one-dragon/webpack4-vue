
import { $v } from '~/assets/js/public';
import axios from 'axios';

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
