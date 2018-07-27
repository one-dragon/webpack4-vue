
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
    {
        path: '/home',
        component: () => import ( /* webpackChunkName: "Home" */ '~/pages/test/home')
    }
];

const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
})

export default router;
