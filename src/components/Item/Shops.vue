<template lang="pug">
    div#shops-list( :class='{show: shops !== false}' @click='checkForClose' )
        div( class='content block' v-if='shops' )
            button( class='close' @click='close' ) Закрыть
            div( class='top-line' ) Товары в наличии

            div( class='content-div' )
                h3( class='title' ) {{ shops.source.name }}
                p( class='gray-text' ) В наличии в магазинах

                p( class='row' )
                    span( class='shop' )
                        i( class='icon icon-map-marker' )
                        span АМ Русская 2К
                    span( class='count' ) {{ selected.left }} {{ shops.source.unit }}
                

</template>

<script>
export default {
    computed: { shops, selected },
    methods: { checkForClose, close }
}

// Computed
function shops () {
    return this.$store.state.popup.shops
}

function selected () {
    return this.$store.state.popup.shops.selected
}

// Methods
function checkForClose (event) {
    if ( event.target === this.$el )
        return this.close()
}

function close () {
    return this.$store.commit('set-popup', {
        popup: 'shops',
        value: false
    })
}
</script>

<style lang="stylus">
@import '~@/style/palette'

#shops-list
    background RGBA(0, 0, 0, .5)
    display none
    overflow hidden
    padding 64px 0 0 0
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
        max-height 980px
        overflow hidden
        padding-top 64px
        position relative
        width 960px

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

        .content-div
            max-height 600px
            margin 32px auto
            overflow auto
            width 600px

        .title
            font-size 24px
            font-weight 500

        .gray-text
            color lighten($dark-gray, 15)
            font-size 18px
            margin 12px 0

        .row
            display flex
            font-size 18px
            font-weight 500
            justify-content space-between
            margin 8px 0
            position relative
            &:before
                border-top 1px dotted
                display block
                content ''
                position absolute
                top 12px
                left 0
                width 100%
                z-index 15

            .shop
                background $white
                display inline-block
                padding-right 6px
                position relative
                z-index 16
            
                .icon
                    color $red
                    display inline-block
                    margin-right 4px
                    position relative
                    top 2px

            .count
                background $white
                display inline-block
                padding-left 6px
                position relative
                z-index 16
</style>
