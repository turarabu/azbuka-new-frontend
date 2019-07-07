<template lang="pug">
    div#cart( class='block' )
        h3( class='title' ) Мои покупки
        div( class='steps-div' )
            span( class='step' :class='{active: step > 0}' ) Список товаров
            span( class='step' :class='{active: step > 1}' ) Сборка и доставка
            span( class='step' :class='{active: step > 2}' ) Контакты
            span( class='step' :class='{active: step > 3}' ) Бонусная карта

        table( class='items-table' )
            tr( class='head' )
                td( class='image data' ) Фото товара
                td( class='name data' ) Название
                td( class='count data' ) Количество
                td( class='price data' ) Цена
                td( class='build data' ) Сборка
                td( class='total data' ) Стоимость
                td( class='actions data' ) 

            CartItem( v-for='(item, index) in cart' :key='index' :item='item' @total='addTotal' )
        CartContinue( :total='total' :build='build' :discount='discount' :step='step' )
</template>

<script>
import CartItem from '@/components/Cart/Item.vue'
import CartContinue from '@/components/Cart/Continue.vue'

export default {
    props: ['step'],
    components: { CartItem, CartContinue },
    methods: { addTotal },
    computed: { cart },
    data: function () {
        return {
            total: 0,
            build: 0,
            discount: 0
        }
    }
}

function cart () {
    return this.$store.state.cart
}

// Methods
function addTotal (total) {
    console.log(total)
    this.total += total
}
</script>

<style lang="stylus">
@import '~@/style/palette'

#cart

    .title
        color lighten($dark-gray, 15)
        font-size 20px
        font-weight 500
        margin-bottom 24px
        text-align center

    .steps-div
        align-items center
        display flex
        justify-content center

        .step
            background $white
            border 1px solid $red
            border-radius 50px
            color $black
            padding 8px 16px
            margin-right 26px
            position relative
            &.active
                background $red
                color $white
            &:after
                color $black
                content '>'
                display inline-block
                position absolute
                right -18px
            &:last-child:after
                display none

    .items-table
        margin-top 32px
        width 100%

        .head .data
            border-bottom 1px dashed lighten($dark-gray, 15)
            color lighten($dark-gray, 15)
            font-size 16px
            padding 16px 0


        .data
            text-align center

        .image
            width 256px
        
        .name
            padding-left 32px
            width auto
        
        .count
            width 256px

        .price
            width 128px

        .build
            width 128px

        .total
            width 186px

        .actions
            width 64px
</style>
