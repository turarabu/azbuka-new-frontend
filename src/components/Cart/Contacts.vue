<template lang="pug">
    div( class='contact-div' )
        h3( class='columnt-title' ) Контакты

        div( v-for='(input, index) in form' class='box' :key='input.name' )
            Select( v-if='input.type == "select"' :value='input' @input='set($event, index)' )
            Input( v-if='input.type == "input"' :value='input' @input='set($event, index)' )
            Options(
                v-if='input.type == "options"'
                :options='input.options'
                :value='input.current'
                :label='input.label'
                @input='set($event, index)' )
        
</template>

<script>
import Select from '@/components/UI/Select.vue'
import Input from '@/components/UI/Input.vue'
import Options from '@/components/Filter/Options.vue'

export default {
    props: ['value', 'services', 'type'],
    components: { Select, Input, Options },
    methods: { set, check, status, getData },
    mounted: init,
    data: function () {
        return {
            pass: false,
            form: [
                {
                    name: 'phone',
                    type: 'input',
                    label: 'Телефон',
                    text: '+7',
                    required: true
                },

                {
                    name: 'lname',
                    type: 'input',
                    label: 'Фамилия',
                    text: '',
                    required: true
                },

                {
                    name: 'fname',
                    type: 'input',
                    label: 'Имя',
                    text: '',
                    required: true
                },

                {
                    name: 'email',
                    type: 'input',
                    label: 'Почта',
                    text: ''
                },
                
                {
                    name: 'sms',
                    type: 'options',
                    label: 'Подписка на рассылку',
                    current: 0,
                    options: ['Получать рассылки', 'Не получать рассылки']
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
function set (value, index) {
    if ( this.form[index].type == 'input' )
        this.form[index].text = value
    else if (  form[index].type == 'select' )
        this.form[index].current = value
    else if (  form[index].type == 'options' )
        this.form[index].current = value
    
    return this.check()
}


function check () {
    var pass = true

    for ( let input of this.form ) {
        if ( input.required === true ) {
            if ( checkForValue(input) === false )
                pass = false
        }
    }

    return this.status(pass)
}

function status (pass) {
    if ( pass === true )
        pass = this.getData()

    this.$store.commit('pass-cart', {
        step: 2,
        value: pass
    })
}

function getData () {
    var result = {}

    for ( let input of this.form )
        result[input.name] = JSON.parse( JSON.stringify(input) )
    
    return result
}

// Helper functions
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
</script>

<style lang="stylus">
.contact-div
    display block
    margin 32px auto
    width 675px

    .box
        width 500px
</style>


