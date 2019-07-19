<template lang="pug">
    div#confirm( v-if='question' @click='checkClose' )
        div( class='question' )
            p( class='text' ) {{ question }}

            button( class='answer red' @click='answer(false)' ) Нет
            button( class='answer green' @click='answer(true)' ) Да
</template>

<script>
export default {
    props: ['question'],
    methods: { answer, checkClose }
}

function answer (answer) {
    this.$emit('answer', answer)
}

function checkClose (event) {
    if ( event.target === this.$el )
        return this.answer(false)
}
</script>

<style lang="stylus">
@import '~@/style/palette'

#confirm
    align-items center
    background RGBA(0, 0, 0, .25)
    display flex
    justify-content center
    position fixed
    bottom 0
    top 0
    left 0
    right 0
    z-index 20

    .question
        background $white
        box-shadow 0 0 10px RGBA(25, 25, 25, .5)
        display block
        padding 48px 32px
        text-align center
        width 560px

        .text
            font-size 24px
            font-weight 400
            margin-bottom 56px

        .answer
            border none
            color $white
            display inline-block
            font-size 20px
            margin 0 16px
            outline none
            padding 16px 48px
            &.red
                background $red
            &.green
                background rgba(39,174,96 ,1)

</style>
