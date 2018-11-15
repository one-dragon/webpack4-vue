<template>
    <div data-pages-index-box>
        <div class="common_width">
            <el-row>
                <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <img src="../../../assets/img/logo.png" />
                </el-col>
                <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" :offset="2">
                    <h2 class="vue hidden-md-and-up">Vue.js</h2>
                    <h1>渐进式<br>JavaScript 框架</h1>
                    <div class="but_box">
                        <a href="https://cn.vuejs.org/" target="_blank">
                            <el-button type="success" round>WHY VUE.JS?</el-button>
                        </a>
                        <a href="https://cn.vuejs.org/v2/guide/" target="_blank">
                            <el-button type="success" round>起步</el-button>
                        </a>
                        <a href="https://github.com/vuejs/vue" target="_blank">
                            <el-button type="success" round>GITHUB</el-button>
                        </a>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            // ajax调用实例
            let data = {};
            data.host = 'sit.cuniq.com';
            data.region = '/hk';
            data.acceptPortal = 1;
            data.langId = 1;
            this.$get( '/cq-ocms/site/detailMobile', data, (d) => {
                console.log('d')
                console.log(d)
            }, { isSuccessPrompt: true })
        }
    }
</script>

<style lang="scss">
    @import '~/assets/css/theme_default';
    div[data-pages-index-box]{
        width: 100%;
        height: 100vh;
        display: table;
        .common_width{
            display: table-cell;
            vertical-align: middle;
        }
        img{
             will-change: transform;
            /*animation: name duration timing-function delay iteration-count direction;*/
            animation: rotate 1.5s ease .5s 1;
            float: right;
        }
        @keyframes rotate {
            from { transform: rotateY(0); }
            to { transform: rotateY(360deg)}
        }
        h1, h2{
            font-weight: 300;
            font-size: 50px;
        }
        h1{
            margin-top: 10px;
        }
        .but_box > a:nth-child(2){
            margin: 0 10px;
        }
        .el-button{
            margin-top: 15px;
            transition: all 0.15s ease;
            span{
                color: #fff;
                font-size: 16px;
            }
        }
        .el-button--success{
            background-color: #4fc08d;
            border-color: #4fc08d;
        }
        @include media-sm-and-down{
            .el-col-offset-2{
                margin-left: 0;
            }
            img{
                display: block;
                width: 140px;
                margin: 0 auto;
                float: none;
            }
            h1, h2, .but_box{
                text-align: center;
                font-size: 30px;
            }
            .el-button span{
                font-size: 14px;
            }
        }
    }
</style>