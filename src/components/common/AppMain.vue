<template>
    <section class="app_main" data-common-app-main-box>
        <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cachedTagsData">
                <router-view :key="key" />
            </keep-alive>
        </transition>
    </section>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: 'appMain',
        computed: {
            ...mapState({
                cachedTagsData: state => state.tagsView.cacheData
            }),
            key() {
                return this.$route.fullPath;
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