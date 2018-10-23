<template>
    <div class="tags_view clear_fix" data-common-tags-view-box>
        <draggable v-model="dragTagsData" class="drag_box clear_fix" ref="tagsDragBox">
            <el-tag
                :title="tag.meta.title"
                v-for="tag in tagsData"
                :key="tag.path"
                :class="isActive(tag) ? 'active' : ''"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
                <router-link :to="tag.path">{{ tag.meta.title }}</router-link>
            </el-tag>
        </draggable>
        <!--<el-tag
            class="active"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            <a href="#/aa">首页</a>
        </el-tag>-->
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import draggable from 'vuedraggable';
    
    export default {
        name: 'tagsview',
        watch: {
            $route() {
                this.addViewTags();
                this.changeTagsWidth();
            }
        },
        computed: {
            ...mapState({
                tagsData: state => state.tagsView.data
            }),
            // 拖拽时改变数据结构
            dragTagsData: {
                get() {
                    return this.$store.state.tagsView.data;
                },
                set(value) {
                    this.$store.commit('tagsView/CHANGE_DATA', value);
                }
            }
        },
        methods: {
            // 获取当前路由信息
            generateRoute() {
                if (this.$route.name) {
                    return this.$route;
                }
                return false;
            },
            // 往vuex里贯入数据
            addViewTags() {
                const route = this.generateRoute();
                if (!route) {
                    return false;
                }
                this.$store.dispatch('tagsView/addData', route).then(() => {
                    // console.log('this.$store.state.tagsView.data');
                    // console.log(this.$store.state.tagsView.data);
                });
            },
            // 判断是否选中当前tag
            isActive(route) {
                return route.path === this.$route.path;
            },
            // 关闭tab操
            handleClose(route) {
                // 清除当前路由对应的vuex数据
                if(route.meta && route.meta.storeName) {
                    if(this.$store._mutations[`${route.meta.storeName}/CLEAR_DATA`]) {
                        this.$store.commit(`${route.meta.storeName}/CLEAR_DATA`);
                    }
                }
                // 删除vuex中的tagsView数据中的当前路由
                this.$store.dispatch('tagsView/delData', route).then((list) => {
                    // 如果是关闭当前选中的tag时，判断跳转路由
                    if(this.isActive(route)) {
                        const latestRoute = list.slice(-1)[0];
                        if(latestRoute) {
                            this.$router.push(latestRoute);
                        }else {
                            this.$router.push('/');
                        }
                    }
                })
            },
            // 通过标签页外的宽度判断标签页的的宽度是否改变
            changeTagsWidth() {
                // 获取tags的父级box
                let box = this.$refs.tagsDragBox.$el;
                // 获取tags的父级box的宽度（18位滚动条宽度）
                let boxW = box.offsetWidth - 18;
                // 获取tags的宽度默认宽度
                let tagW = 130;
                // 判断当前父级box一行能放入几个tags数
                let tagNum = Math.floor(boxW / tagW);
                // 判断数量并添加class名
                if(this.tagsData.length > tagNum) {
                    box.className += ' average_tags';
                }else {
                    box.className = 'drag_box clear_fix';
                }
            }
        },
        components: {
            draggable
        },
        mounted() {
            this.addViewTags();
        }
    }
</script>

<style lang="scss">
    .tags_view[data-common-tags-view-box]{
        font-size: 0;
        margin-top: 16px;
        
        .average_tags{
            display: flex;
            .el-tag{
                width: auto;
                flex: 1;
            }
        }
        .el-tag{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 130px;
            height: 32px;
            padding: 0;
            float: left;
            background: rgba(231,237,245,1);
            border-radius: 4px 4px 0px 0px;
            border: 1px solid rgba(219,228,240,1);
            border-bottom: none;
            overflow: hidden;
            transition: width .3s;
            &.active{
                background: rgba(24,117,240,1);
                border: 1px solid rgba(24,117,240,1);
                > a{
                    color: #fff;
                }
            }
            > a{
                flex: 1;
                padding: 0 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 12px;
                color: rgba(136,152,172,1);
            }
            .el-tag__close{
                position: static;
                margin-right: 8px;
                background-color: #fff;
                border-radius: 2px;
                color: rgba(136,152,172,1);
                transition: width .3s, margin .3s;
            }
        }
    }
</style>