<template lang="pug">
    div( class='item-slider' )
        div( class='head-image-div' @click='openFullSlider' )
            img( class='image' :src='getImage( list[current] )' )

        div( class='images-list-div' )
            span( class='arrow left' @click='scroll(-250)' )
                i( class='icon icon-angle-up' )

            div( class='scroll-div' )
                div( class='image-div' v-for='(image, index) in list' @click='current = index' )
                    img( class='image' :src='getImage( image )' )
            
            span( class='arrow right' @click='scroll(250)' )
                i( class='icon icon-angle-down' )

        div( class='to-item-page-div' v-if='link === true' )
            router-link( tag='span' class='to-item-page' :to='`/item/${ item.id }`' ) Страница товара

</template>

<script>
export default {
    props: ['item', 'link'],
    methods: { getImage, scroll, openFullSlider },
    data: function () {
        var current = 0
        var list = this.item.headImage
            ? [this.item.headImage, ...this.item.images]
            : [...this.item.images]

        return { current, list }
    }
}

// Methods
function getImage (image) {
    return `/images/dynamic/${ image }.jpg`
}

function openFullSlider () {
    return this.$store.commit('full-slider', this.item)
}

function scroll (px) {
    var div = this.$el.querySelector('.scroll-div')
    var scrolled = 0
    var interval = setInterval(() => {
        div.scrollLeft += px / 10

        if ( scrolled === px )
            return clearInterval(interval)
        
        else scrolled += px / 10
    }, 25)
}
</script>

<style lang="stylus">
@import '~@/style/palette'

.item-slider
    
    .head-image-div
        align-items center
        display flex
        justify-content center
        padding 16px
        height 500px
        width 100%

        .image
            max-height 100%
            max-width 100%

    .images-list-div
        height 72px
        margin 24px 0
        position relative
        width 100%

        .arrow
            align-items center
            background lighten($dark-gray, 15)
            color $white
            display flex
            font-size 24px
            justify-content center
            position absolute
            top 0
            bottom 0
            width 42px
            &:after
                background linear-gradient(to right, #fff 15px, transparent)
                content ''
                display block
                height 100%
                position absolute
                top 0
                right -35px
                width 35px
            &.left
                left 0
            &.right
                right 0
                padding-left 8px
                &:after
                    background linear-gradient(to left, #fff 15px, transparent)
                    left -35px
                    right none

            .icon
                transform rotate(-90deg)

        .scroll-div
            height 100%
            overflow hidden
            padding 0 64px
            text-align center
            white-space nowrap
            width 100%


        .image-div
            border 1px solid $white-gray
            display inline-block
            height 100%
            margin 0 6px
            padding 6px
            min-width 72px


        .image
            height 100%

    .to-item-page-div
        margin 42px 0 32px 0
        text-align center

        .to-item-page
            border-bottom 1px dashed
            display inline-block
            font-size 20px
            font-weight 500
            padding 8px 4px 4px 4px
</style>
