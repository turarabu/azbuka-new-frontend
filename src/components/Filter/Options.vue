<template lang="pug">
    div( class='label-div' )
        span( class='label-text' ) {{ labelText }}
        label( v-for='(option, index) in options' class='option-label' @click='set(index)' )
            input( class='input' type='radio' :value='index' :checked='index == current' )
            span( class='status-box' )
            span( class='option-text' ) {{ option }}
</template>

<script>
export default {
    props: ['options', 'value', 'label'],
    methods: { set },
    data: function () {
        return {
            current: this.value,
            labelText: this.label || ''
        }
    }
}

function set (index) {
    this.current = index
    this.$emit('input', this.current)
}
</script>

<style lang="stylus">
@import '~@/style/palette'

.label-div
    display block
    margin 12px 0

    .label-text
        display block
        font-size 18px
        font-weight 500
        margin 4px 0

    .option-label
        align-items center
        display flex
        margin 4px 0
        width 100%

        .status-box
            align-items center
            border 2px solid $red
            border-radius 50%
            display inline-flex
            justify-content center
            padding 3px
            height 18px
            width 18px
            &:after
                background $white
                border-radius inherit
                content ''
                display block
                height 100%
                width 100%

        .option-text
            display inline-block
            font-size 18px
            margin 0 6px

        .input
            display none
            &:checked ~ .status-box:after
                background $red

</style>
