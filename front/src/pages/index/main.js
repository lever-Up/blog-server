import Vue from 'vue';
import '../../css/base.less'
import App from './App.vue';
import router from './router';
import store from './store';
import '../../com-ui';

window.Promise = Promise;

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
