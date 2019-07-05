import Vue from 'vue'
import { Route } from '@/router'
import { Store } from '@/store'

import app from '@/app.vue'

main()

function main () {
    var store = Store()
    var router = Route()

    var vue = new Vue({
        router,
        store,
        productionSourceMap: false,
        render: handle => handle(app)
    })

    return vue.$mount('#app')
}
