<template lang="pug">
    div#app( :class='{"no-scroll": scrollable === false}' v-if='ready === true' )
        HeaderComponent
        router-view

        ItemPreview
        FullSlider

    Preloader( v-else )

</template>

<script>
import HeaderComponent from '@/components/Header/Index.vue'
import Preloader from '@/views/Preloader.vue'
import ItemPreview from '@/components/Item/Preview.vue'
import FullSlider from '@/components/Item/FullSlider.vue'

export default {
    created: init,
    components: { HeaderComponent, Preloader, ItemPreview, FullSlider },
    computed: { scrollable },
    data: function () {
        return {
            ready: false
        }
    }
}

// Created function and them helpers
function init () {
    setTimeout(async () => {
        var catalog = await getCatalog()
        var items = await getItems()

        this.$store.commit('set-catalog', catalog)
        this.$store.commit('set-items', items)

        this.ready = true
    }, 2000)
}

function ajax (method, handler) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest()

        request.open('GET', `http://95.167.9.22:8081/${method}`, true)
        request.send()

        return handler.call(request, resolve, reject)
    })
}

function handle (request, resolve, reject) {
    request.addEventListener('readystatechange', event => {
        if (request.readyState === 4 && request.status === 200) {
            var json = JSON.parse(request.responseText)
            resolve(json.data)
        }
    })
}

function getCatalog () {
    return ajax('catalog/list', function (resolve, reject) {
        handle(this, resolve, reject)        
    })
}

function getItems () {
    return ajax('item/list?shop=000000001', function (resolve, reject) {
        handle(this, resolve, reject)
    })
}

// Computed
function scrollable () {
    return this.$store.state.scrollable
}
</script>

<style lang="stylus">
#app
    overflow auto
    overflow-x hidden
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    &.no-scroll
        overflow hidden

*
    box-sizing border-box
    font-family 'Roboto', sans-serif
    margin 0
    padding 0
    text-decoration none
    transition .3s all
    user-select none

.block
    margin 0 auto
    width 1820px
</style>
