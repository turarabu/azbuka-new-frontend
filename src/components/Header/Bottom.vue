<template lang="pug">
    div#header-bottom( v-if="page.path !== '/'" )
        div( class='block' )
            div( class='left' )
                span( class='back' @click='goBack' ) Назад

                div( class='bread-crumbs-div' )
                    span( class='crumb' )
                        router-link( class='link' to='/' ) Главная

                    span( class='crumb' v-for='(crumb, index) in crumbs' :key='index' )
                        i( class='icon icon-arrow-right' ) →
                        router-link( class='link' :to='`/${ crumb.type }/${ crumb.id }`' ) {{ crumb.name }}
            
            div( class='right' v-if='last.showItems === true' )
                i( class='icon icon-search' )
                input( type='search' class='search' placeholder='Поиск' v-model='search' )

                span( class='filter-switcher' @click='switchFilter' )
                    i( class='icon icon-filter' )
                    span Подобрать по параметрам


                    

</template>

<script>
export default {
    mounted: init,
    computed: { last, search: search() },
    methods: { update, goBack, switchFilter, updateBreadCrumbs },
    data: function () {
        return {
            inited: false,
            filter: false,
            crumbs: [],
            page: this.$router.currentRoute
        }
    }
}

// Computed
function last () {
    return this.crumbs.length > 0
        ? this.crumbs[ this.crumbs.length - 1 ]
        : {}
}

function search () {
    return {
        get () {
            return this.$store.state.search.name
                ? this.$store.state.search.name.text
                : ''
        },

        set (value) {
            this.$store.commit('set-search', {
                prop: 'name',
                value: {
                    key: 'root',
                    prop: 'name',
                    type: 'search',
                    text: value
                }
            })
        }
    }
}

// Mounted
function init () {
    if (this.inited === false) {
        this.inited = true
        this.$router.afterEach((to) => {
            this.page = to
            return this.update()
        })
    }

    return this.update()
}

// Methods
function update () {
    this.updateBreadCrumbs()
    console.log('updated', this.last)
}

function goBack () {
    this.$router.go(-1)
}

function switchFilter () {
    this.$store.commit('switch-filter')
}

function updateBreadCrumbs () {
    var id = this.page.params.id
    var state = this.$store.state
    var crumbs = []

    switch (this.page.name) {
        case 'item':
            crumbs.push( getItem(id, state) )
            crumbs.push( ...getParents(crumbs, state) )
            break

        case 'catalog':
            crumbs.push( getCatalog(id, state) )
            crumbs.push( ...getParents(crumbs, state) )
            break

        case 'cart':
            crumbs.push({
                type: 'cart',
                name: 'Корзина',
                id: 1
            })
            break

        case 'stock':
            crumbs.push( getStock(id, state) )
            break

        case 'all':
            crumbs.push({
                type: 'all',
                name: 'Все товары',
                id: ''
            })
    }

    return this.crumbs = crumbs.reverse()
}

// Helper functions
function getItem (id, state) {
    for (let item of state.items) {
        if (item.id == id)
            return {
                type: 'item',
                parent: item.parentId,
                level: item.level,
                name: item.name,
                id: item.id
            }
    }
}

function getCatalog (id, state) {
    for (let catalog of state.catalog) {
        if (catalog.id == id)
            return {
                type: 'catalog',
                showItems: catalog.showItems,
                collection: catalog.isCollection,
                parent: catalog.parentId,
                level: catalog.level,
                name: catalog.name,
                id: catalog.id
            }
    }
}

function getParents (crumbs, state) {
    var last = crumbs[0]
    var result = []

    while (last.level > 0) {
        last = getCatalog(last.parent, state)
        result.push(last)
    }

    return result
}

function getStock (id, state) {
    for ( let stock of state.stocks ) {
        if ( stock.id == id )
            return {
                type: 'stock',
                name: stock.name,
                id: id
            }
    }
}
</script>

<style lang="stylus">
@import '~@/style/palette'

#header-bottom
    background $white

    .block
        align-items center
        display flex
        justify-content space-between
        padding 16px 0 24px 8px

    .left
        align-items center
        display flex
        justify-content space-between

    .back
        background $red
        border-radius 50px
        color $white
        display inline-block
        font-size 18px
        padding 8px 16px

    .bread-crumbs-div
        align-items flex-start
        display flex
        font-size 18px
        margin 0 24px

        .icon
            display inline-block
            margin 0 8px
            position relative
            top -1px

        .crumb
            display inline-block
            max-width 500px

            .link
                color $black

    .icon-search
        position relative
        top 1px
        right -28px

    .search
        border 1px solid
        border-radius 50px
        font-size 18px
        outline none
        padding 6px 8px 6px 32px
        width 360px

    .icon-filter
        display inline-block
        font-size 20px
        margin 0 8px
        position relative
        top 3px

    .filter-switcher
        display inline-block
        font-size 16px
        font-weight 500
        position relative
        text-align center
        width 420px
        z-index 2
</style>
