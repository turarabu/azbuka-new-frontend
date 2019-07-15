<template lang="pug">
    div( class='price-block' )
        h3( class='title' ) Цена
            span( v-if='prices.dis > 0' class='price-text' ) / со скидкой

        span( v-if='prices.dis > 0' class='price' )
            span( class='current old' ) {{ prices.max }}
            span( class='new-price' ) {{ prices.min }}

        span( v-else class='price' )
            span( class='current' ) {{ prices.max }}
</template>

<script>
export default {
    props: ['item', 'option'],
    computed: { prices }
}

function prices () {
    return {
        dis: toReadablePrice( this.item.prices.discounts[ this.option ] ),
        max: toReadablePrice( this.item.prices.maxs[ this.option ] ),
        min: toReadablePrice( this.item.prices.mins[ this.option ] )
    }
}

// Help functions
function toReadablePrice (price) {
    // price = parseInt(price)
    return price.toLocaleString('ru-RU') + ' руб'
}
</script>

<style lang="stylus">
@import '~@/style/palette'

.price-block

    .price-text
        display inline-block
        margin-left 6px

    .price
        background $white
        border 1px solid $red
        border-radius 25px
        display inline-block
        font-size 20px
        font-weight 500
        margin 12px 0 12px -2px
        overflow hidden

        .current
            display inline-block
            margin 8px 20px
            &.old
                color lighten($dark-gray, 15)
                margin 8px 16px

        .new-price
            background $red
            border-radius 25px 0 0 25px
            color $white
            display inline-block
            margin-left -4px
            padding 8px 16px
</style>
