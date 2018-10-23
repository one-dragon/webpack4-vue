<template>
    <div class="demo_block" data-example-demo-box>
        <div class="source">
            <!--content-top-->
            <slot name="top"></slot>
        </div>
        <div class="meta">
            <el-collapse-transition>
                <div v-show="show">
                    <div class="description">
                        <slot name="des"></slot>
                    </div>
                    <div class="highlight">
                        <pre>
                            <code>
                                <!--content-->
                                <slot name="body"></slot>
                            </code>
                        </pre>
                    </div>
                    
                </div>
            </el-collapse-transition>
        </div>
        <div class="demo_block_control" @click="show = !show">
            <i class="el-icon-caret-bottom" v-if="!show"></i>
            <span v-if="!show">显示代码</span>
            <i class="el-icon-caret-top" v-if="show"></i>
            <span v-if="show">隐藏代码</span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show: false
            }
        }
    }
</script>

<style lang="scss">
    h2.com_demo_example{
        font-weight: 400;
        color: #1f2f3d;
        font-size: 28px;
        margin: 0;
    }
    h3.com_demo_example{
        margin: 55px 0 20px;
        font-size: 22px;
        font-weight: 400;
        color: #1f2f3d;
    }
    p.com_demo_example{
        height: auto;
        margin: 14px 0;
        font-size: 14px;
        color: #5e6d82;
        line-height: 1.5em;
    }
    table.com_demo_example{
        border-collapse: collapse;
        width: 100%;
        background-color: #fff;
        font-size: 14px;
        margin-bottom: 45px;
        line-height: 1.5em;
        code {
            background-color: #f9fafc;
            padding: 0 4px;
            border: 1px solid #eaeefb;
            border-radius: 4px;
        }
        th{
            text-align: left;
            white-space: nowrap;
            color: #666;
            border-bottom: 1px solid #d8d8d8;
            padding: 15px;
            max-width: 250px;
        }
        td{
            color: #333;
            border-bottom: 1px solid #d8d8d8;
            padding: 15px;
            max-width: 250px;
        }
        tbody tr:last-child td{
            border-bottom: none;
        }
    }
</style>
<style lang="scss">
    div[data-example-demo-box]{
        /*demo实例样式*/
        &.demo_block{
            background-color: #fff;
            border: 1px solid #ebebeb;
            border-radius: 3px;
            .source{
                padding: 24px;
                color: #333;
            }
            .meta {
                background-color: #fafafa;
                border-top: 1px solid #eaeefb;
                /*overflow: hidden;
                height: 0;*/
                transition: height .2s;
                .description {
                    padding: 20px;
                    box-sizing: border-box;
                    border: 1px solid #ebebeb;
                    border-radius: 3px;
                    line-height: 22px;
                    color: #666;
                    word-break: break-word;
                    margin: 10px;
                    background-color: #fff;
                    p{
                        height: auto;
                    }
                    code {
                        color: #5e6d82;
                        background-color: #e6effb;
                        margin: 0 4px;
                        display: inline-block;
                        padding: 1px 5px;
                        font-size: 12px;
                        border-radius: 3px;
                        height: 18px;
                        line-height: 18px;
                    }
                    a{
                        color: #3182bd;
                    }
                }
                .highlight{
                    pre{
                        display: table;
                        width: 100%;
                    }
                    code{
                        display: flex;
                        flex-direction: column;
                        overflow-x: auto;
                        line-height: 1.8;
                        font-size: 12px;
                        padding: 18px 24px;
                        background-color: #fafafa;
                        -webkit-font-smoothing: auto;
                        color: #3182bd;
                        span{
                            color: #3182bd;
                            font-size: 12px;
                        }
                    }
                    span.keyword{
                        color: cornflowerblue;
                    }
                }
            }
            .demo_block_control{
                border-top: 1px solid #eaeefb;
                height: 44px;
                box-sizing: border-box;
                background-color: #fff;
                border-bottom-left-radius: 4px;
                border-bottom-right-radius: 4px;
                text-align: center;
                margin-top: -1px;
                // color: #d3dce6;
                color: #67bce5;
                cursor: pointer;
                position: relative;
                &:hover {
                    background-color: #f9fafc;
                }
                i{
                    font-size: 16px;
                    line-height: 44px;
                    transition: .3s;
                    color: #409eff;
                }
                span{
                    transform: translateX(-30px);
                    line-height: 44px;
                    transition: .3s;
                    color: #409eff;
                }
            }
        }
    }
</style>