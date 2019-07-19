<template lang="pug">
    div( class='cart-bonuses-div' )
        h3( class='step-title' ) Бонусная карта

        img( class='image' src='/images/bonuses-card.png' )
        div( class='bonuses-text' )
            p( class='text' ) Товарищи! сложившаяся структура организации обеспечивает широкому кругу (специалистов) участие в формировании существенных финансовых и административных условий
            TextInput( label='Телефон' v-model='bonuses.phone' placeholder='Введите' )
            button( class='button' ) Проверить

            p( class='row' )
                span( class='row-title' ) Балов на бонусной карте:
                span( class='row-text' ) 0 рублей

            p( class='row' )
                span( class='row-title' ) Ваши бонусы с этой покупки:
                span( class='row-text' ) 0 рублей

            p( class='row' )
                span( class='row-title' ) Как вы хотите вопользоваться бонусами:
                RadioInput(
                    v-model='bonuses.use'
                    :options='bonuses.options' )

</template>

<script>
import RadioInput from '@/components/Filter/Radio.vue'
import TextInput from '@/components/Filter/Text.vue'

export default {
    components: { RadioInput, TextInput },
    data: function () {
        return {
            bonuses: {
                phone: '+7',
                options: ['Накопить', 'Потратить'],
                use: 0
            }
        }
    }
}
</script>

<style lang="stylus">
@import '~@/style/palette'

.cart-bonuses-div
    display block
    margin 32px auto
    position relative
    width 700px

    .image
        position absolute
        top 0
        right 0
        width 300px

    .step-title
        margin-bottom 24px
        text-transform uppercase

    .bonuses-text
        display block

        .text
            margin-bottom 16px
            width 350px

    .button
        background $red
        border none
        border-radius 25px
        color $white
        font-size 18px
        margin 12px 0
        outline none
        padding 8px 24px

    .row
        margin 12px 0

        .row-title
            font-size 16px
            font-weight 500
        
        .row-text
            display block
            font-size 18px
</style>
