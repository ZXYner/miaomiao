import Vue from 'vue';
import MessageBox from './MessageBox';


export var messageBox = (function() {
    let defaults = {
        // 默认值
        title: '',
        content: '',
        cancel: '',
        ok: '',
        hancleCancel: null,
        hanldeOk: null
    };
    // 使用Vue.extend()构建组件
    let MyComponent = Vue.extend(MessageBox);

    return function(opts) {
        // 配置参数
        for (let attr in opts) {
            defaults[attr] = opts[attr];
        }
        //注册组件
        // 1.注册全局组件  Vue.compoent(组件名称,组件构造时定义的变量)
        // 2.注册局部组件,只能在注册该组件的实例中使用
        let vm = new MyComponent({
            el: document.createElement('div'),
            data: {
                title: defaults.title,
                content: defaults.content,
                cancel: defaults.cancel,
                ok: defaults.ok
            },
            methods: {
                hancleCancle() {
                    defaults.hancleCancel && defaults.handelCancel.call(this)
                    document.removeChild(vm.$el);
                },
                hanldeOk() {
                    defaults.hanldeOk && defaults.hanldeOk.call(this)
                    document.removeChild(vm.$el);
                }
            }
        })
        document.body.appendChild(vm.$el)
    };
})();