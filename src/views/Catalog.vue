<template lang="pug">
    div#catalog
        span( class='id' ) {{ id }}
        CatalogItems( v-if='getNav.level > 1' :parent='getNav' )
        CatalogChilds( v-else :parent='getNav' )

</template>

<script>
import CatalogItems from '@/components/Catalog/Items.vue'
import CatalogChilds from '@/components/Catalog/Childs.vue'

export default {
    props: ['id'],
    components: { CatalogItems, CatalogChilds },
    computed: { getNav },
    updated: function () {
        // console.log(this.id)
    }
}

// Computed
function getNav () {
    for (let nav of this.$store.state.catalog) {
        if (this.id === nav.id)
            return nav
    }
}
</script>

<style lang="stylus">
#catalog

    .id
        display none
</style>
