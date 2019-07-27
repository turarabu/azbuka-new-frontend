<template lang="pug">
    div( class='datepicker-div' )
        span( class='label-text' ) {{ value.label }}
        div( class='input' @click='pick' )
            span {{ date }}
        
        div#delivery-date( style='margin-top: 5px' )
</template>

<script>
export default {
    props: ['value'],
    computed: { date },
    methods: { pick, setDefaults },
    mounted: init,
    data: function () {
        return {
            selected: '00 00 00'
        }
    }
}

// Computed
function date () {
    return this.selected
}

// Mounted
function init () {
    var DatePicker = tui.DatePicker
    DatePicker.localeTexts['Russian'] = getLocale()

    this.datepicker = new tui.DatePicker('#delivery-date', {
        language: 'Russian',
        type: 'date'
    })

    this.setDefaults()
    this.datepicker.on('change', () => {
        var date = this.datepicker.getDate()

        this.selected = getDateString(date)
        this.$emit('input', date.toISOString())
    })
}

// Methods
function pick () {
    this.datepicker.toggle()
}

function setDefaults () {
    var date = this.value.options[0][0]

    this.datepicker.setRanges(this.value.options)
    this.datepicker.setDate(date)

    this.selected = getDateString(date)
    this.$emit('input', date.toISOString())
}

// Helper functions
function getDateString (date) {
    return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

function getLocale () {
    return {
        titles: {
            DD: ['Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            D: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            MMM: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авн', 'Сен', 'Окт', 'Ноб', 'Дек'],
            MMMM: ['Январь', 'Феварль', 'Март', 'Апрель', 'Март', 'Июнь',
                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        },

        titleFormat: 'MMMM yyyy',
        todayFormat: 'Сегодня:  d MMMM, yyyy',
        time: 'Время',
        date: 'Дата'
    }
}

</script>

<style lang="stylus">

.datepicker-div
    display block
    margin 12px 0
    width 100%

    .label-text
        display block
        font-size 18px
        margin 4px 18px

    .tui-datepicker-input
        padding 8px 16px
        width 100%

    .input
        border 1px solid
        border-radius 25px
        display block
        font-size 16px
        padding 8px 16px
        width 100%


</style>
