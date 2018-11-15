/*
 * @Author: on-dragon 
 * @Date: 2018-11-14 10:55:40 
 * @Last Modified by: on-dragon
 * @Last Modified time: 2018-11-15 19:39:40
 */
<template>
    <div data-right-bar-box>
        <ul class="menu">
            <li>
                <el-input
                    class="search_input"
                    placeholder="请输入搜索内容"
                    @blur="isOpenSearch(false)"
                    ref="searchInput">
                    <!-- <i slot="suffix" class="el-input__icon el-icon-search"></i> -->
                </el-input>
                <svg-icon @click.native="isOpenSearch(true)" class="search_icon" name="search" fill="#8898AC" width="16" height="16" />
                <svg-icon @click.native="isOpenSearch(false)" class="close_icon" name="close" fill="#8898AC" width="16" height="16" />
            </li>
            <li>
                <a href="#">
                    <svg-icon name="lock" fill="#8898AC" width="16" height="16" />
                </a>
            </li>
            <li class="no_border">
                <el-dropdown trigger="click" placement="bottom">
                    <span class="el-dropdown-link">
                        <svg-icon name="user" fill="#8898AC" width="16" height="16" />
                        <em>H8486560</em>
                        <svg-icon name="triangle-down" fill="#8898AC" width="8" height="8" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                        <el-dropdown-item>狮子头</el-dropdown-item>
                        <el-dropdown-item>螺蛳粉</el-dropdown-item>
                        <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                        <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
            <li class="no_border no_padding">
                <el-dropdown trigger="click" placement="bottom">
                    <span class="el-dropdown-link">
                        <svg-icon name="others" fill="#8898AC" width="14" height="14" />
                    </span>
                    <el-dropdown-menu slot="dropdown" class="right_bar_others_dropdown">
                        <el-dropdown-item>
                            <a href="https://cn.vuejs.org/" target="_blank">Vue</a>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <a href="http://element-cn.eleme.io/#/zh-CN" target="_blank">Element</a>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'rightBar',
        data() {
            return {}
        },
        methods: {
            isOpenSearch(boolean) {
                if(boolean) {
                    document.querySelector('.default_layout_header').classList.add('search_mode');
                    this.$refs.searchInput.focus();
                }else {
                    // document.querySelector('.tags_view').classList.remove('clear_fix')
                    document.querySelector('.default_layout_header').classList.remove('search_mode');
                }
            }
        },
        mounted() {}
    }
</script>

<style lang="scss">
    div[data-right-bar-box]{
        ul{
            height: 100%;
            display: flex;
            align-items: center;
            margin-top: -4px;
            li{
                height: 16px;
                line-height: 1;
                padding: 0 15px;
                border-right: 1px #DBE4F0 solid;
                .el-dropdown{
                    cursor: default;
                    .el-dropdown-link.el-dropdown-selfdefine em{
                        vertical-align: middle;
                        margin: 0 5px;
                        color: #454D58;
                    }
                }
            }
            li.no_border{
                border: none;
            }
            li.no_padding{
                padding: 0;
            }
        }
        .close_icon{
            display: none;
        }
        // 搜索框样式
        .search_input{
            width: 0;
            // width: 220px;
            overflow: hidden;
            transition: all 250ms;
            margin-top: -8px;
            vertical-align: top;
            input{
                font-size: 12px;
            }
            .el-input__inner{
                height: 32px;
                line-height: 32px;
                border: none;
                font-size: 12px;
                // color: rgba(136,152,172,0.60);
                color: #454D58;
                box-shadow: 0 4px 15px 0 rgba(198,216,229,0.20);
                // border-radius: 4px;
                border-bottom: 1px solid #8898ac;
                background-color: transparent;
                border-radius: 0;
            }
            .el-input__icon.el-icon-search{
                font-size: 12px;
                color:rgba(136,152,172,1);
            }
        }
    }
</style>
<style lang="scss">
    header.search_mode{
        .search_icon{
            display: none;
        }
        .close_icon{
            display: inline-block;
        }
        .search_input{
            width: 300px;
        }
    }
    .right_bar_others_dropdown{
        a{
            font-size: 12px;
            color: #8898AC;
        }
    }
</style>

