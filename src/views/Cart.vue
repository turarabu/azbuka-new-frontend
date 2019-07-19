<template lang="pug">
    div#cart( class='block' )
        div( v-if='cart.length === 0' class='empty-cart' )
            img( class='image' src='/images/empty-cart.png' )
            h3( class='empty-text' ) Ваша корзина пуста

        div( v-else )
            h3( class='title' )
                i( class='icon icon-piggy-bank' )
                span Мои покупки

            div( class='steps-div' )
                span( v-if='step < 1' class='step active' ) Список товаров
                router-link( v-else tag='span' class='step active' to='/cart/1' ) Список товаров

                span( v-if='step < 2' class='step' ) Сборка и доставка
                router-link( v-else tag='span' class='step active' to='/cart/2' ) Сборка и доставка

                span( v-if='step < 3' class='step' ) Контакты
                router-link( v-else tag='span' class='step active' to='/cart/3' ) Контакты

                span( v-if='step < 4' class='step' ) Бонусная карта
                router-link( v-else tag='span' class='step active' to='/cart/4' ) Бонусная карта

            ItemsList( v-if='step == 1' :cart='cart' )
            ItemsDelivery( v-if='step == 2' :cart='cart' )
            CartContacts( v-if='step == 3' :cart='cart' )
            CartBonuses( v-if='step == 4' :cart='cart' )
            
            CartContinue( :step='step' )
</template>

<script>

import ItemsList from '@/components/Cart/List.vue'
import ItemsDelivery from '@/components/Cart/Delivery.vue'
import CartContacts from '@/components/Cart/Contacts.vue'
import CartBonuses from '@/components/Cart/Bonuses.vue'
import CartContinue from '@/components/Cart/Continue.vue'

export default {
    props: ['step'],
    components: { ItemsList, ItemsDelivery, CartContacts, CartBonuses, CartContinue },
    computed: { cart },
    data: function () {
        return {}
    }
}

function cart () {
    return this.$store.state.cart
}
</script>

<style lang="stylus">
@import '~@/style/palette'

#cart
    margin-bottom 32px

    .empty-cart
        flex-direction column
        height 500px
        padding-top 32px
        text-align center

        .empty-text
            color $red
            font-size 24px
            font-weight 400
            margin 6px 0
            position relative
            left -4px

    .title
        align-items center
        color lighten($dark-gray, 15)
        display flex
        font-size 20px
        font-weight 500
        justify-content  center
        margin-bottom 24px

        .icon
            display inline-block
            font-size 32px
            margin 0 12px

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
