<template lang="pug">
    div#app( :class='{"no-scroll": scrollable === false}' v-if='ready === true' )
        HeaderComponent
        router-view

        CartPreview
        ItemPreview
        ShopsList
        FullSlider
        MiniCart

    Preloader( v-else @ready='start' )

</template>

<script>
import HeaderComponent from '@/components/Header/Index.vue'
import Preloader from '@/views/Preloader.vue'
import MiniCart from '@/components/Cart/Mini.vue'

import CartPreview from '@/components/Cart/Preview.vue'
import ItemPreview from '@/components/Item/Preview.vue'
import ShopsList from '@/components/Item/Shops.vue'
import FullSlider from '@/components/Item/FullSlider.vue'

export default {
    components: {
        HeaderComponent,
        Preloader,
        CartPreview,
        ShopsList,
        ItemPreview,
        FullSlider,
        MiniCart
    },
    computed: { scrollable },
    methods: { start },
    mounted: init,
    data: function () {
        return {
            ready: false
        }
    }
}

// Computed
function scrollable () {
    return this.$store.state.scrollable
}

// Mounted
function init () {
    this.$router.afterEach(() => {
        this.$el.scrollTop = 0
        this.$store.commit('set-popup', {
            popup: 'preview',
            value: false
        })

        this.$store.commit('set-popup', {
            popup: 'cart',
            value: false
        })
    })
}

// Methods
function start () {
    this.ready = true
}
</script>

<style lang="stylus">
@import '~@/style/icons'

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
