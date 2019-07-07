<template lang="pug">
    nav( class='nav' )
        div( class='block' )
            router-link(
            v-for='nav in catalog(0)'
            class='link'
            :key='nav.id'
            :to='`/catalog/${ nav.id }`'
            )
                    i( :class='[`icon`, `icon-${ nav.icon }`]' )
                    span {{ nav.name }}

</template>

<script>
export default {
    methods: { catalog }    
}

function catalog (level) {
    var list = []

    for (let nav of this.$store.state.catalog) {
        if (nav.level == level)
            list.push(nav)
    }

    return list
}
</script>

<style lang="stylus">
@import '~@/style/palette'

.nav
    background $red    
    margin-top 16px
    position relative
    z-index 2

    .block
        display flex
        justify-content space-between

    .link
        color $white
        font-size 18px
        padding 12px 0
</style>
