<template lang="pug">
    div( class='home-slider' )
        span( class='arrow left' @click='goSlide(-1)' )
            i( class='icon icon-angle-up' )
        span( class='arrow right' @click='goSlide(1)' )
            i( class='icon icon-angle-down' )

        div( class='slides-div' )
            div( v-for='slide in stocks' class='slide' )
                router-link( tag='div' class='slide-image-div' :to='`/stock/${ slide.id }`' )
                    img( class='slide-image' :src='getImage(slide.headImage)' )
                    //- img( class='image' :src='getImage(slide.headImage)' )        
            
                h3( class='title' ) {{ slide.name }}
                div( class='items' )
                    ItemCard( v-for='item of getTop(slide)' :item='item.source' :key='item.id' )
</template>

<script>
import ItemCard from '@/components/Item/Card.vue'

export default {
    props: ['stocks'],
    components: { ItemCard },
    methods: { getImage, goSlide, goMove, getTop },
    data: function () {
        return {
            lock: false,
            move: 0
        }
    }
}

// Methods
function getImage (image) {
    return `/images/dynamic/${ image }.jpg`
}

function goSlide (n) {
    if ( this.lock === true )
        return

    else {
        let el = this.$el.querySelector('.slides-div')

        this.lock = true
        this.move += n

        if ( this.move === this.stocks.length )
            this.move = 0

        else if ( this.move === - 1 )
            this.move = this.stocks.length - 1

        return this.goMove(el, el.offsetWidth * this.move)
    }
}

function getTop (stock) {
    return stock.items.slice(0, 5)
}

// Help functions
function goMove (el, scroll) {
    var needs = scroll - el.scrollLeft
    var total = 0

    var interval = setInterval(() => {
        el.scrollLeft += needs / 30
        total += 1
        if ( total === 31 ) {
            this.lock = false
            return clearInterval(interval)
        }
    }, 15)
}
</script>

<style lang="stylus">
@import '~@/style/palette'

.home-slider
    overflow hidden
    position relative

    .arrow
        align-items center
        background $red
        border-radius 5px
        color $white
        display flex
        font-size 24px
        justify-content center
        position absolute
        top 215px
        height 50px
        width 50px
        z-index 2
        &.left
            left 15px
        &.right
            right 15px
            padding-left 8px

        .icon
            transform rotate(-90deg)

    .slides-div
        overflow hidden
        white-space nowrap
        width 100%


    .slide
        display inline-block
        vertical-align top
        width 100%


    .slide-image-div
        align-items center
        background-color darken($white-gray, 15)
        background-image url('/images/banner.jpg')
        background-size cover
        background-position center
        background-repeat no-repeat
        display flex
        justify-content center
        position relative
        height 480px
        width 100%


        .slide-image
            max-height 100%
            max-width 100%

    .title
        font-size 20px
        font-weight 500
        margin 32px 0 16px 0

    .items
        align-items top
        display grid
        grid-template-columns 350px 350px 350px 350px 350px
        justify-content space-between
</style>
