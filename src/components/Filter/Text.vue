<template lang="pug">
    label( class='input-label' )
        span( class='label-text' ) {{ label }}
        input( class='input' v-model='text' v-bind='{placeholder}' @input='input' )
</template>

<script>
export default {
    props: ['value', 'placeholder', 'label'],
    methods: { input },
    data: function () {
        return {
            text: this.value
        }
    }
}

function input () {
    this.$emit('input', this.text)
}
</script>

<style lang="stylus">
@import '~@/style/palette'

.input-label
    display block
    margin 6px 0

    .label-text
        display block
        font-size 18px
        margin 6px 2px 6px 16px

    .input
        border 1px solid lighten($dark-gray, 15)
        border-radius 25px
        font-size 16px
        padding 6px 16px
        outline none
</style>
