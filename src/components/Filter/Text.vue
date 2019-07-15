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
.input-label
    display block
    margin 6px 0

    .label-text
        display block
</style>
