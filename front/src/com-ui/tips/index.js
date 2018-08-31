import alertComponent from './Alert.vue'
import confirmComponent from './Confirm.vue'

const Dialog = [];

Dialog.install = function(Vue, opt) {
    Vue.prototype.$toast = (msg, timeout) => {
        timeout = timeout || 2000;

        let toastTpl = Vue.extend({
            template: '<div class="app-toast">' + msg + '</div>'
        });
        let tpl = new toastTpl().$mount().$el;
        document.body.appendChild(tpl);
        setTimeout(function () {
            document.body.removeChild(tpl);
        }, timeout)
    };

    Vue.prototype.$alert = (options) => {
        let instance = Vue.extend(alertComponent);
        let vm = new instance({el: document.createElement('div')});
        document.body.appendChild(vm.$mount().$el);
        $.extend(true, vm, options, {type:'alert'});
    };

    Vue.prototype.$confirm = (options) => {
        let instance = Vue.extend(confirmComponent);
        let vm = new instance({el: document.createElement('div')});
        document.body.appendChild(vm.$mount().$el);
        $.extend(true, vm, options, {type:'confirm'});
    }
};

export default Dialog;