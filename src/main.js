import Vue from 'vue'
import { Route } from '@/router'
import { Store } from '@/store'

import app from '@/app.vue'

directives()
main()

function main () {
    var store = Store()
    var router = Route()

    var vue = new Vue({
        router,
        store,
        render: handle => handle(app)
    })

    return vue.$mount('#app')
    
}

function directives () {
    Vue.directive('$model', {
        bind: function (el, binding, vnode) {
            el.oninput = () => {
                return vnode.context[binding.expression] = el.value
            }
        }
    })
}