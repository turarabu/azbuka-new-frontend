import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function Store () {
    return new Vuex.Store({
        state: state,
        mutations: {
            'set-catalog': setCatalog,
            'set-items': setItems,
            'item-preview': itemPreview,
            'full-slider': fullSlider,
            'add': addToCart,
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
        search: {}
    }
}

function setCatalog (state, data) {
    state.catalog = data
}

function setItems (state, data) {
    state.items = data
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

function addToCart (state, order) {
    state.cart.push(order)
}

function setSearch (state, search) {
    state.search[ search.prop ] = search.value
}

function switchFilter (state) {
    state.filter = !state.filter
}