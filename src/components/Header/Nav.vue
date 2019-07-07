<template lang="pug">
    nav( class='nav' )
        div( class='block' )
            router-link(
            v-for='nav in catalog(0)'
            class='link'
            :key='nav.id'
            :to='`/catalog/${ nav.id }`'
            )
                    i( class='icon' :class='`icon-${ nav.icon }`' )
                    span( class='text' ) {{ nav.name }}

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
        align-items center
        display flex
        justify-content space-between

    .icon
        display inline-block
        font-size 24px
        margin-right 6px
        position relative
        top 4px
        &.icon-softFurniture
            font-size 28px
            top 6px

    .link
        color $white
        font-size 20px
        font-weight 300
        padding 12px 0
        position relative
        top -2px

        .text
            position relative
            // top -2px
</style>
