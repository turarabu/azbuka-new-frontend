<template lang="pug">
    div( class='cart-contact-div' )
        h3( class='step-title' ) Контакты

        TextInput( label='Телефон' v-model='contact.phone' placeholder='Введите' )
        TextInput( label='Фамилия' v-model='contact.lastName' placeholder='' )
        TextInput( label='Имя' v-model='contact.firstName' placeholder='' )
        TextInput( label='Почта' v-model='contact.email' placeholder='' )

        CheckBox( label='Получать рассылку' v-model='contact.spams' )
</template>

<script>
import TextInput from '@/components/Filter/Text.vue'
import CheckBox from '@/components/Filter/CheckBox.vue'

export default {
    components: { TextInput, CheckBox },
    data: function () {
        return {
            contact: {
                phone: '+7',
                lastName: '',
                firstName: '',
                email: '',
                spams: true
            }
        }
    }
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
