import Vue from 'vue';
import tips from './tips'

Vue.use(tips);

Vue.component('Modal', ()=>import('./Modal.vue'));
Vue.component('Button', ()=>import('./Button.vue'));
Vue.component('Table', ()=>import('./Table.vue'));

