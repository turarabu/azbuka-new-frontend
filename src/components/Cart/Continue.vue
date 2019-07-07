<template lang="pug">
    div( class='to-next-step' )
        p( class='row' )
            span( class='key' ) Стоимость товаров:
            span( class='value' ) {{ total }} руб

        p( class='row' )
            span( class='key' ) Сборка:
            span( class='value' ) {{ build }} руб

        p( class='row' )
            span( class='key' ) Ваша скидка:
            span( class='value' ) {{ discount }} руб

        p( class='row' )
            span( class='key' ) Итого к оплате:
            span( class='value' ) {{ endTotal }} руб

        p( class='row' )
            button( class='next' @click='next' ) Далее
</template>

<script>
export default {
    props: ['total', 'build', 'discount', 'step'],
    computed: { endTotal },
    methods: { next }
}

function endTotal () {
    return this.total + this.build + this.discount
}

// Methods
function next () {
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
