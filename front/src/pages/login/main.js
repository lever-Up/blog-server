import Vue from 'vue';
import '@/css/base.less'
import App from './App.vue';
import '@/com-ui';

window.Promise = Promise;

new Vue({
    el: '#app',
    render: h => h(App)
});
