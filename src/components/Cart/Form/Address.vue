<template lang="pug">
    div( v-if='type > 0' class='address-div' )
        h3( class='columnt-title' ) Адрес доставки

        div( v-for='(input, index) in formOne' class='box' :key='input.name' )
            Select( v-if='input.type == "select"' :value='input' @input='set($event, index, "one")' )
            Input( v-if='input.type == "input"' :value='input' @input='set($event, index, "one")' )

        div( v-if='type > 1' v-for='(input, index) in formTwo' class='box' :key='input.name' )
            Input( v-if='input.type == "input"' :value='input' @input='set($event, index, "two")' )
            Options(
                v-if='input.type == "options"'
                :options='input.options'
                :value='input.current'
                :label='input.label'
                @input='set($event, index, "two")' )
        
</template>

<script>
import Select from '@/components/UI/Select.vue'
import Input from '@/components/UI/Input.vue'
import Options from '@/components/Filter/Options.vue'

export default {
    props: ['value', 'services', 'type'],
    components: { Select, Input, Options },
    methods: { set, setHandler, check, status },
    mounted: init,
    data: function () {
        return {
            complete: this.value,
            formOne: [
                {
                    name: 'region',
                    type: 'select',
                    label: 'Выберите регион',
                    current: 0,
                    options: getLocales(this.services),
                },

                {
                    name: 'street',
                    type: 'input',
                    label: 'Улица',
                    text: '',
                    required: true,
                    placeholder: 'Например, Шепеткова'
                },

                {
                    name: 'building',
                    type: 'input',
                    label: 'Дом',
                    text: '',
                    required: true,
                    placeholder: 'Например, 37'
                }
            ],

            formTwo: [
                {
                    name: 'home',
                    type: 'input',
                    label: 'Квартира',
                    text: '',
                    placeholder: 'Например, 2',
                    required: true
                },
                
                {
                    name: 'floor',
                    type: 'input',
                    label: 'Этаж',
                    required: true,
                    text: '1',
                },

                {
                    name: 'dphone',
                    type: 'input',
                    label: 'Домофон',
                    text: '',
                    placeholder: 'Если есть'
                },
                
                {
                    name: 'lift',
                    type: 'options',
                    label: 'Лифт',
                    current: 0,
                    options: ['Нет', 'Пассажирский', 'Грузовой']
                }
            ]
        }
    }
}

// Mounted
function init () {
    this.check()
}

// Methods
function set (value, index, form) {
    if ( form == 'one' )
        this.setHandler(this.formOne, value, index)
    else if ( form == 'two' )
        this.setHandler(this.formTwo, value, index)
}

function setHandler (form, value, index) {
    if ( form[index].type == 'input' )
        form[index].text = value
    else if (  form[index].type == 'select' )
        form[index].current = value
    else if (  form[index].type == 'options' )
        form[index].current = value
    
    return this.check()
}

function check () {
    var pass = true

    for ( let input of this.formOne ) {
        if ( input.required === true ) {
            if ( checkForValue(input) === false )
                pass = false
        }
    }

    if ( this.type > 1 ) {
        for ( let input of this.formTwo ) {
            if ( input.required === true ) {
                if ( checkForValue(input) === false )
                    pass = false
            }
        }
    }

    return this.status(pass)
}

function status (pass) {
    this.$emit('input', {
        pass,
        form: clones(this.formOne, this.formTwo)
    })
}

// Helper functions
function clones (...arrays) {
    var result = []

    for ( let arr of arrays ) {
        for ( let obj of arr )
            result.push(JSON.parse( JSON.stringify(obj) ))
    }

    console.log('clones', result)
    return result
}

function checkForValue (input) {
    switch (input.type) {
        case 'input':
            return input.text.length > 0

        case 'select':
            return input.current === undefined

        case 'options':
            return input.current === undefined
    }
}

function getLocales (services) {
    var locales = []

    for ( let service of services ) {
        if ( service.name.toUpperCase() === 'ДОСТАВКА' )
            locales.push( service.locality )
    }

    return locales
}

</script>

<style lang="stylus">
.address-div
    display block
    margin 16px 0

</style>
