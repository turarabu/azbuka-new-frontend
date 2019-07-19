<template lang="pug">
    div( class='cart-items-list' :class='{ mini }' )
        span( class='remove-all' @click='removeAll' )
            span( class='text' ) Очистить корзину
            i( class='icon icon-trash' )

        div( class='row head' )
            div( class='image data' ) Фото товара
            div( class='name data' ) Название
            div( class='count data' ) Количество
            div( class='price data' ) Цена
            div( class='build data' ) Сборка
            div( class='total data' ) Стоимость
            div( class='actions data' ) 

        CartItem( v-for='(item, index) in cart' v-bind='{ index, item }' :key='index' @remove='remove' )
        Confirm( v-bind='{ question }' @answer='answer' )
</template>

<script>
import Confirm from '@/components/Cart/Confirm.vue'
import CartItem from '@/components/Cart/Item.vue'

export default {
    props: ['cart', 'mini'],
    components: { Confirm, CartItem },
    methods: { remove, removeAll, answer, confirm },
    data: function () {
        return {
            question: false,
            waiting: false
        }
    }
}

async function remove (id) {
    var check = await this.confirm('Удалить товар из корзины?')

    if ( check === true )
        this.$store.commit('remove-cart', id)
}

async function removeAll () {
    var check = await this.confirm('Очистить корзину?')

    if ( check === true )
        this.$store.commit('clear-cart')
}

function answer (answer) {
    this.question = false

    if ( this.waiting === false )
        return
    
    else this.waiting(answer)
}

function confirm (question) {
    this.question = question

    return new Promise (resolve => {
        this.waiting = (answer) => {
            this.waiting = false
            return resolve(answer)
        }
    })
}
</script>

<style lang="stylus">
@import '~@/style/palette'

.cart-items-list
    margin 32px 0
    position relative
    &.mini
        margin 32px 16px

    .remove-all
        align-items center
        display inline-flex
        font-size 20px
        position absolute
        right 40px
        top -70px

        .text
            color $dark-gray
            display inline-block
            margin 0 8px
            position relative
            top -4px

        .icon-trash
            color $red
            display inline-block
            font-size 24px
            margin 0 4px

    .row
        align-items center
        border-bottom 1px dashed lighten($dark-gray, 20)
        display flex
        justify-content space-between
        padding 16px 0 20px 0
        width 100%
        &.head .data
            color lighten($dark-gray, 20)
            font-size 18px
            font-weight 500
            padding 12px
            text-align center

        .image
            width 180px

        .name
            width 800px

        .price, .build, .total
            width 150px

        .count, .count-cart
            width 170px

        .actions
            width 80px
</style>
