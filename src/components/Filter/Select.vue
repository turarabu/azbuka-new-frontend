<template lang="pug">
    label( class='select-label' )
        span( class='label-text' ) {{ label }}
        select( class='select' v-model='selected' @change='change' )
            option( v-for='(option, index) in options' :value='index' ) {{ option }}
</template>

<script>
export default {
    props: ['label', 'options', 'value'],
    methods: { change },
    data: function () {
        return {
            selected: this.value
        }
    }
}

function change () {
    this.$emit('input', this.selected)
}
</script>

<style lang="stylus">
.select-label
    display block
    margin 6px 0

    .label-text
        display block
</style>
