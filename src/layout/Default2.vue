/*
 * @Author: on-dragon 
 * @Date: 2018-11-14 11:01:45 
 * @Last Modified by: on-dragon
 * @Last Modified time: 2018-11-15 20:08:38
 * description: 封装公共默认布局
 */
<template>
    <el-container data-layout-default2-box>
        <!--左侧菜单-->
        <el-aside>
            <SideBar />
        </el-aside>
        <el-container class="content_r">
            <el-scrollbar class="default_layout_scrollbar">
                <!--右侧顶部内容-->
                <el-header class="default_layout_header">
                    <!-- <NavBar /> -->
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
    import TagsView from '~/components/common/TagsView2';
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
    .el-container[data-layout-default2-box]{
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
                // background:rgba(248,251,255,1);
                background: #F3F6FA;
                > .el-scrollbar__wrap{
                    padding: 40px 20px;
                    padding-bottom: 24px;
                    overflow-x: hidden;
                    box-sizing: border-box;
                }
                .el-header{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    padding: 0 20px;
                    padding-top: 8px;
                    // background:rgba(248,251,255,1);
                    // background-color: rgba(219,228,240,.5);
                    background-color: #E7EDF5;
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
        //    .tags_view{
        //        border-bottom: 1px solid rgba(219,228,240,1);
        //    }
        }
        .el-main{
            padding: 0;
            padding-top: 14px;
        }
	}
</style>