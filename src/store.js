import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function Store () {
    return new Vuex.Store({
        state: state,
        mutations: {
            'set-catalog': setCatalog,
            'set-items': setItems,
            'set-filters': setFilters,
            'item-preview': itemPreview,
            'full-slider': fullSlider,
            'add': addToCart,
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
}

function setFilters (state, data) {
    state.filters = data
}

function setItems (state, data) {
    for (let item of data) {
        item.prices = getMinMax(item)
    }

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

function deleteFromCart (state, id) {
    state.cart.splice(id, 1)
}

function setSearch (state, search) {
    state.search[ search.prop ] = search.value
}

function switchFilter (state) {
    state.filter = !state.filter
}

// Helper functions
function getMinMax (item) {
    var max = []
    var min = []
    var discs = []

    for (let spec of item.specs)
        for (let option of spec.options) {
            let prices = getPrices(option.prices)

            max.push(prices.max)
            min.push(prices.min)
            discs.push(...prices.discs)
        }

    return {
        max: Math.max(...max),
        min: Math.min(...min),
        discs: Math.max(...discs)
    }
}

function getPrices (prices) {
    var today = new Date()
    var discs = []
    var current = prices.current

    for (let disc of prices.discounts) {
        if (new Date(disc.endDate) >= today)
            discs.push(disc.discount)
    }


    if ( discs.length === 0 )
        discs = [0]

    return {
        max: current,
        min: parseInt((1 - (Math.max(...discs) / 100)) * current),
        discs: discs.length > 0 ? discs : [0]
    }
}