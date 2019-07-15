<template lang="pug">

    div( class='cart-item row' )
        div( class='image data' )
            div( class='image-div' )
                img( class='image' :src='item.poster' )

        div( class='name data' )
            h3( class='name-text' ) {{ item.source.name }}
            p( class='selected-option' ) {{ spec.name }}: {{ spec.options[item.option].name }}
        div( class='count data' ) {{ item.count }} {{ item.source.unit }}
        div( class='price data' ) {{ price.toLocaleString("ru-RU") }} руб
        div( class='build data' ) {{ item.source.build ? 'Да' : 'Не требуется' }}
        div( class='total data' ) {{ item.total.toLocaleString("ru-RU") }} руб
        div( class='actions' ) 
            i( class='icon icon-trash' @click='$emit("remove", index)' )

</template>

<script>
export default {
    props: ['item', 'index'],
    data: function () {
        var item = this.item.source
        
        return {
            spec: item.specs[0],
            price: item.prices.mins[this.item.option],
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
        height 180px
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
</style>
