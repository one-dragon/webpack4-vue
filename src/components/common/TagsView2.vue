/*
 * @Author: on-dragon 
 * @Date: 2018-11-14 10:54:18 
 * @Last Modified by: on-dragon
 * @Last Modified time: 2018-11-15 19:29:30
 */
<template>
    <div class="tags_view clear_fix" data-common-tags-view2-box>
        <ScrollBar class="tags_view_scrollbar" horizontalSlide>
            <draggable v-model="dragTagsData" class="drag_box clear_fix" ref="tagsDragBox">
                <el-tag
                    :title="tag.meta.title"
                    v-for="tag in tagsData"
                    :key="tag.path"
                    :class="isActive(tag) ? 'active' : ''"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
                    <router-link :to="tag.path">{{ tag.meta.title }}</router-link>
                </el-tag>
            </draggable>
        </ScrollBar>
        <RightBar />
        <!--<el-tag
            class="active"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            <a href="#/aa">首页</a>
        </el-tag>-->
    </div>
</template>

<script>
    import Vue from 'vue';
    import { mapState } from 'vuex';
    import draggable from 'vuedraggable';
    import RightBar from '~/components/common/RightBar';
    import ScrollBar from '~/components/common/ScrollBar';
    import { scrollAnimate } from '~/assets/js/public';
    export default {
        name: 'tagsview',
        watch: {
            $route() {
                this.addViewTags();
                // this.changeTagsWidth();
            }
        },
        computed: {
            ...mapState({
                tagsData: state => state.tagsView.data
            }),
            // 拖拽时改变数据结构
            dragTagsData: {
                get() {
                    return this.$store.state.tagsView.data;
                },
                set(value) {
                    this.$store.commit('tagsView/CHANGE_DATA', value);
                }
            }
        },
        methods: {
            // 获取当前路由信息
            generateRoute() {
                if (this.$route.name) {
                    return this.$route;
                }
                return false;
            },
            // 往vuex里贯入数据
            addViewTags() {
                const route = this.generateRoute();
                if (!route) {
                    return false;
                }
                this.$store.dispatch('tagsView/addData', route).then(() => {
                    // console.log(this.$store.state.tagsView.data);
                    this.changeScrollbar();
                });
            },
            // 判断选中的tag是否隐藏在左侧或右侧，进行scrollbar滚动显示tag
            changeScrollbar() {
                this.$nextTick(() => {
                    setTimeout(() => {
                        let tags = this.$refs.tagsDragBox.$el.querySelectorAll('.el-tag'); // 所有tags
                        let currTag = null; // 当前tag
                        let view = this.$refs.tagsDragBox.$el.parentNode; // scrollbar里的.el-scrollbar__view
                        let warp = this.$refs.tagsDragBox.$el.parentNode.parentNode; // scrollbar里的.el-scrollbar__wrap
                        let warpScrollLeft = warp.scrollLeft; // warp的scrollLeft值
                        // 判断哪个为当前选中tag
                        Array.from(tags).map((item) => {
                            if(item.className.indexOf('active') > -1) {
                                currTag = item;
                            }
                        })
                        // 如果currTag.offsetLeft < warp.scrollLeft，表示当前标签在隐藏左侧
                        if(currTag.offsetLeft <= warpScrollLeft) {
                            // warp.scrollLeft = currTag.offsetLeft;
                            scrollAnimate(warp, 'left', currTag.offsetLeft);
                        }
                        // 如果currTag的offsetLeft + offsetWidth 大于 view的offsetWidth + warp.scrollLeft，表示当前标签在隐藏右侧
                        if((currTag.offsetLeft + currTag.offsetWidth) >= (view.offsetWidth + warpScrollLeft)) {
                            // warp.scrollLeft = Math.ceil((currTag.offsetLeft + currTag.offsetWidth) - view.offsetWidth);
                            scrollAnimate(warp, 'left', Math.ceil((currTag.offsetLeft + currTag.offsetWidth) - view.offsetWidth));
                        }
                    }, 300)
                })
            },
            // 判断是否选中当前tag
            isActive(route) {
                return route.path === this.$route.path;
            },
            // 关闭tab操
            handleClose(route) {
                // 清除当前路由对应的vuex数据
                if(route.meta && route.meta.storeName) {
                    if(this.$store._mutations[`${route.meta.storeName}/CLEAR_DATA`]) {
                        this.$store.commit(`${route.meta.storeName}/CLEAR_DATA`);
                    }
                }
                // 删除vuex中的tagsView数据中的当前路由
                this.$store.dispatch('tagsView/delData', route).then((list) => {
                    // 如果是关闭当前选中的tag时，判断跳转路由
                    if(this.isActive(route)) {
                        const latestRoute = list.slice(-1)[0];
                        if(latestRoute) {
                            this.$router.push(latestRoute);
                        }else {
                            this.$router.push('/');
                        }
                    }
                })
            },
            // 通过标签页外的宽度判断标签页的的宽度是否改变
            changeTagsWidth() {
                // 获取tags的父级box
                let box = this.$refs.tagsDragBox.$el;
                // 获取tags的父级box的宽度（18位滚动条宽度）
                let boxW = box.offsetWidth - 18;
                // 获取tags的宽度默认宽度
                let tagW = 130;
                // 判断当前父级box一行能放入几个tags数
                let tagNum = Math.floor(boxW / tagW);
                // 判断数量并添加class名
                if(this.tagsData.length > tagNum) {
                    box.className += ' average_tags';
                }else {
                    box.className = 'drag_box clear_fix';
                }
            }
        },
        components: {
            draggable,
            RightBar,
            ScrollBar
        },
        mounted() {
            this.addViewTags();
        }
    }
