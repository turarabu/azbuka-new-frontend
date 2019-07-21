<template lang="pug">
    div( class='cart-contact-div' )
        h3( class='step-title' ) Контакты

        TextInput( label='Телефон' v-model='c.contact.phone' placeholder='Введите' )
        TextInput( label='Фамилия' v-model='c.contact.lastName' placeholder='' )
        TextInput( label='Имя' v-model='c.contact.firstName' placeholder='' )
        TextInput( label='Почта' v-model='c.contact.email' placeholder='' )

        CheckBox( label='Получать рассылку' v-model='c.contact.spams' )
</template>

<script>
import TextInput from '@/components/Filter/Text.vue'
import CheckBox from '@/components/Filter/CheckBox.vue'

export default {
    components: { TextInput, CheckBox },
    computed: { c }
}

function c () {
    return this.$store.state.costumer
}
</script>

<style lang="stylus">
.cart-contact-div
    display block
    margin 32px auto
    width 700px

    .step-title
        margin-bottom 24px
        text-transform uppercase
</style>
