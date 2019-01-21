<template>
    <div>
        <textarea ref="editor4" rows="10" cols="80" style="display: none;"></textarea>
    </div>
</template>

<script>
    
    export default {
        name: 'EmCkeditor4',
        data() {
            return {
                editor: null,
                isMounted: false
            }
        },
        watch: {
            value(newVal) {
                if(this.editor.getData() !== newVal) {
                    this.editor.setData(newVal);
                }
            },
            disabled(newVal) {
                this.editor.setReadOnly(newVal);
            }
        },
        props: {
            value: {
                type: String,
                default: ''
            },
            tagName: {
                type: String,
                default: 'div'
            },
            disabled: {
                type: Boolean,
                default: false
            },

            height: {
                type: String,
                default: '300px'
            },
            width: {
                type: String,
                default: '100%'
            },
            uploadUrl: {
                type: String,
                default: ''
            },
            lang: {
                type: String,
                default: 'zh-cn'
            }
        },
        methods: {
            // 初始化
            init() {
                // config.filebrowserUploadUrl = '/ckeditorUpload?type=File';
                // config.filebrowserImageUploadUrl = "/ckeditorUpload?type=image";
                // config.filebrowserFlashUploadUrl = '/ckeditorUpload?type=Flash';
    
                // window.parent.CKEDITOR.tools.callFunction(CKEditorFuncNum, fileUrl, message);
                // this.editor = window.CKEDITOR.replace(this.name, {
                this.editor = window.CKEDITOR.replace(this.$refs.editor4, {
                    title: '　',
                    language: this.lang,
                    height: this.height,
                    width: this.width,
                    filebrowserUploadMethod: 'form',
                    filebrowserImageUploadUrl: this.uploadUrl,
                    image_previewText: '&nbsp;', // 清空上传预览去内容
                    resize_enabled: false
                    // skin: 'atlas',
                    // skin: 'bootstrapck',
                    // skin: 'flat',
                    // skin: 'icy_orange',
                    // skin: 'kama',
                    // skin: 'minimalist',
                    // skin: 'moono-dark',
                    // skin: 'moono-lisa',
                    // skin: 'office2013',
                    // skin: 'prestige',
                    // extraPlugins: 'divarea'
                });
                // 把editor的实例赋值到data里
                this.editor.on('instanceReady', () => {
                    this.editor.setData(this.value);
                    this.editor.setReadOnly(this.disabled);
                    this.$_setUpEditorEvents();
                    this.$emit('ready', this.editor);
                    // console.log('this.editor==========')
                    // console.log(this.editor)
                })
            },
            // 监听change、focus、blur事件
            $_setUpEditorEvents() {
                const editor = this.editor;
                editor.on('change', e => {
                    const value = editor.getData();
                    this.$emit('input', value, e, editor);
                })
                editor.on('focus', e => {
                    this.$emit('focus', e, editor);
                })
                editor.on('blur', e => {
                    this.$emit('blur', e, editor);
                })
            },
            // 销毁
            $_destroy() {
                let name = this.editor.name;
                if(window.CKEDITOR.instances[name]) {
                    window.CKEDITOR.remove(window.CKEDITOR.instances[name]);
                }
                let ckeditor = window.document.querySelector('#cke_' + name);
                if(ckeditor != null) {
                    ckeditor.parentNode.removeChild(ckeditor);
                }
                this.editor = null;
            }
        },
        beforeDestroy() {
            this.editor && this.$_destroy();
            this.$emit('destroy', this.editor);
        },
        activated() {
            // console.log('activated===========')
            // console.log(this.editor)
            if(this.editor == null && !this.isMounted) {
                this.init();
            }
        },
        deactivated() {
            this.isMounted = false;
            if(this.editor != null) {
                this.$_destroy();
            }
        },
        mounted() {
            this.isMounted = true;
            // 调整CKEditor的basePath
            window.CKEDITOR_BASEPATH = '/static/lib/ckeditor-4.11.1/';
            // 获取html中所有script标签
            let arrScript = document.querySelectorAll('script');
            // 生成script对应的src值
            let arrSrc = [];
            Array.from(arrScript).forEach(item => {
                arrSrc.push(item.src)
            })
            // 判断ckeditor.js是否加载
            let is = arrSrc.some(v => { return v.indexOf('/ckeditor-4.11.1/ckeditor.js') > -1 });
            // 是否插入ckeditor.js
            let script = null;
            if(!is) {
                script = document.createElement('script');
                script.src = '/static/lib/ckeditor-4.11.1/ckeditor.js';
                document.body.append(script);
            }
            // 判断初始化加载
            if(script != null) {
                script.onload = () => {
                    this.init();
                }
            }else {
                this.init();
            }
        }
    }
</script>

<style lang="scss">
    .cke.cke_reset{
        box-sizing: border-box;
    }
</style>

// function loadScript(url,callback){
// 　　var script=document.createElement('script');
// 　　　　script.type='text/javascript';
// 　　　　script.async='async';
// 　　　　script.src=url;
// 　　　　document.body.appendChild(script);
// 　　　　if(script.readyState){   //IE
// 　　　　　　script.onreadystatechange=function(){
// 　　　　　　　　if(script.readyState=='complete'||script.readyState=='loaded'){
// 　　　　　　　　　　script.onreadystatechange=null;
// 　　　　　　　　　　callback();
// 　　　　　　　　}
// 　　　　　　}
// 　　　　}else{    //非IE
// 　　　　　　script.onload=function(){callback();}
// 　　　　}
// }