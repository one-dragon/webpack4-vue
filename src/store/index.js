
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import M1 from '~/store/modules/m1';
import tagsView from '~/store/modules/tagsView';
import sideBar from '~/store/modules/sideBar';

export default new Vuex.Store({
    state: {
        data: {}
    },
    mutations: {
        SET_DATA(state, d) {
            state.data = d;
        }
    },
    actions: {
        // { commit, dispatch }
    },
    modules: {
        M1,
        tagsView,
        sideBar
    }
})