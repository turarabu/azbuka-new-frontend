import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: []
})

export function Route () {
    return new Router({
        routes: routes()
    })
}

function routes () {
    return [
        makePath('/', 'Home'),
        makePath('/catalog/:id', 'Catalog'),
        makePath('/item/:id', 'Item'),
        makePath('/cart/:step', 'Cart')
    ]
}

function makePath (link, component) {
    return {
        path: link,
        name: component.toLowerCase(),
        props: true,
        component: function () {
            return import(`@/views/${ component }.vue`)
        }
    }
}