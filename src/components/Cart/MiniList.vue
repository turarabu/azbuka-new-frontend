<template lang="pug">
    div( class='cart-items-mini-list' )
        Confirm( v-bind='{ question }' @answer='answer' )

        span( class='remove-all' @click='removeAll' )
            span( class='text' ) Очистить корзину
            i( class='icon icon-trash' )

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
    computed: { cart },
    components: { Confirm, MiniItem },
    methods: { remove, removeAll, answer, confirm },
    data: function () {
        return {
            question: false,
            waiting: false
        }
    }
}

// Computed
function cart () {
    return this.$store.state.cart
}

// Methods
async function remove (id) {
    var check = await this.confirm('Удалить товар из корзины?')

    if ( check === true )
        this.$store.commit('remove-cart', id)
}

async function removeAll () {
    var check = await this.confirm('Очистить корзину?')

    if ( check === true ) {
        console.log(check)
        this.$store.commit('clear-cart')
        console.log(this.$store.state.cart)
    }
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
    padding-top 32px
    position relative

    .remove-all
        align-items center
        display inline-flex
        font-size 18px
        position absolute
        right 40px
        top -5px

        .text
            color $dark-gray
            display inline-block
            margin 0 8px
            position relative
            top -4px

        .icon-trash
            color $red
            display inline-block
            font-size 20px
            margin 0 4px

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
