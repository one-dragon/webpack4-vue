
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import M1 from './modules/m1';

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
        M1
    }
})