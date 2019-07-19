<template lang="pug">
    div( class='to-next-step' )
        p( class='row' )
            span( class='key' ) Стоимость товаров:
            span( class='value' ) {{ total.toLocaleString('ru-RU') }} руб

        p( class='row' )
            span( class='key' ) Доставка и сборка:
            span( class='value' ) {{ build }} руб

        p( class='row' )
            span( class='key' ) Ваша скидка:
            span( class='value' ) {{ discount }} руб

        p( class='row' )
            span( class='key' ) Итого к оплате:
            span( class='value' ) {{ (total + build).toLocaleString('ru-RU') }} руб

        p( class='row' )
            button( class='next' @click='next' ) {{ step < 4 ? 'Далее' : 'Оформить покупку' }}
</template>

<script>
export default {
    props: ['step'],
    computed: { total, build, discount },
    methods: { next }
}

function total () {
    var total = 0
    for ( let item of this.$store.state.cart )
        total += item.total

    return total
}

function build () {
    return 0
}

function discount () {
    return 0
}

// Methods
function next () {
    if ( this.step < 4 )
        this.$router.push(`/cart/${ parseInt(this.step) + 1 }`)
}
</script>

<style lang="stylus">
@import '~@/style/palette'

.to-next-step
    align-items flex-end
    display flex
    flex-direction column
    margin-top 64px
    width 100%

    .row
        font-size 18px
        font-weight 500
        margin 2px 0
        width 500px

        .key
            color lighten($dark-gray, 15)
            display inline-block

        .value
            display inline-block
            margin 0 4px

        .next
            background $red
            border none
            border-radius 50px
            color $white
            font-size 18px
            margin 16px 0
            outline none
            padding 8px 16px
            width 200px
</style>
