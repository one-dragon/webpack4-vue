
import Vue from 'vue';
Vue.mixin({
    data() {
        return {
            isMounted: true
        }
    },
    deactivated() {
        this.isMounted = false;
    },
    methods: {},
    directives: {}
})