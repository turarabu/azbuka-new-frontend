<template lang="pug">
    div#full-slider( v-if='item !== false' @click='checkForClose' )
        div( class='content block' )
            div( class='images-list-div' )
                button( class='arrow top' @click='addScroll(-500)' ) i
                button( class='arrow bottom' @click='addScroll(500)' ) b

                div( class='list' )
                    div( class='image-div' v-for='(image, index) in list' @click='current = index' )
                        img( class='image' :src='`/images/dynamic/${ image }.jpg`' )

            div( class='head-image-div' )
                img( class='image' :src='`/images/dynamic/${ list[ current ] }.jpg`' )
                span( class='close' @click='close' ) X
                    i( class='icon icon-close' )
</template>

<script>
export default {
    computed: { item, list },
    methods: { checkForClose, close, addScroll },
    data: function () {
        var current = 0
        return { current }
    }
}

// Computed
function item () {
    return this.$store.state.fullSlider
}

function list () {
    return this.item === false
        ? [] : this.item.headImage
            ? [this.item.headImage, ...this.item.images]
            : [...this.item.images]
}

// Methods
function checkForClose (event) {
    var content = this.$el.querySelector('.content')
    if ( event.target === this.$el || event.target === content )
        return this.close()
}

function close () {
    return this.$store.commit('full-slider', false)
}

function addScroll (to) {
    var total = 0
    var list = this.$el.querySelector('.list')
    var interval = setInterval(() => {
        total += to / 20
        list.scrollBy(0, to / 20)

        if (total === to)
            return clearInterval(interval)
    }, 20)
}
</script>

<style lang="stylus">
@import '~@/style/palette'

#full-slider
    background RGBA(0, 0, 0, .5)
    display block
    overflow auto
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    z-index 5
    &.show
        display block

    .content
        align-content space-between
        display flex
        justify-content space-between
        height 100%
        overflow hidden
        padding 32px 32px 64px 32px
        position relative

    .close
        align-items center
        background $red
        border-radius 50%
        color $white
        display flex
        font-size 28px
        justify-content center
        position absolute
        top -24px
        right -24px
        height 52px
        width 52px

    .images-list-div
        padding 58px 0
        position relative
        height 100%
        width 256px

        .list
            overflow hidden
            height 100%
            width 100%

        .arrow
            background #777
            box-shadow 0 0 15px RGBA(0, 0, 0, .35)
            border none
            color $white
            display block
            outline none
            padding 16px 0
            position absolute
            left 0
            width 100%
            &.top
                top 0
            &.bottom
                bottom 0

    .image-div
        background $white
        box-shadow 0 0 5px RGBA(0, 0, 0, .25)
        display block
        margin 16px 0
        padding 12px
        width 100%
        &:first-child
            margin-top 0

        .image
            max-width 100%
            max-height 100%

    .head-image-div
        align-items center
        background $white
        box-shadow 0 0 5px RGBA(0, 0, 0, .25)
        display flex
        justify-content center
        padding 24px
        position relative
        height 100%
        width calc(100% - (256px + 32px))

        .image
            max-width 100%
            max-height 100%
</style>
