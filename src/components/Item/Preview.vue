<template lang="pug">
    div#preview( :class='{show: item !== false}' @click='checkForClose' )
        div( class='content block' v-if='item' )
            button( class='close' @click='close' ) Закрыть
            div( class='top-line' ) Быстрый просмотр

            div( class='table' )
                ItemSlider( :item='item' :link='true' )
                ItemBuy( class='show' :item='item' :closeButton='true' @close='close' )
</template>

<script>
import ItemSlider from '@/components/Item/Slider.vue'
import ItemBuy from '@/components/Item/Buy.vue'

export default {
    computed: { item },
    components: { ItemSlider, ItemBuy },
    methods: { checkForClose, close }
}

// Computed
function item () {
    return this.$store.state.preview
}

// Methods
function checkForClose (event) {
    if ( event.target === this.$el )
        return this.close()
}

function close () {
    return this.$store.commit('item-preview', false)
}
</script>

<style lang="stylus">
@import '~@/style/palette'

#preview
    background RGBA(0, 0, 0, .5)
    display none
    overflow auto
    padding 32px 0 64px 0
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    z-index 5
    &.show
        display block

    .content
        background $white
        box-shadow 0 0 25px RGBA(0, 0, 0, .5)
        padding-top 64px
        position relative
        width 1540px

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
