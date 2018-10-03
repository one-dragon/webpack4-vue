<template>
    <div data-svg-icons-box>
        <h2 class="com_demo_example">Icon svg图标</h2>
        <p class="com_demo_example">提供了一套常用的图标集合。</p>
        <h3 class="com_demo_example">使用方法</h3>
        <p class="com_demo_example">直接在页面中使用该组件即可， 不用进行引入注册。</p>
        
        <!--demo实例-->
        <example-demo>
            <template slot="top">
                <svg-icon :name="icons[0]" fill="#606266" width="24" height="24" />
                <svg-icon :name="icons[1]" fill="#606266" width="24" height="24" />
            </template>
            <template slot="body">
                <span>&lt;svg-icon name="{{icons[0]}}" fill="#606266" width="24" height="24" /&gt;</span>
                <span>&lt;svg-icon name="{{icons[1]}}" fill="#606266" width="24" height="24" /&gt;</span>
            </template>
        </example-demo>
        
        <!--demo集合-->
        <h3 class="com_demo_example">图标集合</h3>
        <ul class="icon_list">
            <li v-for="(icon,index) in icons" :key="index">
                <span>
                    <svg-icon :name="icon" fill="#606266" width="32" height="32" />
                    <span class="icon_name">{{ icon }}</span>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
    import ExampleDemo from '~/components/common/ExampleDemo';
    const request = require.context('~/assets/icons_svg', false, /\.svg$/);
    let icons = request.keys().map((item) => {
        return item.split('.svg')[0].split('./')[1];
    })
    export default {
        name: 'svg_icon',
        data() {
            return {
                icons: icons
            }
        },
        components: {
            ExampleDemo
        }
    }
</script>

<style lang="scss">
    div[data-svg-icons-box]{
        /*demo实例样式*/
        .source{
            svg{
                margin-right: 20px;
            }
        }
        
        /*demo集合样式*/
        ul.icon_list {
            background-color: #fff;
            overflow: hidden;
            list-style: none;
            padding: 0;
            border: 1px solid #eaeefb;
            border-radius: 4px;
            li {
                float: left;
                width: 16.66%;
                text-align: center;
                height: 120px;
                line-height: 120px;
                color: #666;
                font-size: 13px;
                transition: color .15s linear;
                border-right: 1px solid #eee;
                border-bottom: 1px solid #eee;
                margin-right: -1px;
                margin-bottom: -1px;
                > span{
                    display: inline-block;
                    line-height: normal;
                    vertical-align: middle;
                    svg{
                        margin-bottom: 15px;
                    }
                    .icon_name {
                        display: block;
                        padding: 0 3px;
                        color: #606266;
                    }
                }
            }
        }
    }
</style>