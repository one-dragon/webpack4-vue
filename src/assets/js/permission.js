
import store from '~/store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default (router, routes) => {
    // NProgress Configuration
    NProgress.configure({ showSpinner: false });
    router.beforeEach((to, from, next) => {
        // NProgress start
        NProgress.start();
        // 判断有无导航数据，没有获取
        if(store.state.sideBar.data.length == 0) {
            store.dispatch('sideBar/setData', routes).then(() => {
                next();
            })
        }else {
            next();
        }
    })
    router.afterEach(() => {
        // NProgress finish
        NProgress.done();
    })
}
