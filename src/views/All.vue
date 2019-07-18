<template lang="pug">
    div#all
        div( class='catalog-childs block' )
            CatalogCard(
                v-for='child in getChilds'
                :key='child.id'
                :catalog='child'
            )
            
</template>

<script>
import CatalogCard from '@/components/Catalog/Card.vue'

export default {
    components: { CatalogCard },
    computed: { getChilds }
}

function getChilds () {
    var list = []

    for ( let child of this.$store.state.catalog ) {
        if (child.level == 0)
            list.push(child)
    }

    return list
}

</script>

<style lang="stylus">
#all
    margin-bottom 156px

    .catalog-childs
        display grid
        grid-row-gap 24px
        grid-template-columns 580px 580px 580px
        justify-content space-between
</style>
