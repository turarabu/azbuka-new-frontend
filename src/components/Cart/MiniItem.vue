<template lang="pug">

    div( class='cart-mini-item row' )
        router-link( tag='div' class='image data' :to='`/item/${ item.id }`' )
            div( class='image-div' )
                img( class='image' :src='item.poster' )

        router-link( tag='div' class='name data' :to='`/item/${ item.id }`' )
            h3( class='name-text' ) {{ item.source.name }}
            p( class='selected-option' ) {{ spec.name }}: {{ spec.options[item.option].name }}
        
        ItemLeft( v-bind='{ item, index }' )

        div( v-if='maxDiscount > 0' class='price data' )
            span( class='old' ) {{ maxPrice.toLocaleString("ru-RU") }} руб
            span( class='current' ) {{ minPrice.toLocaleString("ru-RU") }} руб
            span( class='discount' ) –{{ maxDiscount }}%

        div( v-else class='price data' )
            span( class='current' ) {{ minPrice.toLocaleString("ru-RU") }} руб

        div( class='actions' ) 
            i( class='icon icon-trash' @click='$emit("remove", index)' )

</template>

<script>
import ItemLeft from '@/components/Cart/Item/Left.vue'

export default {
    components: { ItemLeft },
    props: ['item', 'index'],
    data: function () {
        var item = this.item.source
        
        return {
            source: item.source,
            spec: item.specs[0],
            maxDiscount: Math.max( ...item.prices.discounts ),
            minPrice: Math.min( ...item.prices.mins ),
            maxPrice: Math.max( ...item.prices.maxs ),
            hide: false
        }
    }
}
</script>

<style lang="stylus">
@import '~@/style/palette'

.cart-mini-item
    opacity 1
    &.hide
        opacity 0

    .border
        border-bottom 1px dashed lighten($dark-gray, 15)

    .image-div
        align-items center
        display flex
        justify-content center
        height 150px
        width 100%

        .image
            max-height  100%
            max-width 100%

    .name-text
        display block
        font-size 18px
        font-weight 500
        margin 6px 0

    .selected-option
        color lighten($dark-gray, 15)
        font-size 16px

    .data
        font-size 18px
        font-weight 500
        text-align center

    .name
        text-align left

    .icon-trash
        color $red
        display inline-block
        font-size 24px
        margin 0 4px

    .price
        font-size 18px

        .old
            color lighten($dark-gray, 15)
            text-decoration line-through

        .current
            display block
            font-size 20px

        .discount
            color $red
            font-size 16px
            letter-spacing 1px
</style>
