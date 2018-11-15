/*
 * @Author: on-dragon 
 * @Date: 2018-11-15 19:17:30 
 * @Last Modified by:   on-dragon 
 * @Last Modified time: 2018-11-15 19:17:30 
 */
<template>
    <el-container data-layout-default-box>
        <!--左侧菜单-->
        <el-aside>
            <SideBar />
        </el-aside>
        <el-container class="content_r">
            <el-scrollbar class="default_layout_scrollbar">
                <!--右侧顶部内容-->
                <el-header>
                    <NavBar />
                    <TagsView />
                </el-header>
                <!--右侧显示主要内容-->
                <el-main>
                    <!--<router-view />-->
                    <AppMain />
                </el-main>
            </el-scrollbar>
        </el-container>
    </el-container>
</template>

<script>
    import Vue from 'vue';
    // 公共布局组件
    import SideBar from '~/components/common/SideBar';
    import NavBar from '~/components/common/NavBar';
    import TagsView from '~/components/common/TagsView';
    import AppMain from '~/components/common/AppMain';
    // 全局注册公共组件--svg-icon
    import SvgIcon from '~/components/common/SvgIcon';
    Vue.component('SvgIcon', SvgIcon);
    
    export default {
        name: 'default',
        components: {
            SideBar,
            NavBar,
            TagsView,
            AppMain
        }
    }
</script>

<style lang="scss">
    .el-container[data-layout-default-box]{
        .el-aside{
            position: relative;
            z-index: 110;
            width: auto !important;
            overflow: visible !important;
        }
        .content_r{
            position: relative;
            height: 100vh;
            .el-scrollbar.default_layout_scrollbar{
                width: 100%;
                height: 100vh;
                background:rgba(248,251,255,1);
                > .el-scrollbar__wrap{
                    padding: 24px;
                    padding-top: 98px;
                    overflow-x: hidden;
                    box-sizing: border-box;
                }
                .el-header{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    padding: 0 24px;
                    padding-top: 16px;
                    background:rgba(248,251,255,1);
                    z-index: 100;
                }
                .el-scrollbar__bar.is-vertical{
                    z-index: 101;
                }
            }
        }
        .el-header{
            height: auto !important;
            padding: 0;
            /*border-bottom: 1px solid rgba(219,228,240,1);*/
           .tags_view{
               border-bottom: 1px solid rgba(219,228,240,1);
           }
        }
        .el-main{
            padding: 0;
            padding-top: 24px;
        }
    }
</style>