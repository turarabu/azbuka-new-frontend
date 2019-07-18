<template lang="pug">
    div( class='cart-mini-countinue-div' )
        span( class='total' ) Стоимость товаров:
            span( class='summ' ) {{ total.toLocaleString('ru-RU') }} руб

        div( class='buttons-div' )
            span( class='continue' @click='$emit("close")' ) Продолжить покупки
            router-link( tag='span' class='button' to='/cart/1' ) Оформить покупку

</template>

<script>
export default {
    props: ['cart'],
    computed: { total }
}

function total () {
    var total = 0
    for ( let item of this.cart )
        total += item.total

    return total
}
</script>

<style lang="stylus">
@import '~@/style/palette'

.cart-mini-countinue-div
    margin 32px

    .total
        color lighten($dark-gray, 15)
        font-size 18px
        font-weight 500

        .summ
            color $black
            display inline-block
            margin 0 8px

    .buttons-div
        align-items center
        display flex
        margin 24px 0

        .continue
            border-bottom 1px dashed
            display inline-block
            font-size 20px
            font-weight 500
            padding 2px

        .button
            background $red
            border none
            border-radius 25px
            color $white
            display inline-block
            font-size 20px
            font-weight 500
            margin 0 16px
            outline none
            padding 8px 24px
</style>
