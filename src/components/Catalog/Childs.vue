<template lang="pug">
    div( class='catalog-childs block' )
        CatalogCard(
            v-for='child in getChilds'
            :key='child.id'
            :catalog='child'
            :parent='catalog'
        )
            
</template>

<script>
import CatalogCard from '@/components/Catalog/Card.vue'

export default {
    props: ['catalog'],
    components: { CatalogCard },
    computed: { getChilds },
    methods: { echo },
    mounted: function () {
        
    }
}

function getChilds () {
    var list = []
    for (let child of this.$store.state.catalog) {
        // if (child.id === "0000058")
            // console.log(child.id)

        if (child.parentId === this.catalog.id)
            list.push(child)
    }
    // console.log(list)
    return list
}

function echo (child) {
    console.log(child)
}
</script>

<style lang="stylus">

.catalog-childs
    display grid
    grid-row-gap 24px
    grid-template-columns 580px 580px 580px
    justify-content space-between
</style>
