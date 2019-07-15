import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function Store () {
    return new Vuex.Store({
        state: state(),
        mutations: {
            'set-catalog': setCatalog,
            'set-items': setItems,
            'set-filters': setFilters,
            'item-preview': itemPreview,
            'full-slider': fullSlider,
            'to-cart': toCart,
            'set-cart': setCart,
            'delete': deleteFromCart,
            'set-search': setSearch,
            'switch-filter': switchFilter
        }
    })
}

function state () {
    return {
        cart: [],
        catalog: [],
        items: [],
        preview: false,
        fullSlider: false,
        scrollable: true,
        filter: false,
        filters: [],
        search: {}
    }
}

function setCatalog (state, data) {
    state.catalog = data
    window.catalog = data
}

function setFilters (state, data) {
    state.filters = data
}

function setItems (state, data) {
    state.items = data
    window.items = data
}

function itemPreview (state, set) {
    state.preview = set
    state.scrollable = set === false
        ? true : false
}

function fullSlider (state, set) {
    state.fullSlider = set
    state.scrollable = set === false
        ? true : false
}

function toCart (state, order) {
    state.cart.push(order)
}

function setCart (state, newItem) {
    state.cart[newItem.index] = newItem.item
}

function deleteFromCart (state, id) {
    state.cart.splice(id, 1)
}

function setSearch (state, search) {
    state.search[ search.prop ] = search.value
}

function switchFilter (state) {
    state.filter = !state.filter
}