<template lang="pug">
    div( class='filter-options-div' )
        label( class='filter-option' v-for='option in value.options' )
            input( class='input' type='checkbox' @change='changed(option)' )
            span( class='check-status' )
                span( class='icon' ) +
            span( class='check-text' ) {{ option }}
</template>

<script>
export default {
    props: ['value'],
    methods: { changed },
    data: function () {
        return {
            checked: []
        }
    }
}

function changed (option) {
    if (this.checked.includes(option) === false) 
        this.checked.push(option)

    else for (let i in this.checked) {
        if (this.checked[i] === option) {
            this.checked.splice(i, 1)
            break
        }
    }

    return this.$emit('input', clones(this.value, {
        value: this.checked
    }))
}

function clones (...objs) {
    var list = []

    for ( let obj of objs )
        list.push(JSON.parse( JSON.stringify(obj) ))

    return Object.assign({}, ...list)
}
</script>

<style lang="stylus">
@import '~@/style/palette'

.filter-options-div
    display block
    width 100%

    .filter-option
        align-items center
        display flex
        margin 12px 0
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
