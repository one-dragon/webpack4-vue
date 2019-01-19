
import Vue from 'vue';
import LayoutDefaul from '~/layout/Default';
import LayoutDefault2 from '~/layout/Default2';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const LayoutDefault = location.href.indexOf('demo2.html') > -1 ? LayoutDefault2 : LayoutDefaul;

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
        name: 'svgicon',
        children: [{
            path: 'index',
            component: () =>
                import ( /* webpackChunkName: "svgIcon" */ '~/pages/demo/svg_icon'),
            name: 'svg-icons',
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
            name: 'ajax-example',
            meta: {
                title: 'ajax使用',
                icon: 'icon',
                noCache: false
            }
        }]
    },
    {
        path: '/demo/ckeditor4',
        component: LayoutDefault,
        redirect: '/demo/ckeditor4/index',
        name: 'ckeditor4',
        children: [{
            path: 'index',
            component: () =>
                import( /* webpackChunkName: "Ckeditor4" */ '~/pages/demo/ckeditor4'),
            name: 'ckeditor4-example',
            meta: {
                title: 'ckeditor4使用',
                icon: 'icon',
                noCache: false
            }
        }]
    },
    {
        path: '/demo/ckeditor5',
        component: LayoutDefault,
        redirect: '/demo/ckeditor5/index',
        name: 'ckeditor5',
        children: [{
            path: 'index',
            component: () =>
                import( /* webpackChunkName: "Ckeditor5" */ '~/pages/demo/ckeditor5'),
            name: 'ckeditor5-example',
            meta: {
                title: 'ckeditor5使用',
                icon: 'icon',
                noCache: false
            }
        }]
    },
    {
        path: '/404',
        component: () =>
            import( /* webpackChunkName: "404" */ '~/pages/error/404'),
        name: '404',
        meta: {
            title: '404',
            icon: '404',
            noCache: false
        }
    },
    {
        path: '*',
        redirect: '/404'
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