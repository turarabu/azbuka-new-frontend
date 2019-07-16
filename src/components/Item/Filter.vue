<template lang="pug">
    div#filter( :class='{ show }' v-if='render === true' )
        //- div( class='filter-row' )
            //- h3( class='title' ) Цена
            //- FilterRange( min=0 max=500000 @changed='changed' name='prices' )

        div( v-for='filter in catalog.filters'
            v-if='filter.type === "range"'
            class='filter-row' )

            h3( class='title' ) {{ filter.name }}
            FilterRange( :value='filter' @input='setFilter' )

            //- FilterOptions( v-if='filter.type === "select"' :value='filter' @input='setFilter'  )

        button( class='apply' @click='applyFilter' ) Показать товары

</template>

<script>
import FilterRange from '@/components/Filter/Range.vue'
import FilterOptions from '@/components/Filter/Options.vue'

export default {
    props: ['catalog'],
    computed: { show },
    components: { FilterRange, FilterOptions },
    methods: { setFilter, applyFilter, forceRender },
    mounted: init,
    data: function () {
        console.log(this.catalog)
        return {
            render: true,
            list: {}
        }
    }
}

// Computed
function show () {
    return this.$store.state.filter
}

// Mounted
function init () {
    var events = ['clear-search']

    this.$store.subscribe((mutation, state) => {
        if ( events.includes(mutation.type) ) {
            this.list = {}
            return this.forceRender()
        }
    })
}

// Methods
function setFilter (event) {
    this.list[ event.prop ] = event
}

function applyFilter () {
    for ( let key of Object.keys(this.list) ) {
        this.$store.commit('set-search', {
            prop: key,
            value: this.list[key]
        })
    }
}

function forceRender () {
    this.render = false
    this.$nextTick(() => {
        this.render = true
    })
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

    .filter-row
        margin-bottom 42px

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
