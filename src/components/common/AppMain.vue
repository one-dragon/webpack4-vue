<template>
    <section class="app_main" data-common-app-main-box>
        <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cachedTagsData">
                <router-view :key="key" ref="routerView" />
            </keep-alive>
        </transition>
    </section>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: 'appMain',
        data() {
            return {
                // 记录每次路由跳转时的pathKey: key数据
                keepAliveKey: {} // {} => pathKey: key
            }
        },
        computed: {
            ...mapState({
                cachedTagsData: state => state.tagsView.cacheData,
                closeTagsData: state => state.tagsView.closeData
            }),
            key() {
                return this.$route.fullPath;
            }
        },
        watch: {
            // 路由跳转记录key、pathKey
            $route() {
                this.recordPath();
            },
            // closeTagsData改变(关闭或打开tag时可能改变数据)，调用清除缓存函数
            closeTagsData() {
                if(this.closeTagsData.length > 0) {
                    let pathKey = this.closeTagsData[this.closeTagsData.length - 1];
                    let key = this.keepAliveKey[pathKey];
                    this.clear(key, pathKey);
                }
            }
        },
        mounted() {
            // this.clearCache();
            this.recordPath();
        },
        methods: {
            // 路由跳转，记录key、pathKey到keepAliveKey对象中
            // key：生成的keep-alive的key名 -> '__transition-76-/demo';  $vnode.key中获取
            // pathKey：绑定在router-view的key名 -> '/demo';  $vnode.data.key中获取，实际在computed中的key函数生成
            recordPath(){
                let routerView = this.$refs.routerView;
                if(routerView == null || routerView == undefined) return;
                if(routerView.$vnode && routerView.$vnode.parent && routerView.$vnode.parent.componentInstance) {
                    let key = routerView.$vnode.key; // '__transition-76-/demo'
                    let pathKey = routerView.$vnode.data ? routerView.$vnode.data.key : undefined; // '/demo'
                    this.keepAliveKey[pathKey] = key;
                }
            },
            // 每次关闭tag或新增tag时，判断closeTagsData进行对应tag的keep-alive清除
            // 概述逻辑：每次关闭tag或新增tag时，根据当前的key和pathKey，通过匹配cache和keys，删除对应缓存数据
            // cache：keep-alive中的缓存数据 -> {__transition-76-/demo: VNode};  $vnode.parent.componentInstance.cache中获取
            // keys：keep-alive中的缓存数据的key值数组 -> ['__transition-76-/demo'];  $vnode.parent.componentInstance.keys中获取
            clear(key, pathKey) {
                let routerView = this.$refs.routerView;
                if(routerView == null || routerView == undefined) return;
                let cache, keys;
                if(routerView.$vnode && routerView.$vnode.parent && routerView.$vnode.parent.componentInstance) {
                    cache = routerView.$vnode.parent.componentInstance.cache;
                    keys = routerView.$vnode.parent.componentInstance.keys;
                }
                if(this.closeTagsData.some(v => v == pathKey) && cache) {
                    if (cache[key]) {
                        if (keys.length) {
                            let index = keys.indexOf(key);
                            if (index > -1) {
                                keys.splice(index, 1);
                            }
                        }
                        delete cache[key];
                    }
                }
            }
        }
    }
</script>

<style>
    .app_main[data-common-app-main-box] {
        /*84 = navbar + tags-view = 50 +34 */
        /*min-height: calc(100vh - 84px);*/
        position: relative;
        overflow: hidden;
    }
</style>