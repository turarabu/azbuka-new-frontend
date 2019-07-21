<template lang="pug">
    div( class='cart-delivery-div' )
        div( class='delivery-column' )
            h3( class='step-title' )
                span( class='red' ) 01/
                span Сборка и доставка
            div( class='delivery-params' )
                RadioInput( name='delivery' :options='c.delivery.options' v-model='c.delivery.selected' )

                div( v-if='c.delivery.selected > 0' )
                    h3( class='column-title' ) Адрес доставки
                    SelectInput( label='Выберите регион' :options='c.address.region.options' v-model='c.address.region.selected' )
                    TextInput( label='Улица' v-model='c.address.street' placeholder='Например: Шепеткова' )
                    TextInput( label='Дом' v-model='c.address.building' placeholder='Например: 37' )
                    TextInput( label='Квартира' v-model='c.address.home' placeholder='Например: 2' )
                    TextInput( label='Домофон' v-model='c.address.dphone' placeholder='Номер если есть' )
                    div( v-if='c.delivery.selected > 1' name='lift' )
                        TextInput( label='Этаж' v-model='c.address.floor' placeholder='' )
                        span( class='lift-label-text' ) Лифт
                        RadioInput(
                            v-model='c.address.lift.selected'
                            :options='c.address.lift.options' )

        div( class='delivery-column' v-if='c.delivery.selected > 0' )
            h3( class='step-title' ) 
                span( class='red' ) 02/
                span Доставка
            SelectInput( label='Дата доставки' :options='c.delivery.availableDates' v-model='c.delivery.date' )
            p( class='row-text' )
                 span( class='label-text' ) Стоимость доставки:
                 span( class='text' ) 
                    span( v-if='!(c.delivery.selected > 1 && c.address.lift.selected !== 2)' ) 970 рублей
                    span( v-else ) {{ c.address.floor * 20 + 950 }} рублей

        div( class='delivery-column' )
            h3( class='step-title' ) 
                span( class='red' ) 03/
                span Сборка
                
            SelectInput( label='Дата сборки' :options='c.build.options' v-model='c.delivery.date' )
            p( class='row-text' )
                span( class='label-text' ) Стоимость сборки:
                span( class='text' ) {{ buildCount().toLocaleString('ru-RU') }} рублей
                
</template>

<script>
import RadioInput from '@/components/Filter/Radio.vue'
import SelectInput from '@/components/Filter/Select.vue'
import TextInput from '@/components/Filter/Text.vue'

export default {
    components: { RadioInput, SelectInput, TextInput },
    computed: { c, cart },
    methods: { buildCount }
}

// Computed
function cart () {
    return this.$store.state.cart
}

function c () {
    return this.$store.state.costumer
}

// Methods
function buildCount () {
    var total = 0

    for (let item of this.cart)
        total += Math.max(600, item.total * 0.05)

    return parseInt(total)
}

</script>

<style lang="stylus">
@import '~@/style/palette'

.cart-delivery-div
    align-items top
    display grid
    grid-template-columns 300px 300px 300px
    justify-content center
    margin 64px 0
    padding-left 136px

    .step-title .red
        color $red

    .column-title
        margin-top 16px

    .lift-label-text
        display block
        font-size 18px
        margin 12px 2px

    .row-text
        display block
        font-size 18px
        font-weight 500
        margin 16px 0

        .text
            display block
            font-size 20px
            font-weight 400
</style>
