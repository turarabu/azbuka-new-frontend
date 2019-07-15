<template lang="pug">
    div( v-if='spec.options.length > 0' class='item-options-block' )
        h3( class='title' ) Выберите {{ spec.name }}

        div( class='options-select-div' )
            i( class='icon icon-angle-down' )
            select( class='options-select' v-model='selected' @change='change' )
                option( v-for='(o, i) in spec.options' :value='i' ) {{ o.name }}
</template>

<script>
export default {
    props: ['item', 'value'],
    computed: { spec },
    methods: { change },
    mounted: init,
    data: function () {
        return {
            selected: this.value
        }
    }
}

// Mounted
function init () {
    if ( this.spec.options.length === 0 )
        return this.$emit('input', 0)
}

// Computed
function spec () {
    return this.item.specs[0]
}

// Methods
function change () {
    return this.$emit('input', this.selected)
}
</script>

<style lang="stylus">
.item-options-block
    margin 16px 0

    .options-select-div
        margin 8px 0
        position relative
        width 300px

    .options-select
        appearance none
        background transparent
        border 1px solid
        border-radius 50px
        font-size 16px
        font-weight 500
        outline none
        padding 6px 38px 6px 16px
        width 100%

    .icon
        font-size 20px
        position absolute
        right 12px
        top 6px

</style>
