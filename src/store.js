import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function Store () {
    return new Vuex.Store({
        state: state(),
        mutations: {
            'set-state': setState,
            'set-popup': setPopup,
            'to-cart': toCart,
            'set-cart': setCart,
            'remove-cart': deleteFromCart,
            'clear-cart': clearCart,
            'set-search': setSearch,
            'clear-search': clearSearch,
            'switch-filter': switchFilter
        }
    })
}

function state () {
    return {
        cart: [],
        catalog: [],
        stocks: [],
        items: [],
        search: {},
        filter: false,
        scrollable: true,
        popup: {
            preview: false,
            fullSlider: false,
            cart: false,
            shops: false
        }
    }
}

function setState (state, data) {
    window[data.key] = data.value
    state[data.key] = data.value
}

function setPopup (state, data) {
    state.popup[data.popup] = data.value

    if ( data.value === false )
        state.scrollable = true
    
    else state.scrollable = true
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

function clearCart (state) {
    state.cart = []
}

function setSearch (state, search) {
    state.search[ search.prop ] = search.value
}

function clearSearch (state) {
    state.search = []    
}

function switchFilter (state) {
    state.filter = !state.filter
}