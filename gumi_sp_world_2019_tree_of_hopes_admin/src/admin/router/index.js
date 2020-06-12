import Vue from 'vue'
import Router from 'vue-router'

import admin from '../components/admin.vue'

import messages from '../components/messages/index.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0}
    },
    routes: [
        {
            path: '/admin',
            component: admin,
            children: [
                {
                    path: '',
                    name: 'messages',
                    component: messages
                }
            ]
        }
    ]
})