</script>

<style lang="scss">
    header.search_mode{
        .tags_view[data-common-tags-view2-box] .el-tag{
            pointer-events: none;
            overflow: hidden;
            white-space: nowrap;
            // padding: 1.5em 0;
            margin-left: -35px;
            opacity: 0;
        }
        .el-scrollbar__bar.is-horizontal{
            display: none;
        }
    }
</style>

<style lang="scss">
    .tags_view[data-common-tags-view2-box]{
        display: flex;
        font-size: 0;
        .tags_view_scrollbar{
            height: 34px;
            margin-bottom: -2px;
            flex: 1;
            .el-scrollbar__wrap{
                overflow-x: hidden;
            }
            .el-scrollbar__view:after{
                content: '';
                display: block;
                clear: both;
            }
        }
        .drag_box{
            // flex: 1;
            float: left;
            display: flex;
            white-space: nowrap;
            position: relative;
            // transition: transform .3s;
            .el-tag:last-child{
                margin-right: 0;
            }
        }
        // .average_tags{
        //     display: flex;
        //     .el-tag{
        //         width: auto;
        //         flex: 1;
        //     }
        // }
        .el-tag{
            display: flex;
            align-items: center;
            justify-content: center;
            height: 32px;
            margin-right: 4px;
            padding: 0;
            // background: rgba(231,237,245,1);
            background: rgba(136,152,172,0.08);
            border-radius: 4px 4px 0px 0px;
            border: 1px solid rgba(219,228,240,1);
            border-bottom: none;
            overflow: hidden;
            transition: all 250ms;
            &.active{
                // background: rgba(24,117,240,1);
                // border: 1px solid rgba(24,117,240,1);
                background: #F3F6FA;
                border: 1px solid #F3F6FA;
                > a{
                    // color: #fff;
                    color: #454D58;
                }
            }
            > a{
                flex: 1;
                padding: 0 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 12px;
                // color: rgba(136,152,172,1);
                color: #8898AC;
            }
            .el-tag__close{
                position: static;
                margin-right: 8px;
                // background-color: #fff;
                background-color: rgba(255,255,255,0.45);
                border-radius: 2px;
                // color: rgba(136,152,172,1);
                color: #8898AC;
                // transition: width .3s, margin .3s;
            }
        }
    }
</style>