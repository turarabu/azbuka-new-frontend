<template lang="pug">
    label( class='select-label' )
        span( class='label-text' ) {{ value.label }}
        select( class='select' v-model='current' @input='set' )
            option( v-for='(option, index) in value.options' :value='index' ) {{ option }}
</template>

<script>
export default {
    props: ['value'],
    methods: { set },
    data: function () {
        return {
            current: this.value.current
        }
    }
}

function set () {
    this.$emit('input', this.current)
}
</script>

<style lang="stylus">
.select-label
    display block
    margin 12px 0
    width 100%

    .label-text
        display block
        font-size 18px
        margin 4px 18px

    .select
        border 1px solid
        border-radius 25px
        font-size 16px
        margin 4px 0
        outline none
        padding 8px 16px
        width 100%
</style>
