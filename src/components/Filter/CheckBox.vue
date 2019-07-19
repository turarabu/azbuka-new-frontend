<template lang="pug">
    label( class='checkbox-label' )
        input( class='input' type='checkbox' v-model='checked' @change='changed' )
        span( class='check-status' )
            span( class='icon' ) +
        span( class='check-text' ) {{ label }}
</template>

<script>
export default {
    props: ['label', 'value'],
    methods: { changed },
    data: function () {
        return {
            checked: this.value
        }
    }
}

function changed () {
    return this.$emit('input', this.checked)
}
</script>

<style lang="stylus">
@import '~@/style/palette'

.checkbox-label
    display block
    margin 16px 0
    width 100%
        
    .input
        display none
        &:checked ~ .check-status
            background $red

    .check-status
        align-items center
        background $white
        border 1px solid $red
        border-radius 50%
        color $white
        display inline-flex
        justify-content center
        margin-right 12px
        height 24px
        width 24px

        .icon
            color $white
            font-size 18px

    .check-text
        font-size 18px
</style>
