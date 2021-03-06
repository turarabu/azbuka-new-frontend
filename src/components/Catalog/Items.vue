<template lang="pug">
    div( class='block-div block' )
        div( class='search-results' v-if='filtered.length < catalog.items.length' )
            span( class='your-request' ) По вашему запросу:
                span( class='query-text' ) {{ search.name && search.name.text }}

            div( v-if='filtered.length === 0' )
                p( class='found-text'  ) Ничего не найдено
                img( class='empty-filter' src='/images/empty-filter.jpg' @click='clearFilter' )
            p( class='found-text' v-else ) Найдены следующие товары:

        SortBlock( :value='sort' @input='updateItems' )

        div( class='catalog-items' :class='{small: $store.state.filter === true}' )
            ItemCollection(
                v-if='filtered.length === catalog.items.length'
                v-for='collection in catalog.collections'
                :collection='collection'
                :key='collection.id' )

            ItemCard( v-for='item in filtered' :key='item.id' :item='item' )

        ItemsFilter( :catalog='catalog' )
</template>

<script>
import help from '@/script/script'

import SortBlock from '@/components/Catalog/Sort.vue'
import ItemCard from '@/components/Item/Card.vue'
import ItemCollection from '@/components/Item/Collection.vue'
import ItemsFilter from '@/components/Item/Filter.vue'

export default {
    props: ['catalog'],
    components: { SortBlock, ItemCard, ItemCollection, ItemsFilter },
    computed: { search },
    methods: { clearFilter, updateItems, getItems },
    mounted: init,
    data: function () {
        return {
            show: true,
            filtered: [],
            sort: {
                type: 'name',
                direction: 'desc'
            }
        }
    }
}

// Computed
function search () {
    return this.$store.state.search
}

// Mounted
function init () {
    var events = ['set-search', 'clear-search']
    var filters = Object.values(this.search)
    var filtered = help.filter.items(this.catalog.items, filters)

    this.filtered = this.getItems(filtered)
    console.log('filtered items', this.filtered)

    this.$store.subscribe((mutation, state) => {
        if ( events.includes(mutation.type) ) {
            var filters = Object.values(this.search)
            var filtered = help.filter.items(this.catalog.items, filters)

            this.filtered = this.getItems(filtered)

            return this.$forceUpdate()
        }
    })
}

// Methods
function clearFilter () {
    this.$store.commit('clear-search')
}

function updateItems (sort) {
    var filters = Object.values(this.search)
    var filtered = help.filter.items(this.catalog.items, filters)
    
    this.sort = sort
    this.filtered = this.getItems(filtered)
}

function getItems(items) {
    return help.filter.sort(items, this.sort)
}
</script>

<style lang="stylus">
@import '~@/style/palette'

.block-div
    position relative

.catalog-items
    display grid
    grid-row-gap 24px
    grid-template-columns 440px 440px 440px 440px
    justify-content space-between
    position relative
    width 100%
    &.small
        grid-template-columns 340px 340px 340px 340px
        width calc(100% - 420px)

.search-results
    margin-bottom 16px

    .your-request
        display block
        font-size 20px
        font-weight 500
        margin-left 8px
        text-transform uppercase

        .query-text
            color lighten($dark-gray, 15)
            display inline-block
            margin-left 8px

    .found-text
        border-bottom 1px dashed
        display inline-block
        font-size 18px
        padding 4px 2px
        margin 6px

    .empty-filter
        display block
        margin 32px
        position absolute
        width 420px
</style>
