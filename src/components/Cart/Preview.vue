<template lang="pug">
    div#cart-preview( :class='{show: cart !== false}' @click='checkForClose' )
        div( class='content block' v-if='cart' )
            button( class='close' @click='close' ) Закрыть
            div( class='top-line' ) Товары в вашей корзине

            div( class='content-div' )
                ItemsList( :cart='cart' :mini='true' )

            ContinueMini( :cart='cart' @close='close' )

</template>

<script>
import ItemsList from '@/components/Cart/List.vue'
import ContinueMini from '@/components/Cart/ContinueMini.vue'

export default {
    computed: { cart },
    components: { ItemsList, ContinueMini },
    methods: { checkForClose, close }
}

// Computed
function cart () {
    return this.$store.state.popup.cart
}

// Methods
function checkForClose (event) {
    if ( event.target === this.$el )
        return this.close()
}

function close () {
    return this.$store.commit('set-popup', {
        popup: 'cart',
        value: false
    })
}
</script>

<style lang="stylus">
@import '~@/style/palette'

#cart-preview
    background RGBA(0, 0, 0, .5)
    display none
    overflow hidden
    padding 32px 0 0 0
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    z-index 15
    &.show
        display block

    .content
        background $white
        box-shadow 0 0 25px RGBA(0, 0, 0, .5)
        height 980px
        overflow hidden
        padding-top 64px
        position relative

        .content-div
            max-height 700px
            overflow auto

        .table
            display grid
            grid-template-columns 750px 750px
            justify-content space-between
            padding-left 32px

        .close
            background $white
            border none
            color $balck
            font-size 18px
            font-weight 500
            outline none
            padding 24px 24px 18px 24px
            position absolute
            top 0
            right 0
            width 150px

        .top-line
            background $red
            color $white
            font-size 20px
            padding 16px 32px
            text-transform uppercase
</style>
