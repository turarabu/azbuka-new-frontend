<template lang="pug">
    div( class='block-div block' )
        div( class='search-results' v-if='filtered.length < items.length' )
            span( class='your-request' ) По вашему запросу:
                span( class='query-text' ) {{ search.name && search.name.value }}

            div( v-if='filtered.length === 0' )
                p( class='found-text'  ) Ничего не найдено
                img( class='empty-filter' src='/images/empty-filter.jpg' )
            p( class='found-text' v-else ) Найдены следующие товары:

        div( class='catalog-items' :class='{small: $store.state.filter === true}' )
            ItemCollection(
                v-if='filtered.length === items.length'
                v-for='collection in collections'
                :collection='collection'
                :key='collection.id' )

            ItemCard( v-for='item in filtered' :key='item.id' :item='item' )

        ItemsFilter( :catalog='catalog' )
</template>

<script>
import help from '@/script/script'

import ItemCard from '@/components/Item/Card.vue'
import ItemCollection from '@/components/Item/Collection.vue'
import ItemsFilter from '@/components/Item/Filter.vue'

export default {
    props: ['catalog'],
    components: { ItemCard, ItemCollection, ItemsFilter },
    computed: { search },
    mounted: init,
    data: function () {
        this.$nextTick(() => {
            if ( Object.values(this.search).length > 0 )
                this.filtered = help.filter.items(this.items, Object.values(this.search))
            
            else this.filtered = this.items

            this.$forceUpdate()
        })
        
        return Object.assign(this.catalog, {
            show: true,
            filtered: []
        })
    }
}

// Computed
function search () {
    return this.$store.state.search
}

function init () {
    this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'set-search') {
            this.filtered = help.filter.items(this.items, Object.values(this.search))
            return this.$forceUpdate()
        }
    })
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
