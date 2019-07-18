<template lang="pug">
    div#stocks( class='block' )
        ItemCollection(
            v-for='collection in stock.collections'
            :collection='collection.source'
            :key='collection.id' )

        ItemCard(
            v-for='item in stock.items'
            :item='item.source'
            :key='item.id' )

</template>

<script>
import ItemCard from '@/components/Item/Card.vue'
import ItemCollection from '@/components/Item/Collection.vue'

export default {
    props: ['id'],
    components: { ItemCard, ItemCollection },
    computed: { stock },
    data: function () {
        this.$nextTick(function () {
            console.log( this.stock )
        })
        return {}
    }
}

// Computed
function stock () {
    for (let stock of this.$store.state.stocks) {
        if (this.id === stock.id)
            return stock
    }
}
</script>

<style lang="stylus">
#stocks
    display grid
    grid-row-gap 24px
    grid-template-columns 440px 440px 440px 440px
    justify-content space-between
    margin-bottom 156px
    position relative

    .id
        display none
</style>
