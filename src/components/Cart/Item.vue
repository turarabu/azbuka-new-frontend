<template lang="pug">
    tr( class='cart-item' )
        td( class='image image-div border' )
            img( class='image' :src='`/images/dynamic/${ item.item.headImage }.jpg`' )
        
        td( class='name border' )
            span( class='bold' ) {{ item.item.name }}
            span( class='spec' ) {{ item.item.specs[0].name }}: {{ selected.name }}

        td( class='count border' ) {{ item.count }} {{ item.item.unit }}
        td( class='price border' ) {{ price() }} руб
        td( class='build border' ) {{ item.item.buildable ? 'Да' : 'Нет' }}
        td( class='total border' ) {{ price() * item.count }} руб
        td( class='actions border' )
            i( class='icon icon-trash' ) d
</template>

<script>
export default {
    props: ['item'],
    computed: { selected },
    mounted: init,
    methods: { price },
    data: function () {
        return {}
    }
}

function selected () {
    for (let option of this.item.item.specs[0].options) {
        if (option.id === this.item.selected)
            return option
    }
}

function price () {
    var list = []

    if (this.selected.prices.discounts.length === 0)
        return this.selected.prices.current

    else for (let discount of this.selected.prices.discounts) 
        list.push(this.selected.prices.current / ((100 - discount.discount) / 100))

    return Math.min(...list)
}

// Mounted
function init () {
    this.$emit('total', this.price() * this.item.count)
}
</script>

<style lang="stylus">
@import '~@/style/palette'

.cart-item

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
</style>
