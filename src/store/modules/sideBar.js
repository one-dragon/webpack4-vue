
const namespaced = {
    namespaced: true
}

const state = {
    // 导航树结构数据
    data: [],
    // 导航平行结构数据
    dataParallel: []
}

// 调用函数改变state里的值
const mutations = {
    SET_DATA(state, d) {
        state.data = d;
        // 递归----让导航树结构数据，变为平行结构数据
        function recursiveTree(arr, children, resultArr) {
            resultArr = resultArr || [];
            arr.map((item) => {
                if (item[children] && item[children].length > 0) {
                    // console.log('bbb-----------------')
                    // console.log(recursiveTree(item[children], children, resultArr))
                    resultArr.concat(recursiveTree(item[children], children, resultArr));
                } else {
                    resultArr.push(item);
                }
            })
            return resultArr;
        }
        state.dataParallel = recursiveTree(d, 'children');
    }
}

const actions = {
//  setData({commit, dispatch}, arr) {
//      commit('SET_DATA', arr);
//  },
    setData({ commit }, arr) {
        commit('SET_DATA', arr);
    }
}

export default {
    namespaced,
    state,
    mutations,
    actions
}