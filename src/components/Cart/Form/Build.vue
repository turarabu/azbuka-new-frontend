<template lang="pug">
    div( class='build-column column' )
            h3( class='column-title' )
                span( class='red' ) 03
                span / Сборка

            DatePicker( :value='dates' @input='setDate' )
            div( class='row' )
                span( class='bold' ) Стоимость сборки:
                span( class='price' ) {{ price().toLocaleString('ru-RU') }} рублей
</template>

<script>
import DatePicker from '@/components/UI/DatePicker.vue'

export default {
    props: ['value', 'services', 'address', 'type'],
    components: { DatePicker },
    computed: { cart },
    methods: { price, setDate, getDates, getBuildPrice },
    data: function () {
        return {
            dates: {
                label: 'Дата сборки:',
                options: this.getDates()
            }
        }
    }
}

// Computed
function cart () {
    return this.$store.state.cart
}

// Methods
function price () {
    var result = 0
    var price = this.getBuildPrice()
    for ( let item of this.cart )
        result += Math.max(price.minPrice, item.source.prices.mins[item.option] * (price.percent / 100) ) * item.count
    
    return result
}

function setDate (event) {
    this.$emit('input', {
        date: event,
        price: this.price()
    })
}

function getDates () {
    var dates = []

    for ( let service of this.services ) {
        if ( service.name.toUpperCase() === 'СБОРКА' ) {
            let date = new Date(service.dateDay)
            dates.push([date, date])
        }
    }
    
    return dates
}

function getBuildPrice () {
    for ( let service of this.services ) {
        if ( service.name.toUpperCase() === 'СБОРКА' ) 
            return service
    }
}

</script>

<style lang="stylus">
.build-column

    .row
        display block
        margin 12px 0

        .bold
            font-size 18px
            font-weight bold

        .price
            display block
            font-size 22px
            margin 4px 0
</style>
