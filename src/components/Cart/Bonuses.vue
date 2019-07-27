<template lang="pug">
    div( class='cart-bonuses-div' )
        h3( class='step-title' ) Бонусная карта

        img( class='image' src='/images/bonuses-card.png' )
        div( class='bonuses-text' )
            p( class='text' ) Товарищи! сложившаяся структура организации обеспечивает широкому кругу (специалистов) участие в формировании существенных финансовых и административных условий
            Input( :value='form.phone' @input='form.phone.text = $event' )
            button( v-if='inactive' class='button inactive' ) Проверяем...
            button( v-else class='button' @click='checkBonuses' ) Проверить

            p( class='row' )
                span( class='row-title' ) Балов на бонусной карте:
                span( class='row-text' ) {{ form.have.toLocaleString('ru-RU') }} рублей

            p( class='row' )
                span( class='row-title' ) Ваши бонусы с этой покупки:
                span( class='row-text' ) {{ cartCount().toLocaleString('ru-RU') }} рублей

            p( class='row' )
                span( class='row-title' ) Как вы хотите вопользоваться бонусами:
                Options(
                    v-model='form.use'
                    :options='form.useOptions'
                    :label='form.useText'
                    @click='checkOut' )

</template>

<script>
import Input from '@/components/UI/Input.vue'
import Options from '@/components/Filter/Options.vue'

export default {
    components: { Input, Options },
    computed: { cart },
    methods: { cartCount, checkBonuses, checkOut },
    data: function () {
        return {
            inactive: false,
            form: {
                have: 0,
                use: 0,
                useText: 'Как вы хотите воспользоваться бонусами:',
                useOptions: ['Накопить', 'Потратить'],
                phone: {
                    label: 'Телефон',
                    placeholder: 'Введите',
                    text: '+7',
                }
            }
        }
    }
}

// Computed
function cart () {
    return this.$store.state.cart
}

// Methods
function cartCount () {
    var total = 0

    for (let item of this.cart)
        total += item.total

    return parseInt(total / 10)
}

function checkBonuses () {
    if ( this.inactive === true )
        return false

    else {
        this.inactive = true
        this.form.have = 0
        return ajax(`cart/bonuse?phone=${ this.form.phone.text }`, async request => {
            var data = await handle(request)
            this.form.have = 123
            // this.form.have = data.bonusPoint

            this.checkOut()
            return this.inactive = false
        })
    }
}

function checkOut () {
    if ( this.form.use === 0 )
        this.$store.commit('pass-cart', {
            step: 3,
            value: {
                have: 0,
                use: 0
            }
        })

    else this.$store.commit('pass-cart', {
        step: 3,
        value: {
            have: this.form.have,
            use: 1
        }
    })

}

// Helper functions
function ajax (method, callback) {
    var request = new XMLHttpRequest()

    request.open('GET', `http://95.167.9.22:8081/${method}`, true)
    request.send()

    return callback(request)
}

function handle (request) {
    return new Promise(resolve => {
        request.addEventListener('readystatechange', event => {
            console.log('ready!')
            if (request.readyState === 4 && request.status === 200) {
                var json = JSON.parse(request.responseText)
                resolve({})
            }
        })
    })
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
        width 360px

        .text
            margin-bottom 24px
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
        &.inactive
            background lighten($red, 10)

    .row
        margin 12px 0

        .row-title
            font-size 16px
            font-weight 500
        
        .row-text
            display block
            font-size 18px
</style>
