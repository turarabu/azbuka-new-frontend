<template lang="pug">
    div#mini-cart( v-if='route.name !== "cart"' :class='{show: scrollTop >= 1250}' )
        div( v-if='popup === false' class='cart' @click='openPreview' )
            div( class='item' :class='{toCart, hide}' v-if='add !== false' )
                div( class='image-div' )
                    img( class='image' :src='add.poster' )
                p( class='name' ) {{ add.source.name }}

            div( v-if='cart.length === 0' )
                p( class='center' ) Корзина пуста
            
            div( v-else to='/cart/1' )
                p( class='count' ) В корзине {{ cart.length }} {{ countText }}
                p( class='total' ) На сумму {{ cartCount().toLocaleString('ru-RU') }} руб

            span( class='cart-button' )
                i( class='icon icon-cart' )

        span( class='to-top' @click='toTop' )
            i( class='icon icon-angle-up' )
</template>

<script>
export default {
    computed: { cart, popup, countText },
    methods: { openPreview, toTop, cartCount, addCart },
    mounted: init,
    data: function () {
        return {
            add: false,
            hide: false,
            toCart: false,
            scrollTop: 0,
            route: this.$router.currentRoute
        }
    }
}

// Computed
function cart () {
    return this.$store.state.cart
}

function popup () {
    return this.$store.state.popup.cart
}

// Methods
function openPreview () {
    this.$store.commit('set-popup', {
        popup: 'cart',
        value: this.cart
    })
}

function toTop () {
    var app = document.querySelector('#app')
    var scrolled = app.scrollTop

    var interval = setInterval(() => {
        app.scrollTop -= Math.max(25, app.scrollTop / 20)

        if (app.scrollTop <= 10)
            return clearInterval(interval)
    }, 15)
}

function countText () {
    return this.cart && this.cart.length > 3
        ? 'товаров' : this.cart.length === 1
            ? 'товар' : 'товара'
}

// Methods
function cartCount () {
    var total = 0

    for (let item of this.cart)
        total += item.total

    return total
}

function addCart (item) {
    this.add = item
    console.log(item)

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
    var events = ['to-cart', 'set-cart']

    this.$router.afterEach(() => {
        this.route = this.$router.currentRoute
        this.$store.commit('clear-search')
    })

    this.$store.subscribe(mutation => {
        if ( events.includes(mutation.type) === true )
            this.addCart(mutation.payload.item || mutation.payload)
    })

    app.addEventListener('scroll', event => {
        this.scrollTop = app.scrollTop
    })
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
    &.show .to-top
        width 92px
        opacity 1        

    .cart
        background $white-gray
        box-shadow -1px 1px 4px RGBA(125, 125, 125, .5)
        margin 0 16px
        position relative
        height 92px
        width 420px

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
        z-index 11
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

    .cart-button
        align-items center
        background $dark-gray
        display flex
        color $white
        font-size 36px
        justify-content center
        position absolute
        top 0
        right 0
        height 92px
        width 92px
        z-index 10

    .to-top
        align-items center
        background $red
        color $white
        font-size 32px
        display flex
        justify-content center
        opacity 0
        overflow hidden
        height 92px
        width 0
</style>
