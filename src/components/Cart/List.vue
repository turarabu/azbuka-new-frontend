<template lang="pug">
    div( class='cart-items-list' :class='{ mini }' )
        div( v-if='cart.length > 0' )
            div( class='row head' )
                div( class='image data' ) Фото товара
                div( class='name data' ) Название
                div( class='count data' ) Количество
                div( class='price data' ) Цена
                div( class='build data' ) Сборка
                div( class='total data' ) Стоимость
                div( class='actions data' ) 

            CartItem( v-for='(item, index) in cart' v-bind='{ index, item }' :key='index' @remove='remove' )
</template>

<script>
import CartItem from '@/components/Cart/Item.vue'

export default {
    props: ['cart', 'mini'],
    components: { CartItem },
    methods: { remove }
}

function remove (id) {
    var check = confirm('Удалить товар из корзины?')

    if ( check === true )
        this.$store.commit('remove-cart', id)
}
</script>

<style lang="stylus">
@import '~@/style/palette'

.cart-items-list
    margin 32px 0
    &.mini
        margin 32px 16px

    .row
        align-items center
        border-bottom 1px dashed lighten($dark-gray, 20)
        display flex
        justify-content space-between
        padding-bottom 8px
        width 100%
        &.head .data
            color lighten($dark-gray, 20)
            font-size 18px
            font-weight 500
            padding 16px 0
            text-align center

        .image
            width 180px

        .name
            width 800px

        .price, .build, .total
            width 150px

        .count, .actions
            width 80px
</style>
