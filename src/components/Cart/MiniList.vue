<template lang="pug">
    div( class='cart-items-mini-list' :class='{ mini }' )
        Confirm( v-bind='{ question }' @answer='answer' )

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
import Confirm from '@/components/Cart/Confirm.vue'
import MiniItem from '@/components/Cart/MiniItem.vue'

export default {
    props: ['cart', 'mini'],
    components: { Confirm, MiniItem },
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
        this.$store.commit('clear-cart', id)
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

.cart-items-mini-list
    margin 32px 16px
    position relative

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

        .count-cart
            width 180px

        .actions
            width 80px
</style>
