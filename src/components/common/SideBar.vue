/*
 * @Author: on-dragon 
 * @Date: 2018-11-14 10:55:11 
 * @Last Modified by: on-dragon
 * @Last Modified time: 2018-11-15 19:54:49
 */
<template>
    <el-scrollbar class="sidebar_box" :class="{'hide_sidebar' : !isOpenSidebar, 'hide_text': !isShowSidebarText}" wrap-class="scrollbar_wrapper" data-common-side-bar-box>
        <div class="logo_box">
            <img src="../../assets/img/sidebar/logo.png" v-show="isOpenSidebar" />
            <img src="../../assets/img/sidebar/logo_mini.png" v-show="!isOpenSidebar" />
            <div class="line"></div>
        </div>
        <ul class="menu_bar" ref="meuns">
            <li 
                v-for="(subMenu, subMenuIndex) in $store.state.sideBar.data" 
                :key="'subMenu' + subMenuIndex" 
                @mouseenter="menuItemEnter(subMenuIndex)"
                @mouseleave="menuItemLeave(subMenuIndex)">
                <!--一级菜单-->
                <div class="submenu">
                    <i class="el-icon-menu" :title="subMenu.name"></i>
                    <!-- <router-link 
                        :to="subMenu.path" 
                        v-if="subMenu.children.length == 1 && subMenu.children[0].path == 'index'">
                        {{ subMenu.name }}
                    </router-link>
                    <span v-if="subMenu.children.length > 1 || subMenu.children[0].path != 'index'">{{ subMenu.name }}</span> -->
                    <router-link 
                        :to="subMenu.path == '/' ? '/' + subMenu.children[0].path : subMenu.path + '/' + subMenu.children[0].path" 
                        v-if="subMenu.children.length == 1 && (!subMenu.children[0].children || subMenu.children[0].children.length == 0)">
                        {{ subMenu.children[0].meta.title }}
                    </router-link>
                    <span v-if="subMenu.children.length > 1 || (subMenu.children[0].children && subMenu.children[0].children.length > 0)">{{ subMenu.meta.title }}</span>
                </div>
                <!--二级以上菜单-->
                <div class="childmenu" v-if="subMenu.children.length > 1 || (subMenu.children[0].children && subMenu.children[0].children.length > 0)">
                    <el-scrollbar class="childmenu_layout" style="height: 100%;">
                        <h3>{{ subMenu.meta.title }}</h3>
                        <div class="warp_menu" :class="subMenu.children.length == 1 ? 'column_count1' : subMenu.children.length == 2 ? 'column_count2' : 'column_count3'">
                            <dl v-for="(childMenu, childMenuIndex) in subMenu.children" :key="'childMenu' + childMenuIndex">
                                <dt>
                                    <router-link 
                                        @click.native="menuItemLeave(subMenuIndex)" 
                                        :to="subMenu.path == '/' ? '/' + childMenu.path : subMenu.path + '/' + childMenu.path" 
                                        v-if="!childMenu.children || childMenu.children.length == 0">
                                        {{ childMenu.meta.title }}
                                    </router-link>
                                    <span v-if="childMenu.children && childMenu.children.length > 0">{{ childMenu.meta.title }}</span>
                                </dt>
                                <dd>
                                    <router-link 
                                        @click.native="menuItemLeave(subMenuIndex)"
                                        :to="subMenu.path + '/' + childMenu.path + '/' + childMenuItem.path" 
                                        v-for="(childMenuItem, childMenuItemIndex) in childMenu.children"
                                        :key="'childMenuItem' + childMenuItemIndex">
                                        {{ childMenuItem.meta.title }}
                                    </router-link>
                                </dd>
                            </dl>
                        </div>
                    </el-scrollbar>
                </div>
            </li>
            <!--<li>
                <div class="submenu">
                    <i class="el-icon-menu"></i>
                    <span>首页</span>
                </div>
                <div class="childmenu">
                    <el-scrollbar class="childmenu_layout" style="height: 100%;">
                        <h3>首页</h3>
                        <div class="warp_menu">
                            <dl>
                                <dt>客户账户</dt>
                                <dd>
                                    <a href="#">111客户资料创建</a>
                                    <a href="#">客户资料创建</a>
                                </dd>
                            </dl>
                            <dl>
                                <dt>客户账户</dt>
                                <dd>
                                    <a href="#">222客户资料创建</a>
                                    <a href="#">客户资料创建</a>
                                </dd>
                            </dl>
                            <dl>
                                <dt>客户账户</dt>
                                <dd>
                                    <a href="#">333客户资料创建</a>
                                    <a href="#">客户资料创建</a>
                                </dd>
                            </dl>
                        </div>
                    </el-scrollbar>
                </div>
            </li>-->
        </ul>
        <!--<div class="hamburger_btn"  @click="isOpenSidebar = !isOpenSidebar">-->
        <div class="hamburger_btn"  @click="hamburgerClick">
            <a :class="!isOpenSidebar ? 'hide_sidebar' : ''"><em></em></a>
        </div>
    </el-scrollbar>
