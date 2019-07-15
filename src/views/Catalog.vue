<template lang="pug">
    div#catalog
        CatalogItems( v-if='showItems' :catalog='catalog' :key='catalog.id' )
        CatalogChilds( v-else :catalog='catalog' )

</template>

<script>
import CatalogItems from '@/components/Catalog/Items.vue'
import CatalogChilds from '@/components/Catalog/Childs.vue'

export default {
    props: ['id'],
    components: { CatalogItems, CatalogChilds },
    computed: { catalog, showItems },
    updated: function () {
        console.log(this.catalog)
    }
}

// Computed
function catalog () {
    for (let catalog of this.$store.state.catalog) {
        if (this.id === catalog.id)
            return catalog
    }
}

function showItems () {
    var catalog = this.catalog
    return catalog && catalog.showItems === true || catalog.isCollection === true
}
</script>

<style lang="stylus">
#catalog

    .id
        display none
</style>
