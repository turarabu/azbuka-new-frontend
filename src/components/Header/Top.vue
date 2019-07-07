<template lang="pug">
    div#header-top( class='block' )
        div( class='left' )
            router-link( tag='div' class='logo-div' to='/' )
                img( class='logo' src='/images/123logo.png' )

            span( class='big-text' )
                span( class='bold' ) Больше выбора |
                span( class='light' ) Только выгода

        router-link( tag='div' class='right' to='/cart/1' )
            span( class='cart-text' ) Корзина
            div( class='cart-div' )
                span( class='count' ) {{ cart.length }}
</template>

<script>
export default {
    computed: { cart }
}

function cart () {
    return this.$store.state.cart
}
</script>


<style lang="stylus">
@import '~@/style/palette'

#header-top
    align-items center
    display flex
    justify-content space-between

    .left, .right
        align-items center
        display flex

    .big-text
        display inline-block
        font-size 36px
        margin-left 64px
        text-transform uppercase

        .bold
            font-weight 400

        .light
            display inline-block
            font-weight 300
            margin-left 12px

    .cart-div
        background #555
        align-items center
        color $white
        display flex
        justify-content center
        margin-left 16px
        height 128px
        width 128px
</style>