</template>

<script>
    import Vue from 'vue';
    import { routes } from '~/router';
    import { Scrollbar } from 'element-ui';
    Vue.use(Scrollbar);
    export default {
        data() {
            return {
                // 左侧菜单是否展开闭合
                isOpenSidebar: true,
                isShowSidebarText: true
            }
        },
        methods: {
            // 鼠标进入菜单
            menuItemEnter(index) {
                let menu = this.$refs.meuns;
                let menuList = Array.from(menu.querySelectorAll('li'));
                // menuList.map((item) => {
                // item.className = '';
                // })
                menuList[index].className = 'is';
                setTimeout(() => {
                    if(menuList[index].className == 'is') {
                        menuList[index].className = 'active slide_in';
                        setTimeout(() => {
                            menuList[index].className = 'active';
                        }, 100)
                    }
                }, 300)
            },
            // 鼠标离开菜单
            menuItemLeave(index) {
                let menu = this.$refs.meuns;
                let menuList = Array.from(menu.querySelectorAll('li'));
                menuList[index].className += ' slide_out';
                setTimeout(() => {
                    menuList[index].className = '';
                }, 80)
            },
            // 底部汉堡按钮点击事件
            hamburgerClick() {
                this.isOpenSidebar = !this.isOpenSidebar;
                this.isShowSidebarText = false;
                setTimeout(() => {
                    this.isShowSidebarText = true;
                }, 300)
            }
        },
        mounted() {}
    }
</script>

