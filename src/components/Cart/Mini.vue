<template lang="pug">
    div#mini-cart
        div( class='cart' )
            div( class='item' :class='{toCart, hide}' v-if='add !== false' )
                div( class='image-div' )
                    img( class='image' :src='`/images/dynamic/${ add.item.headImage }.jpg`' )
                p( class='name' ) {{ add.item.name }}

            div( v-if='cart.length === 0' )
                p( class='center' ) Корзина пуста
            
            router-link( tag='div' v-else to='/cart/1' )
                p( class='count' ) В корзине {{ cart.length }} {{ countText }}
                p( class='total' ) На сумму {{ cartCount() }} руб

        span( class='to-top' :class='{show: scrollTop >= 1250}' @click='toTop' )
            i( class='icon icon-angle-up' )
</template>

<script>
export default {
    computed: { cart, countText },
    methods: { toTop, cartCount, price, addCart },
    mounted: init,
    data: function () {
        return {
            add: false,
            hide: false,
            toCart: false,
            scrollTop: 0
        }
    }
}

function cart () {
    return this.$store.state.cart
}

// Methods
function toTop () {
    var app = document.querySelector('#app')

    var interval = setInterval(() => {
        app.scrollTop -= 50

        if (app.scrollTop <= 10)
            return clearInterval(interval)
    }, 10)
}

function countText () {
    return this.cart && this.cart.length > 3
        ? 'товаров' : this.cart.length === 1
            ? 'товар' : 'товара'
}

// Methods
function cartCount () {
    var total = 0

    for (let item of this.cart) {
        total += item.count + this.price(item)
    }

    return total
}

function price (item) {
    for (let option of item.item.specs[0].options) {
        if (option.id === item.selected)
            return getDiscount(option)
    }
}

function addCart (item) {
    this.add = item

    setTimeout(() => {
        this.toCart = true
    }, 1000)

    setTimeout(() => {
        this.hide = true
    }, 1500)

    setTimeout(() => {
        this.add = false
        this.toCart = false
        this.hide = false
    }, 2000)
}

// Mounted
function init () {
    var app = document.querySelector('#app')

    this.$store.subscribe(mutation => {
        if (mutation.type === 'add')
            this.addCart(mutation.payload)
    })

    app.addEventListener('scroll', event => {
        this.scrollTop = app.scrollTop
    })
}

// Help function
function getDiscount (option) {
    var prices = option.prices

    if (prices.discounts.length > 0) {
        let list = []
        for (let discount of prices.discounts)
            list.push(prices.current * discount.discount)
        
        return Math.min(list)
    }

    else return prices.current
}
</script>


<style lang="stylus">
@import '~@/style/palette'

#mini-cart
    display flex
    position fixed
    bottom 32px
    right 32px
    z-index 10

    .cart
        background $white-gray
        box-shadow -1px 1px 4px RGBA(125, 125, 125, .5)
        margin 0 16px
        position relative
        height 92px
        width 360px

    .item
        align-items center
        background $white
        box-shadow inherit
        display flex
        opacity 1
        position absolute
        top -100px
        height 92px
        width 100%
        &.toCart
            top 0
        &.hide
            opacity 0

        .image-div
            padding 12px
            height 92px
            width 92px

            .image
                max-height 100%
                max-width 100%

        .name
            display inline-block
            font-size 16px
            font-weight 500
            max-height 38px
            overflow hidden
            width calc(100% - 100px)

    .center
        font-size 20px
        font-weight 500
        margin 28px 32px

    .count
        font-size 20px
        font-weight 500
        margin 20px 0 4px 24px

    .total
        font-size 16px
        font-weight 500
        margin 4px 24px

    .to-top
        align-items center
        background $red
        color $white
        font-size 20px
        display flex
        justify-content center
        opacity 0
        height 92px
        width 92px
        &.show
            opacity 1
</style>
