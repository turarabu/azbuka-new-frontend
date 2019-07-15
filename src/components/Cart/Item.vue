<template lang="pug">
    tr( class='cart-item' :class='{ hide }' )
        td( class='image image-div border' )
            img( class='image' :src='item.poster' )
        
        td( class='name border' )
            span( class='bold' ) {{ item.source.name }}
            span( class='spec' ) {{ item.source.specs[0].name }}: {{ options[item.option].name }}

        td( class='count border' ) {{ item.count }} {{ item.source.unit }}
        td( class='price border' ) {{ item.source.prices.mins[item.option] }} руб
        td( class='build border' ) {{ item.source.build ? 'Да' : 'Не требуется' }}
        td( class='total border' ) {{ item.total }} руб
        td( class='actions border' )
            i( class='icon icon-trash' @click='$emit("remove", index)' )
</template>

<script>
export default {
    props: ['item', 'index'],
    data: function () {
        return {
            options: this.item.source.specs[0].options,
            hide: false
        }
    }
}
</script>

<style lang="stylus">
@import '~@/style/palette'

.cart-item
    opacity 1
    &.hide
        opacity 0

    .border
        border-bottom 1px dashed lighten($dark-gray, 15)

    .image-div
        align-items center
        display flex
        justify-content center
        height 256px
        width 256px

        .image
            max-height  100%
            max-width 100%

    .bold
        display block
        font-size 18px
        font-weight 500
        margin 4px 0

    .spec
        color lighten($dark-gray, 15)
        font-size 16px

    .count, .price, .build, .total
        font-size 18px
        font-weight 500
        text-align center

    .icon-trash
        color $red
        display inline-block
        font-size 24px
        margin 0 4px
</style>
