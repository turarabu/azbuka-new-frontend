<template lang="pug">
    div#filter( :class='{ show }' )
        div( class='line' )
            h3( class='title' ) Цена
            FilterRange( min=0 max=500000 @changed='changed' name='price' )

        button( class='apply' @click='applyFilter' ) Показать товары

</template>

<script>
import FilterRange from '@/components/Filter/Range.vue'

export default {
    props: ['catalog'],
    computed: { show },
    components: { FilterRange },
    methods: { changed, applyFilter },
    updated: function (...args) {
        console.log(...args)
    },
    data: function () {
        return {
            list: {}
        }
    }
}

// Computed
function show () {
    return this.$store.state.filter
}

// Methods
function changed (data) {
    this.list[ data.name ] = data
}

function applyFilter () {
    for (let prop of Object.keys(this.list)) {
        this.$store.commit('set-search', {
            prop: prop,
            value: this.list[prop]
        })
    }

    console.log(this.$store.state.search)
}
</script>

<style lang="stylus">
@import '~@/style/palette'

#filter
    box-shadow 0 0 0 RGBA(125, 125, 125, .5)
    opacity 0
    transition .3s step-start all
    padding 78px 0 0 24px
    position absolute
    top -78px
    right -400px
    min-height 500px
    height 100%
    width 340px
    &.show
        box-shadow -5px 0px 3px RGBA(125, 125, 125, .5)
        opacity 1
        right 36px
        transition .3s step-end all

    .apply
        background $red
        border none
        border-radius 50px
        color $white
        font-size 18px
        margin 24px 0
        outline none
        padding 16px
        width 340px
</style>
