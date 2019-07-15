<template lang="pug">
    div( class='label-div' )
        div( class='radio-label' v-for='(option, index) in options' @click='change(index)' )
            input( class='input' type='radio' :name='name' v-model='selected' :value='index' )
            span( class='radio-status' )
            span( class='radio-text' ) {{ option }}
</template>

<script>
export default {
    props: ['name', 'options', 'value'],
    methods: { change },
    data: function () {
        return {
            selected: this.value
        }
    }
}

function change (index) {
    this.selected = index
    this.$emit('input', index)
}
</script>

<style lang="stylus">
@import '~@/style/palette'

.radio-label
    align-items center
    display flex
    margin 4px 0

    .input
        display none
        &:checked ~ .radio-status:after
            background $red

    .radio-status
        border 1px solid $red
        border-radius 50%
        display inline-block
        overflow hidden
        padding 2px
        height 18px
        width 18px
        &:after
            background $white
            border-radius inherit
            content ''
            display block
            height 100%
            width 100%

    .radio-text
        display inline-block
        font-size 18px
        margin-left 6px
</style>
