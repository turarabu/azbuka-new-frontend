<template lang="pug">
    label( class='input-label' )
        span( class='label-text' ) {{ value.label }}
        input( class='input' v-model='text' :placeholder='placeholder' @input='set' )
</template>


<script>
export default {
    props: ['value'],
    methods: { set },
    data: function () {
        return {
            text: this.value.text,
            placeholder: this.value.placeholder || ''
        }
    }
}

function set () {
    this.$emit('input', this.text)
}
</script>

<style lang="stylus" scoped>
@import '~@/style/palette'

.input-label
    display block
    margin 12px 0
    width 100%

    .label-text
        display block
        font-size 18px
        margin 4px 18px

    .input
        border 1px solid lighten($dark-gray, 15)
        border-radius 25px
        font-size 16px
        outline none
        padding 6px 16px
        width 100%
</style>

