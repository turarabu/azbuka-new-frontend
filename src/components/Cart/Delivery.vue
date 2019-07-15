<template lang="pug">
    div( class='cart-delivery-div' )
        div( class='delivery-column' )
            h3( class='step-title' ) Сборка и доставка
            div( class='delivery-params' )
                RadioInput( name='delivery' :options='delivery.options' v-model='delivery.selected' )

                div( v-if='delivery.selected > 0' )
                    h3( class='column-title' ) Адрес доставки
                    SelectInput( label='Выберите регион' :options='address.region.options' v-model='address.region.selected' )
                    TextInput( label='Улица' v-model='address.street' placeholder='Например: Шепеткова' )
                    TextInput( label='Дом' v-model='address.building' placeholder='Например: 37' )
                    TextInput( label='Квартира' v-model='address.home' placeholder='Например: 2' )
                    TextInput( label='Домофон' v-model='address.dphone' placeholder='Номер если есть' )
                    div( v-if='delivery.selected > 1' name='lift' )
                        br
                        span( class='lift-label-text' ) Лифт
                        RadioInput(
                            v-model='address.lift.selected'
                            :options='address.lift.options' )

        div( class='delivery-column' v-if='delivery.selected > 0' )
            h3( class='step-title' ) Доставка
            SelectInput( label='Дата доставки' :options='delivery.availableDates' v-model='delivery.date' )
            p( class='row-text' )
                 span( class='label-text' ) Стоимость доставки
                 span( class='text' ) 2432 рублей

        div( class='delivery-column' v-if='delivery.selected > 0' )
            h3( class='step-title' ) Сборка
            RadioInput( :options='build.options' v-model='build.selected' )
            div( v-if='build.selected > 0' )
                SelectInput( label='Дата доставки' :options='delivery.availableDates' v-model='delivery.date' )
                p( class='row-text' )
                    span( class='label-text' ) Стоимость сборки
                    span( class='text' ) 2432 рублей

                
</template>

<script>
import RadioInput from '@/components/Filter/Radio.vue'
import SelectInput from '@/components/Filter/Select.vue'
import TextInput from '@/components/Filter/Text.vue'

export default {
    components: { RadioInput, SelectInput, TextInput },
    methods: {  },
    data: function () {
        return {
            build: {
                include: 0,
                selected: 0,
                date: 0,
                dates: ['17 Июля', '18 Июля', '18 Июля', '19 Июля', '18 Июля'],
                options: ['Без сборки', 'Добавить сборку']
            },

            delivery: {
                date: 0,
                selected: 0,
                availableDates: ['16 Июля', '17 Июля', '18 Июля', '18 Июля', '19 Июля'],
                options: ['Самовывоз', 'Доставка до подъезда', 'Доставка в квартиру']
            },

            address: {
                street: '',
                building: '',
                home: '',
                dphone: '',
                lift: {
                    selected: 0,
                    options: ['Нет', 'Пассажирский', 'Грузовой']
                },

                region: {
                    selected: 0,
                    options: ['Первый регион', 'Второй регион']
                }
            }
        }
    }
}

</script>

<style lang="stylus">
.cart-delivery-div
    align-items top
    display grid
    grid-template-columns 300px 300px 300px
    justify-content center
    margin 64px 0
    padding-left 136px

    .column-title
        margin-top 16px

    .lift-label-text
        display block
        font-size 18px
        margin 6px 2px
</style>
