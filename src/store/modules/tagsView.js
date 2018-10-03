
const namespaced = {
    namespaced: true
}

const state = {
    data: [],
    cacheData: []
}

// 调用函数改变state里的值
const mutations = {
    // 拖拽改变tabs
    CHANGE_DATA(state, arr) {
        state.data = arr;
    },
    // 添加tabs
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
    },
    // 删除tabs
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