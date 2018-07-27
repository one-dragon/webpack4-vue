const namespaced = {
    namespaced: true
}

const state = {
    data: []
}

// 调用函数改变state里的值
const mutations = {
    SET_DATA(state, d) {
        state.data = d;
    }
}

const actions = {
//  setData({commit, dispatch}, arr) {
//      commit('SET_DATA', arr);
//  },
    setData({commit}, arr) {
        commit('SET_DATA', arr);
    }
}

export default {
    namespaced,
    state,
    mutations,
    actions
}