<style lang="scss">
    @import "~/assets/css/theme_default";
    .sidebar_box[data-common-side-bar-box]{
        /*position: fixed;
        left: 0;
        top: 0;*/
        height: 100vh;
        width: $sidebar_width;
        /*height: 100%;*/
        /*background: linear-gradient(225deg,rgba(0,162,249,1) 0%,rgba(25,74,242,1) 100%);*/
        box-shadow: 4px 0 15px 0 rgba(45,71,125,0.3);
        transition: width .3s;
        &:before, &:after{
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
        &:before{
            background: linear-gradient(225deg,rgba(0,162,249,1) 0%,rgba(25,74,242,1) 100%);
            z-index: 100;
        }
        &:after{
            background-image: url("../../assets/img/sidebar/nav_bg.png");
            background-repeat: no-repeat;
            z-index: 101;
        }
        .scrollbar_wrapper{
            position: relative;
            /*min-height: 100vh;*/
            height: calc(100vh - 32px);
            /*background-image: url("../../assets/img/sidebar/nav_bg.png");*/
            background-repeat: no-repeat;
            /*padding-bottom: 32px;*/
            margin-bottom: 0 !important;
            box-sizing: border-box;
            overflow-x: hidden !important;
        }
        /*sidebar隐藏----样式*/
        &.hide_text{
            .submenu{
                span, a{
                    display: none !important;
                }
            }
        }
        &.hide_sidebar{
            width: $hide_sidebar_width;
            .logo_box{
                .line{
                    width: 24px;
                }
            }
            .menu_bar{
                > li{
                    padding: 0;
                }
                > li.slide_out .childmenu{
                    animation: menu_hide_slideout .1s cubic-bezier(0, 0, .2, 1)
                }
                > li.slide_in .childmenu{
                    animation: menu_hide_slidein .1s cubic-bezier(0, 0, .2, 1)
                }
                .submenu{
                    padding: 0 ($hide_sidebar_width - $sidebar_ico_width) / 2;
                    span, a{
                        display: inline-block;
                        width: 0px;
                        height: 0;
                        overflow: hidden;
                        visibility: hidden;
                    }
                }
                .childmenu{
                    left: $hide_sidebar_width;
                }
            }
            .hamburger_btn{
                width: $hide_sidebar_width;
            }
        }
        /*logo区域*/
        .logo_box{
            position: relative;
            height: 120px;
            color: #fff;
            text-align: center;
            z-index: 102;
            img{
                display: block;
            }
            .line{
                width: 128px;
                height: 1px;
                margin: 0 auto;
                background: linear-gradient(to left,rgba(4, 190, 254, 0.8),rgba(32, 104, 230, 1),rgba(4, 190, 254, 0.8));
                transition: width .3s;
            }
        }
        /*菜单区域*/
        .menu_bar{
            $menu_height: 40px;
            > li{
                height: $menu_height;
                font-weight: 400;
                line-height: $menu_height;
                overflow: hidden;
            }
            > li .submenu{
                position: relative;
                display: flex;
                padding-left: 20px;
                align-items: center;
                height: $menu_height;
                font-size: 0;
                z-index: 102;
                &:hover{
                    background: rgba(255,255,255,0.2);
                }
            }
            > li .submenu i {
                font-size: 14px;
            }
            > li .submenu span{
                cursor: default;
            }
            > li .submenu i,
            > li .submenu span,
            > li .submenu a{
                color: #fff;
            }
            > li .submenu span,
            > li .submenu a{
                display: flex;
                align-items: center;
                flex: 1;
                margin-left: $sidebar_ico_width;
                height: $menu_height;
                overflow: hidden;
                /*text-overflow: ellipsis;
                white-space: nowrap;*/
                padding-right: 10px;
                font-size: 13px;
                line-height: 16px;
            }
            // > li:hover{
            //     /*background: rgba(255,255,255,0.2);*/
            //     /*.childmenu{
            //        width: 828px;
            //     }*/
            // }
            > li.slide_out .childmenu{
                animation: menu_open_slideout .1s cubic-bezier(0, 0, .2, 1)
            }
            > li.slide_in .childmenu{
                animation: menu_open_slidein .1s cubic-bezier(0, 0, .2, 1)
            }
            > li.active{
                .submenu{
                    background: rgba(255,255,255,0.2);
                }
                .childmenu{
                   /*width: 828px;*/
                   display: block;
                }
            }
            /*子菜单样式*/
            .childmenu{
                position: fixed;
                left: $sidebar_width;
                top: 0;
                bottom: 0;
                display: none;
                /*width: 0;
                overflow: hidden;*/
                /*display: flex;
                flex-flow: column;
                flex-direction: column;
                flex-wrap: wrap;*/
                /*padding: 40px 48px;*/
                padding-bottom: 40px;
                background-color: #fff;
                box-shadow: 4px 0px 20px 0px rgba(37,47,68,0.15);
                transition: width .3s;
                z-index: 99;
                .childmenu_layout{
                    .el-scrollbar__wrap{
                        overflow-x: hidden !important;
                    }
                }
                h3{
                    padding-left: 48px;
                    padding-top: 40px;
                    padding-bottom: 26px;
                    line-height: 24px;
                    font-weight: 600;
                    color: #1875F0;
                    &:before, &:after{
                        content: '';
                        display: inline-block;
                        width: 5px;
                        height: 5px;
                        margin-top: -2px;
                        background-color: #1875F0;
                        vertical-align: middle;
                        transform: rotate(45deg);
                    }
                    &:before{
                        margin-right: 6px;
                    }
                    &:after{
                        margin-left: 6px;
                    }
                }
                .warp_menu{
                    &.column_count1{
                        column-count: 1;
                    }
                    &.column_count2{
                        column-count: 2;
                    }
                    &.column_count3{
                        column-count: 3;
                    }
                    /*display: flex;
                    flex-direction: column;
                    flex-wrap: wrap;*/
                    /*column-count: 3;*/
                    column-gap: 0;
                    padding-left: 48px;
                    padding-right: 12px;
                }
                dl{
                    width: 224px;
                    margin-right: 32px;
                    margin-bottom: 16px;
                    break-inside: avoid;
                    dt{
                        margin-bottom: 10px;
                        line-height: 36px;
                        color: #454D58;
                        border-bottom: 1px #E7EDF5 solid;
                        a{
                            color: #454D58;
                            &:hover{
                                color: #1875F0;
                            }
                        }
                    }
                    dd a{
                        display: block;
                        font-size: 12px;
                        line-height: 24px;
                        color: #8898AC;
                        &:hover{
                            color: #1875F0;
                        }
                    }
                }
            }
        }
        /*底部展开、关闭按钮*/
       .hamburger_btn{
            /*position: absolute;
            left: 0;
            right: 0;
            bottom: 0;*/
            position: fixed;
            left: 0;
            bottom: 0;
            width: $sidebar_width;
            height: 32px;
            background: rgba(255,255,255,0.2);
            box-shadow: 0px 4px 15px 0px rgba(198,216,229,0.2);
            transition: width .3s;
            z-index: 104;
            a:before, a:after, a em{
                content: '';
                display: inline-block;
                width: 1px;
                height: 12px;
                background: #fff;
                border-radius: 1px;
                margin: 2px;
            }
            a{
                position: absolute;
                left: 50%;
                top: 50%;
                display: inline-block;
                height: 16px;
                width: 16px;
                margin-left: -8px;
                margin-top: -8px;
                transition: transform .3s;
            }
            a.hide_sidebar{
                transform: rotate(90deg);
            }
       }
       .el-scrollbar__bar.is-vertical{
           z-index: 101;
       }
       @keyframes menu_open_slideout {
            0% {
                left: $sidebar_width
            }
            to {
                left: 0
            }
        }
        @keyframes menu_open_slidein {
            0% {
                left: 0
            }
            to {
                left: $sidebar_width
            }
        }
        @keyframes menu_hide_slideout {
            0% {
                left: $hide_sidebar_width
            }
            to {
                left: 0
            }
        }
        @keyframes menu_hide_slidein {
            0% {
                left: 0
            }
            to {
                left: $hide_sidebar_width
            }
        }
    }
</style>