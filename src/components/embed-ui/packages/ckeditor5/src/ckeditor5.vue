
<script>
    /* eslint-disable no-restricted-imports, no-restricted-modules */

    import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

    // 插件引入
    import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
    import Enter from '@ckeditor/ckeditor5-enter/src/enter';
    import Typing from '@ckeditor/ckeditor5-typing/src/typing';
    import Clipboard from '@ckeditor/ckeditor5-clipboard/src/clipboard';
    import Undo from '@ckeditor/ckeditor5-undo/src/undo';

    import Heading from '@ckeditor/ckeditor5-heading/src/heading';

    import Font from '@ckeditor/ckeditor5-font/src/font';
    import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily';

    import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
    import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
    import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
    import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
    import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
    import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
    import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';

    import List from '@ckeditor/ckeditor5-list/src/list';
    import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
    import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';

    import Table from '@ckeditor/ckeditor5-table/src/table';
    import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';

    import Link from '@ckeditor/ckeditor5-link/src/link';
    import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';

    import Image from '@ckeditor/ckeditor5-image/src/image';
    import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
    import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
    import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
    import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
    import CKFinderUploadAdapter from './uploadadapter';


    const config = {
        // removePlugins: [ 'ImageUpload', 'EasyImage' ],
        language: '',
        plugins: [
            Paragraph, Enter, Typing, Clipboard, Undo,
            Heading,
            Font, FontFamily,
            Bold, Italic, Underline, Strikethrough, Code, Subscript, Superscript,
            List, Alignment, BlockQuote,
            Table, TableToolbar,
            Link, MediaEmbed,
            Image, ImageCaption, ImageToolbar, ImageStyle, ImageUpload, CKFinderUploadAdapter
        ],
        toolbar: [
            'heading',
            '|',
            'fontSize', 'fontFamily',
            '|',
            'bold', 'italic', 'underline', 'strikethrough', 'code', /* 'subscript', 'superscript', */
            '|',
            'bulletedList', 'numberedList', 'alignment', 'blockQuote',
            '|',
            'insertTable',
            '|',
            'link', 'mediaEmbed',
            'imageUpload',
            '|',
            'undo',
            'redo'
        ],
        ckfinder: {
            // eslint-disable-next-line max-len
            uploadUrl: ''
            // uploadUrl: 'https://cksource.com/weuy2g4ryt278ywiue/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json'
        },
        image: {
            // You need to configure the image toolbar, too, so it uses the new style buttons.
            toolbar: [ 'imageTextAlternative', '|', 'imageStyle:full', 'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight' ],
            styles: [
                // This option is equal to a situation where no style is applied.
                'full',
                // This represents an image aligned to the left.
                'alignLeft',
                // This represents an image aligned to the center.
                'alignCenter',
                // This represents an image aligned to the right.
                'alignRight'
            ]
        },
        table: {
            contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
        }
    }
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
            // 判断多语言包是否在window下为空对象{}
            if(JSON.stringify(window.CKEDITOR_TRANSLATIONS) == '{}' && window.parent.CKEDITOR_TRANSLATIONS) {
                window.CKEDITOR_TRANSLATIONS = window.parent.CKEDITOR_TRANSLATIONS
            }
            // 初始化ckeditor
            // 上传图片返回格式 { uploaded: true, url: '' }
            config.ckfinder.uploadUrl = this.uploadUrl;
            config.language = this.lang;
            ClassicEditor.create(this.$el, config).then(editor => {
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