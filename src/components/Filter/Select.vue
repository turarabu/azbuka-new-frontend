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
@import '~@/style/palette'

.select-label
    display block
    margin 6px 0

    .label-text
        display block
        font-size 18px
        margin 6px 2px 6px 18px

    .select
        border 1px solid lighten($dark-gray, 15)
        border-radius 25px
        font-size 16px
        padding 6px 16px
        outline none
        width 220px
</style>
