<template lang="pug">
    div#preview( :class='{show: item !== false}' @click='checkForClose' )
        div( class='content block' v-if='item' )
            button( class='close' @click='close' ) X
                i( class='icon icon-close' )

            ItemSlider( :item='item' )
            ItemDetails( :item='item' )
</template>

<script>
import ItemSlider from '@/components/Item/Slider.vue'
import ItemDetails from '@/components/Item/Details.vue'

export default {
    computed: { item },
    components: { ItemSlider, ItemDetails },
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
    &.show
        display block

    .content
        background $white
        box-shadow 0 0 25px RGBA(0, 0, 0, .5)
        display grid
        grid-template-columns 750px 750px
        justify-content space-between
        padding 92px 32px 64px 32px
        position relative

        .close
            align-items center
            background $red
            border none
            color $white
            display flex
            font-size 28px
            justify-content center
            outline none
            position absolute
            top 0
            right 0
            height 50px
            width 50px
</style>
