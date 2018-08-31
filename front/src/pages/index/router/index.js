import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import utils from '../../../utils'

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'home',
    meta: {
        requireAuth: true
    },
    component: () => import('../components/Home.vue')
}];

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('_user')) {
    store.commit("SET_PARAM", {
        user: window.localStorage.getItem('_user')
    })
}

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.user) {
            next();
        }
        else {
            utils.toLogin()
        }
    }
    else {
        next();
    }
});

export default router;