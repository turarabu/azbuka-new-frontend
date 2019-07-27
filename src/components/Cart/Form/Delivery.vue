<template lang="pug">
    div( v-if='type > 0' class='delivery-column column' )
            h3( class='column-title' )
                span( class='red' ) 02
                span / Доставка

            DatePicker( :value='dates' @input='setDate' )
            div( class='row' )
                span( class='bold' ) Стоимость доставки:
                span( class='price' ) {{ price().toLocaleString('ru-RU') }} рублей
</template>

<script>
import DatePicker from '@/components/UI/DatePicker.vue'

export default {
    props: ['value', 'services', 'address', 'type'],
    components: { DatePicker },
    methods: { price, getDates, setDate, getRegions, getLift },
    data: function () {
        return {
            dates: {
                label: 'Дата доставки:',
                options: this.getDates()
            }
        }
    }
}

// Methods
function price () {
    var form = this.address.form
    var regions = this.getRegions()
    var rPrice = regions[ form[0].current ].price

    if ( this.type === 1 )
        return rPrice
    
    else {
        let lift = this.getLift()
        if ( form[6].current === 2 )
            return lift.price * 2 + rPrice
        
        else if ( isNaN( parseInt(form[4].text) ) === true )
            return lift.price + rPrice
        
        else return lift.price * parseInt(form[4].text) + rPrice
    }

}

function getDates () {
    var dates = []

    for ( let service of this.services ) {
        if ( service.name.toUpperCase() === 'ДОСТАВКА' ) {
            let date = new Date(service.dateDay)
            dates.push([date, date])
        }
    }
    
    return dates
}

function setDate (event) {
    this.$emit('input', {
        date: event,
        price: this.price()
    })
}

function getRegions () {
    var result = []

    for ( let service of this.services ) {
        if ( service.name.toUpperCase() === 'ДОСТАВКА' )
            result.push(service)
    }
    
    return result
}

function getLift () {
    for ( let service of this.services ) {
        if ( service.name.toUpperCase() === 'ПОДЪЕМ' )
            return service
    }
}

</script>

<style lang="stylus">
.delivery-column

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
