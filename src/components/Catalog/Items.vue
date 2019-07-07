<template lang="pug">
    div( class='block' v-if='show === true' )
        div( class='search-results' v-if='excluded > 0' :class='{show: excluded > 0}' )
            span( class='your-request' ) По вашему запросу:
                span( class='query-text' ) {{ search.name && search.name.value }}

            p( class='found-text' v-if='excluded === getItems.length' ) Ничего не найдено
            p( class='found-text' v-else ) Найдены следующие товары:

        div( class='catalog-items' :class='{small: $store.state.filter === true}' )
            ItemCard(
                v-for='item in getItems'
                @exclude='++excluded'
                :key='item.id'
                :item='item'
            )

            ItemsFilter( :catalog='parent' )
</template>

<script>
import ItemCard from '@/components/Item/Card.vue'
import ItemsFilter from '@/components/Item/Filter.vue'

export default {
    props: ['parent'],
    components: { ItemCard, ItemsFilter },
    computed: { getItems, search },
    methods: { forceRender },
    mounted: init,
    data: function () {
        return {
            show: true,
            excluded: 0
        }
    }
}

// Computed
function getItems () {
    var list = []
    var parent = 0

    for (let item of this.$store.state.items) {
        if( item.parentId == this.parent.parentId )
            list.push(item)
    }

    return list 
}

function search () {
    return this.$store.state.search
}

function init () {
    this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'set-search')
            update.call(this, state.search)
    })
}

function update (search) {
    this.excluded = 0
    this.forceRender()
}

// Methods
function forceRender () {
    this.show = false
    this.$nextTick(event => {
        if (this.show === false)
            return this.show = true
    })
}
</script>

<style lang="stylus">
@import '~@/style/palette'

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
</style>
