
import Vue from 'vue';
import LayoutDefault from '~/layout/Default';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

export const routes = [
    {
        path: '/',
        component: LayoutDefault,
        redirect: '/',
        name: 'demo',
        meta: { title: 'demo' },
        children: [
            {
                path: '',
                component: () => import ( /* webpackChunkName: "Demo" */ '~/pages/demo/demo/demo'),
                name: 'demoIndex',
                meta: {
                    title: '首页',
                    icon: 'demo',
                    storeName: 'Index',
                    noCache: false
                }
            }
        ]
    },
    {
        path: '/svg_icon',
        component: LayoutDefault,
        redirect: '/svg_icon/index',
        name: 'svg-icon',
        children: [{
            path: 'index',
            component: () =>
                import ( /* webpackChunkName: "svgIcon" */ '~/pages/demo/svg_icon'),
            name: 'svgIconIndex',
            meta: {
                title: 'svg图标使用',
                icon: 'icon',
                noCache: false
            }
        }]
    },
    {
        path: '/demo/ajax_example',
        component: LayoutDefault,
        redirect: '/demo/ajax_example/index',
        name: 'ajax',
        children: [{
            path: 'index',
            component: () =>
                import( /* webpackChunkName: "ajaxExample" */ '~/pages/demo/ajax_example'),
            name: 'ajax_example',
            meta: {
                title: 'ajax使用',
                icon: 'icon',
                noCache: false
            }
        }]
    }
];

/*
const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
})

export default router;
*/

export default new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: routes
})