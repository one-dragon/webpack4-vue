<template>
    <div>
        <h2 class="com_demo_example">ckeditor4</h2>
        <p class="com_demo_example">提供了ckeditor4组件调用</p>
        <h3 class="com_demo_example">使用方法</h3>
        <p class="com_demo_example">
            import { ckeditor4 } from 'embed-ui';<br />
            Vue.use(ckeditor4);<br />
            &lt;em-ckeditor4 v-model="vaule" &gt;&lt;/em-ckeditor4&gt;
        </p>

        <h3 class="com_demo_example">实例</h3>
        <!--demo实例-->
        <example-demo>
            <template slot="top">
                <em-ckeditor4 v-model="value"></em-ckeditor4>
            </template>
            <template slot="des">
                <p><code>&lt;em-ckeditor4 v-model="value" &gt;&lt;/em-ckeditor4&gt;</code>其中<code>value</code>为富文本中的内容</p>
            </template>
            <template slot="body">
                <span style="margin: -10px; line-height: 1.6;">
                    &lt;em-ckeditor4 v-model="vaule" &gt;&lt;/em-ckeditor4&gt;
                </span>
            </template>
        </example-demo>


        <h3 class="com_demo_example">参数说明</h3>
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
                    <td>v-model</td>
                    <td>绑定富文本的内容</td>
                    <td>string</td>
                    <td>—</td>
                    <td>—</td>
                    <td>是</td>
                </tr>
                <tr>
                    <td>disabled</td>
                    <td>是否禁用富文本</td>
                    <td>boolean</td>
                    <td>true/false</td>
                    <td>false</td>
                    <td>否</td>
                </tr>
                <tr>
                    <td>height</td>
                    <td>设置富文本高度</td>
                    <td>string</td>
                    <td>—</td>
                    <td>300px</td>
                    <td>否</td>
                </tr>
                <tr>
                    <td>width</td>
                    <td>设置富文本宽度</td>
                    <td>string</td>
                    <td>—</td>
                    <td>100%</td>
                    <td>否</td>
                </tr>
                <tr>
                    <td>uploadUrl</td>
                    <td>
                        上传图片路径<br /><br />
                        后端接受两个参数：<br />
                        1.CKEditorFuncNum为callback的回调<br />
                        2.upload为上传的文件流<br /><br />
                        后端响应报文：(message可以不传)<br />
                        &lt;script&gt;
                            window.parent.CKEDITOR.tools.callFunction(callback, url, message?)
                        &lt;/script&gt;
                    </td>
                    <td>string</td>
                    <td>—</td>
                    <td>—</td>
                    <td>否</td>
                </tr>
                <tr>
                    <td>lang</td>
                    <td>设置工具栏显示的语言</td>
                    <td>string</td>
                    <td>
                        zh-cn/zh/en/de/fr/it等<br />
                        具体可以查看src/static/lib/ckeditor-4.11.1/lang/路径下的语言包
                    </td>
                    <td>zh-cn</td>
                    <td>否</td>
                </tr>
            </tbody>
        </table>

        <h3 class="com_demo_example">事件说明</h3>
        <table class="com_demo_example">
            <thead>
                <tr>
                    <th>事件名称</th>
                    <th>说明</th>
                    <th>回调参数</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>ready</td>
                    <td>富文本加载完成后触发事件</td>
                    <td>
                        当前富文本实例<br />
                        ready(editor)
                    </td>
                </tr>
                <tr>
                    <td>focus</td>
                    <td>富文本获焦触发事件</td>
                    <td>
                        当前富文本的内容、事件event、实例<br />
                        focus(value, event, editor)
                    </td>
                </tr>
                <tr>
                    <td>blur</td>
                    <td>富文本失焦触发事件</td>
                    <td>
                        当前富文本的内容、事件event、实例<br />
                        blur(value, event, editor)
                    </td>
                </tr>
                <tr>
                    <td>destroy</td>
                    <td>富文本销毁后触发事件</td>
                    <td>
                        当前富文本实例，此时实例应该为null<br />
                        destroy(editor)
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { ckeditor4 } from 'embed-ui';
    Vue.use(ckeditor4);
    import ExampleDemo from '~/components/common/ExampleDemo';
    export default {
        name: 'ckeditor4-example',
        data() {
            return {
                value: 'ckeditor4'
            }
        },
        components: {
            ExampleDemo
        }
    }
</script>

