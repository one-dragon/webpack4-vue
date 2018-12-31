<template>
    <div data-ajax-example-box>
        <h2 class="com_demo_example">ajax</h2>
        <p class="com_demo_example">提供了全局ajax的调用方式</p>
        <h3 class="com_demo_example">使用方法</h3>
        <p class="com_demo_example">在vue中直接使用this.调用，不需要单独引用</p>
        
        <h3 class="com_demo_example">get请求方式</h3>
        <!--demo实例-->
        <example-demo>
            <template slot="top">
                this.$get()或this.$v.get()调用方式
            </template>
            <template slot="des">
                <p><code>this.$get(url, data, successCb, failCb, dataParams)</code>其中<code>data</code><code>failCb</code><code>dataParams</code>选填</p>
            </template>
            <template slot="body">
                <span style="margin: -10px; line-height: 1.6;">
                    &lt;script&gt;
                        export default {
                            mounted() {
                                <span class="keyword">this.$get(url, data, (successRes) => {}, (failRes, cb) => {}, dataParams);</span>
                                //或者
                                <span class="keyword">this.$v.get(url, data, (successRes) => {}, (failRes, cb) => {}, dataParams);</span>
                            }
                        }
                    &lt;/script&gt;
                </span>
            </template>
        </example-demo>
        
        <h3 class="com_demo_example">post请求方式</h3>
        <!--demo实例-->
        <example-demo>
            <template slot="top">
                this.$post()或this.$v.post()调用方式
            </template>
            <template slot="des">
                <p><code>this.$post(url, data, successCb, failCb, dataParams)</code>其中<code>data</code><code>failCb</code><code>dataParams</code>选填</p>
            </template>
            <template slot="body">
                <span style="margin: -10px; line-height: 1.6;">
                    &lt;script&gt;
                        export default {
                            mounted() {
                                <span class="keyword">this.$post(url, data, (successRes) => {}, (failRes, cb) => {}, dataParams);</span>
                                //或者
                                <span class="keyword">this.$v.post(url, data, (successRes) => {}, (failRes, cb) => {}, dataParams);</span>
                            }
                        }
                    &lt;/script&gt;
                </span>
            </template>
        </example-demo>
        
        <h3 class="com_demo_example">axios原生调用</h3>
        <!--demo实例-->
        <example-demo>
            <template slot="top">
                this.$axios()<br />在调用原生的axios不会判断返回接口的成功、失败，需要自己判断，传参方式，请按照axios官方文档传参
            </template>
            <template slot="des">
                <p>
                    在调用原生的<code>axios</code>不会判断返回接口的成功、失败，需要自己判断，传参方式，请按照axios官方文档传参<br />
                    地址：<a target="_blank" href="https://www.kancloud.cn/yunye/axios/234845">https://www.kancloud.cn/yunye/axios/234845</a>
                </p>
            </template>
            <template slot="body">
                <span style="margin: -10px; line-height: 1.6;">
                    &lt;script&gt;
                        export default {
                            mounted() {
                                <span class="keyword">this.$axios();</span>
                            }
                        }
                    &lt;/script&gt;
                </span>
            </template>
        </example-demo>
        
        <h3 class="com_demo_example">get、post中的参数说明</h3>
        <table class="com_demo_example">
            <thead>
                <tr>
                    <th>参数</th>
                    <th>说明</th>
                    <th>类型</th>
                    <th>可选值</th>
                    <th>默认值</th>
                    <th>是否必传</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>url</td>
                    <td>调用接口地址</td>
                    <td>string</td>
                    <td>—</td>
                    <td>—</td>
                    <td>是</td>
                </tr>
                <tr>
                    <td>data</td>
                    <td>请求传入报文</td>
                    <td>object</td>
                    <td>—</td>
                    <td>—</td>
                    <td>否</td>
                </tr>
                <tr>
                    <td>success</td>
                    <td>接口响应报文判断成功时，回调该函数。<br />res为报文响应数据</td>
                    <td>function(res)</td>
                    <td>—</td>
                    <td>—</td>
                    <td>是</td>
                </tr>
                <tr>
                    <td>fail</td>
                    <td>
                                           接口响应报文判断失败，或者接口响应码为400~600之间，回调该函数。<br />
                        res为报文响应数据，error为响应码400~600之间，获取响应码：error.response.status，cb为回调提示错误框显示函数，调用：cb().then(() => {})。<br />
                        true：控制台输出错误原因，false：无操作
                    </td>
                    <td>function(res/error, cb) / boolean</td>
                    <td>—</td>
                    <td>false</td>
                    <td>否</td>
                </tr>
                <tr>
                    <td>dataParams</td>
                    <td>
                                           设置是否加载loading，是否显示成功提示框、失败提示框。<br />
                        isLoading：true显示加载， false不加载， string加载并有加载文字。<br />
                        isSuccessPrompt：true显示成功提示框，false不显示，{title: string, message: string, moreMessage: sting}显示提示框并显示对应提示文字。<br />
                        isFailPrompt：和isSuccessPrompt一样。
                    </td>
                    <td>object</td>
                    <td>—</td>
                    <td>{ isLoading: true, isSuccessPrompt: false, isFailPrompt: true }</td>
                    <td>否</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import ExampleDemo from '~/components/common/ExampleDemo';
    export default {
        name: 'ajax-example',
        data() {
            return {}
        },
        components: {
            ExampleDemo
        }
    }
</script>

<style>
</style>