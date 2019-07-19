<template lang="pug">
    div( class='cart-items-mini-list' :class='{ mini }' )
        div( v-if='cart.length > 0' )
            div( class='row head' )
                div( class='image data' ) Фото товара
                div( class='name data' ) Название
                div( class='count data' ) Количество
                div( class='price data' ) Цена
                div( class='actions data' ) 

            MiniItem(
                v-for='(item, index) in cart'
                v-bind='{ index, item }'
                :key='index'
                @remove='remove' )
</template>

<script>
import MiniItem from '@/components/Cart/MiniItem.vue'

export default {
    props: ['cart', 'mini'],
    components: { MiniItem },
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

.cart-items-mini-list
    margin 32px 16px

    .row
        align-items center
        border-bottom 1px dashed lighten($dark-gray, 20)
        display flex
        justify-content space-between
        padding 16px 0
        width 100%
        &.head .data
            color lighten($dark-gray, 20)
            font-size 18px
            font-weight 500
            text-align center
            &.name
                text-align left

        .image
            width 150px

        .name
            width 500px

        .price
            width 150px

        .count
            width 170px

        .actions
            width 80px
</style>
