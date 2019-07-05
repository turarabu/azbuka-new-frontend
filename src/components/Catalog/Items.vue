<template lang="pug">
    div( class='block' )
        div( class='catalog-items' )
            ItemCard(
                v-for='item in getItems'
                :key='item.id'
                :item='item'
            )
</template>

<script>
import ItemCard from '@/components/Item/Card.vue'

export default {
    props: ['parent'],
    components: { ItemCard },
    computed: { getItems }
}

function getItems () {
    var list = []

    for (let item of this.$store.state.items) {
        // console.log(item)
        // if (item.parentId === this.parent.id)
        if( item.parentId == "00000000013" )
            list.push(item)
    }

    console.log(list)

    return list
}
</script>

<style lang="stylus">
.catalog-items
    display grid
    grid-row-gap 24px
    grid-template-columns 440px 440px 440px 440px
    justify-content space-between
    width 100%
</style>
