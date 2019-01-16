
const namespaced = {
    namespaced: true
}

const state = {
    data: [],
    cacheData: [],
    // 关闭tag的path值
    closeData: [],
    // 刷新路由组件
    refresh: false
}

// 调用函数改变state里的值
const mutations = {
    // 拖拽改变tabs
    CHANGE_DATA(state, arr) {
        state.data = arr;
    },
    // 添加tags、添加cache数据、删除关闭数据
    ADD_DATA(state, obj) {
        if (state.data.some(v => v.path === obj.path)) return;
        state.data.push(
            Object.assign({}, obj, {
                title: obj.meta.title || 'no-name'
            })
        )
        if (!obj.meta.noCache) {
            state.cacheData.push(obj.name);
        }

        // 打开新的tag时，查找关闭tag数组(closeData)中是否有匹配数据，有则删除
        state.closeData.forEach((item, index) => {
            if (item == obj.path) {
                state.closeData.splice(index, 1);
            }
        });
    },
    // 关闭tabs的路由地址
    ADD_CLOSE_DATA(state, obj) {
        if (state.data.some(v => v.path === obj.path)) return;
        state.closeData.push(obj.path);
    },
    // 删除tags、删除cache数据
    DEL_DATA(state, obj) {
        for(const [i, v] of state.data.entries()) {
            if (v.path === obj.path) {
                state.data.splice(i, 1);
                break;
            }
        }
        for(const i of state.cacheData) {
            if (i === obj.name) {
                const index = state.cacheData.indexOf(i);
                state.cacheData.splice(index, 1);
                break;
            }
        }
    },
    // 添加缓存数据、删除关闭数据
    ADD_CACHE_DEl_CLOSE(state, obj) {
        if (!obj.meta.noCache) {
            state.cacheData.push(obj.name);
        }
        state.closeData.forEach((item, index) => {
            if (item == obj.path) {
                state.closeData.splice(index, 1);
            }
        });
    },
    // 删除缓存数据、添加关闭数据
    DEL_CACHE_ADD_CLOSE(state, obj) {
        for (let i of state.cacheData) {
            if (i === obj.name) {
                const index = state.cacheData.indexOf(i);
                state.cacheData.splice(index, 1);
                break;
            }
        }
        state.closeData.push(obj.path);
    },
    // 改变refresh数据
    CHANGE_REFRESH(state) {
        state.refresh = !state.refresh;
    }
}

const actions = {
//  setData({commit, dispatch}, arr) {
//      commit('SET_DATA', arr);
//  },
    addData({ commit }, obj) {
        commit('ADD_DATA', obj);
    },
    delData({ commit }, obj) {
        return new Promise(resolve => {
            commit('DEL_DATA', obj);
            resolve([...state.data]);
        })
    }
}

export default {
    namespaced,
    state,
    mutations,
    actions
}