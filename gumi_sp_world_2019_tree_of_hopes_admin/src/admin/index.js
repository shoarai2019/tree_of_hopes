import Vue from 'vue'
import App from './App.vue'
import titleMixin from './modules/title'
import router from './router'
import store from './store'
import {sync} from 'vuex-router-sync'
import 'bulma/css/bulma.css'

Vue.mixin(titleMixin);

sync(store, router);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
