<template>
    <section data-login-box>
        <!--登录大框-->
        <div class="login_box">
            <div class="login_layout clear_fix">
                <!--左侧图-->
                <div class="content_l">
                    <img src="../../assets/img/login/login_logo.png" />
                </div>
                <!--右侧登录框-->
                <div class="content_r">
                    <h1>Hi！欢迎登录</h1>
                    <el-form  :model="fromData">
                        <el-form-item label="账号">
                            <el-input v-model="fromData.name"></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="fromData.password"></el-input>
                        </el-form-item>
                        <el-form-item label="验证码" class="code_box">
                            <el-input v-model="fromData.code"></el-input>
                            <img />
                        </el-form-item>
                        <el-form-item>
                            <el-button class="submit_btn" @click="submit">登 录</el-button>
                        </el-form-item>
                    </el-form>
                    <a href="#" class="forget_password">忘记密码</a>
                </div>
            </div>
        </div>
        <!--登录底部背景图-->
        <div class="login_bg"></div>
    </section>
</template>

<script>
    import Vue from 'vue';
    import { Form, FormItem, Input, Button } from 'element-ui';
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Input);
    Vue.use(Button);
    export default {
        data() {
            return {
                fromData: {
                    name: '',
                    password: '',
                    code: ''
                }
            }
        },
        methods: {
            // 提交表单
            submit() {
                sessionStorage.setItem('token', '123456789');
                location.href = 'index.html';
            }
        }
    }
</script>

<style lang="scss">
    section[data-login-box] {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        min-height: 100vh;
        background: linear-gradient(185deg,rgba(66,166,247,1) 0%,rgba(31,125,242,1) 100%);
        .login_box{
            position: relative;
            width: 688px;
            height: 480px;
            z-index: 1;
            /*&:after{
                content: '';
                position: absolute;
                left: 0;
                bottom: -85px;
                width: 688px;
                height: 142px;
                background-image: url(../../assets/img/login/login_box_bg.png);
            }*/
            .login_layout{
                height: 100%;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0px 8px 20px 0px rgba(1,82,189,0.3);
            }
            .content_l, 
            .content_r{
                position: relative;
                z-index: 1;
                height: 100%;
                float: left;
            }
            .content_l{
                width: 328px;
                padding-top: 72px;
                text-align: center;
                box-sizing: border-box;
                background-image: url(../../assets/img/login/login_content_l.png);
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }
            .content_r{
                width: 360px;
                padding: 56px 48px;
                padding-bottom: 0;
                background-color: #fff;
                text-align: center;
                box-sizing: border-box;
                h1{
                    margin-bottom: 24px;
                    font-size: 16px;
                    line-height: 24px;
                    font-weight: 600;
                    color: #454D58;
                    text-align: left;
                }
            }
            .el-form{
                .el-form-item__label{
                    font-size: 12px;
                    line-height: 32px;
                    font-weight: 500;
                    color: #8898AC;
                }
                .el-form-item__content{
                    line-height: 32px;
                }
                .el-input input{
                    height: 32px;
                    border: 1px #E7EDF5 solid;
                    line-height: 32px;
                }
                .code_box{
                    .el-form-item__content{
                        display: flex;
                        width: 100%;
                        img{
                            width: 80px;
                            height: 32px;
                            margin-left: 8px;
                        }
                    }
                }
                .submit_btn{
                    width: 100%;
                    height: 32px;
                    padding: 0;
                    margin-top: 8px;
                    background: #1875F0;
                    border-radius: 4px;
                    span{
                        font-size: 13px;
                        font-weight: 600;
                        color: #fff;
                    }
                }
            }
        }
        .forget_password{
            display: inline-block;
            font-size: 12px;
            line-height: 24px;
            text-align: center;
            color: #8898AC;
        }
        .login_bg{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 130px;
            background-image: url(../../assets/img/login/login_bg.png);
            z-index: 0;
        }
    }
</style>