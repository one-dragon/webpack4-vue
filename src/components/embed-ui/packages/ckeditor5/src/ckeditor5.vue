
<script>
    /* eslint-disable no-restricted-imports, no-restricted-modules */
    
    const request = require.context('~/static/lib/ckeditor-5/translations', false, /\.js$/);
    request.keys().forEach(request);
    export default {
        name: 'EmCkeditor5',
        render(h) {
            return h(this.tagName);
        },
        data() {
            return {
                editor: null // 编辑器实例
            }
        },
        props: {
            // editor: {
            //     type: Function,
            //     default: null
            // },
            // config: {
            //     type: Object,
            //     default() {
            //         return {}
            //     }
            // },
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
        watch: {
            value(newVal) {
                if(this.editor.getData() !== newVal) {
                    this.editor.setData(newVal)
                }
            },
            disabled(newVal) {
                this.editor.isReadOnly = newVal;
            }
        },
        methods: {
            // 初始化ckeditor
            init() {
                // 上传图片返回格式 { uploaded: true, url: '' }
                let config = {
                    ckfinder: {}
                };
                config.ckfinder.uploadUrl = this.uploadUrl;
                config.language = this.lang;
                window.ClassicEditor.create(this.$el, config).then(editor => {
                    // 获取editor的dom节点，并设置宽高
                    let editorDom = this.$el.nextElementSibling;
                    if(editorDom != null) {
                        editorDom.setAttribute('data-ckeditor5-box', '');
                        editorDom.style.width = this.width; // 设置ckeditor的宽度
                        let editorInput = editorDom.querySelector('.ck-editor__editable');
                        if(editorInput != null) {
                            editorInput.style.height = this.height;
                        }
                    }
                    // 把editor的实例赋值到data里
                    this.editor = editor;
                    this.editor.setData(this.value);
                    this.editor.isReadOnly = this.disabled;
                    this.$_setUpEditorEvents()
                    this.$emit('ready', editor);
                }).catch (err => {
                    console.error(err);
                })
            },
            $_setUpEditorEvents() {
                const editor = this.editor;
                editor.model.document.on('change:data', e => {
                    const value = editor.getData();
                    this.$emit('input', value, e, editor);
                });
                editor.editing.view.document.on('focus', e => {
                    this.$emit('focus', e, editor);
                });
                editor.editing.view.document.on('blur', e => {
                    this.$emit('blur', e, editor);
                });
            }
        },
        beforeDestroy() {
            this.editor && (this.editor.destroy(), this.editor = null);
            this.$emit('destroy', this.editor)
        },
        mounted() {
            // 获取html中所有script标签
            let arrScript = document.querySelectorAll('script');
            // 生成script对应的src值
            let arrSrc = [];
            Array.from(arrScript).forEach(item => {
                arrSrc.push(item.src)
            })
            // 判断ckeditor.js是否加载
            let is = arrSrc.some(v => { return v.indexOf('/ckeditor-5/ckeditor.js') > -1 });
            // 是否插入ckeditor.js
            let script = null;
            if(!is) {
                script = document.createElement('script');
                script.src = '/static/lib/ckeditor-5/ckeditor.js';
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
    .ck-editor[data-ckeditor5-box]{
        .ck-content{
            padding: 1em;
            &:not(.ck-editor__nested-editable).ck-focused{
                outline:none;
                border: 1px solid #47a4f5;
                box-shadow: var(--ck-inner-shadow), 0 0;
            }
            h2 {
                height: auto;
                font-size: 1.68em;
                line-height: 1.68em;
                padding-top: 0.8em;
                margin: 0;
                margin-bottom: 0.4em;
                padding-bottom: .2em;
                border-bottom: 1px solid #e9e9e9;
                font-weight: 400;
            }
            h3 {
                height: auto;
                font-size: 1.36em;
                line-height: 1.5em;
                padding-top: 0.8em;
                margin-bottom: 0.2em;
                font-weight: 400;
            }
            h4 {
                height: auto;
                font-size: 1.2em;
                line-height: 1.4em;
                padding-top: 0.8em;
                margin-bottom: 0.2em;
                margin-bottom: 0.2em;
                padding-top: 0.8em;
                font-weight: 400;
            }
            p, ul, ol, blockquote, pre {
                font-size: 1em;
                line-height: 1.6em;
                padding-top: 0.2em;
                margin: 0;
                margin-bottom: 0.8em;
            }
            strong, b {
                font-weight: 600;
            }
            i, em {
                font-style: italic;
            }
            blockquote {
                overflow: hidden;
                padding-right: 1.5em;
                padding-left: 1.5em;
                margin-left: 0;
                font-style: italic;
                border-left: 5px solid #ccc;
            }
            ul, ol {
                list-style-type: circle;
                list-style: circle;
                margin: 0;
                margin-left: 2.666em;
                margin-bottom: 0.8em;
                li{
                    list-style: circle;
                }
            }
            ul li:last-of-type, ol li:last-of-type {
                margin-bottom: 0;
            }
            ol {
                list-style-type: decimal;
                li{
                    list-style: decimal;
                }
            }
        }
    }
</style>