<template>
    <div class="navbar_box clear_fix" data-common-nav-bar-box>
        <!--左侧搜索框-->
        <el-input
            class="search_input"
            placeholder="请输入搜索内容">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <!--右侧菜单区-->
        <div class="menu_r">
            <div class="menu_r_item">
                <a href="https://cn.vuejs.org/" target="_blank">Vue</a>
                <a href="http://element-cn.eleme.io/#/zh-CN" target="_blank" style="display: inline-block; margin-left: 20px;">Element</a>
            </div>
            <div class="menu_r_item border_lr">
                <svg-icon name="lock" fill="#8898ac" width="16" height="16" />
            </div>
            <div class="menu_r_item">
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        <svg-icon name="user" fill="#8898ac" width="16" height="16" />
                        <em>下拉菜单</em>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                        <el-dropdown-item>狮子头</el-dropdown-item>
                        <el-dropdown-item>螺蛳粉</el-dropdown-item>
                        <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                        <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'navbar'
    }
</script>

<style lang="scss">
    .navbar_box[data-common-nav-bar-box]{
        /*左侧搜索框*/
        .search_input{
            $search_input_height: 32px !default;
            width: 320px;
            height: $search_input_height;
            .el-input__inner{
                height: $search_input_height;
                border: none;
                font-size: 12px;
                color: rgba(136,152,172,0.60);
                box-shadow: 0 4px 15px 0 rgba(198,216,229,0.20);
                border-radius: 4px;
            }
            .el-input__icon.el-icon-search{
                line-height: $search_input_height;
                font-size: 12px;
                color:rgba(136,152,172,1);
            }
        }
        
        /*右侧菜单区*/
        .menu_r{
            float: right;
            .menu_r_item{
                &.border_lr{
                    /*border-left: 1px solid rgba(219,228,240,1);
                    border-right: 1px solid rgba(219,228,240,1);*/
                    padding: 0 16px;
                    position: relative;
                    &:before,
                    &:after{
                        content: '';
                        position: absolute;
                        top: 50%;
                        width: 1px;
                        height: 16px;
                        margin-top: -8px;
                        background-color: rgba(219,228,240,1);
                    }
                    &:before{
                        left: 0;
                    }
                    &:after{
                        right: 0;
                    }
                }
                display: inline-block;
                margin-left: 16px;
                & *{
                    color:rgba(136,152,172,1);
                    font-size: 12px;
                }
                svg{
                    margin-top: -2px;
                }
            }
        }
        
        
    }
</style>