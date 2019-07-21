<template lang="pug">
    div( class='items-left-block' )
        h3( class='title' ) Остатки

        div( class='count-div' )
            div( class='selected-count' :style='{width: `${ count + 1 }%`}' )

        div( v-if='left === 0')
            span( v-if='selected.inTransit.length === 0' class='empty' ) Нет в наличии
            div( v-else class='lefts-in-shop-div' )
                div( class='lefts-in-shop' )
                    span( class='lefts-in-shop-title' ) Дата прибытия:
                    span( class='transit-date' ) {{ minTransit(selected.inTransit).date }}

                div( class='lefts-in-shop' )
                    span( class='lefts-in-shop-title' ) Количество
                    span( class='left-count' ) {{ minTransit(selected.inTransit).count }} {{ item.unit }}

        div( v-else class='lefts-in-shop-div' )
            div( class='lefts-in-shop' )
                span( class='lefts-in-shop-title' ) В наличии в магазинах
                i( class='icon icon-map-marker' )
                span( class='lefts-in-shop-select' @click='openShops' ) Список
                //- select( class='lefts-in-shop-select' )
                //-     option( v-for='warehouse in selected.warehouses' ) {{ warehouse }}

            div( class='lefts-in-shop' )
                span( class='lefts-in-shop-title' ) Количество
                span( class='left-count' ) {{ left }} {{ item.unit }}

        h3( class='title' ) Укажите количество
        div( class='set-count-div' )
            span( class='set-count' @click='setCount("sub")' ) –
            span( class='count' ) {{ count }}
            span( class='set-count' @click='setCount("add")' ) +
            
</template>

<script>
export default {
    props: ['item', 'option', 'value'],
    computed: { left, selected },
    methods: { openShops, minTransit, setCount },
    mounted: init,
    data: function () {
        return {
            count: this.value
        }
    }
}

function init () {
    if ( this.value > this.left ) {
        let item = this.item
        let inTransit = item.transits[this.option] || 0

        this.count = Math.min(this.value, this.left + inTransit)
        this.$emit('input', this.count)
    }
}

// Computed
function left () {
    var options = this.item.specs[0].options
    return options[this.option].left
}

function selected () {
    return this.item.specs[0].options[this.option]
}

// Methods
function openShops () {
    this.$store.commit('set-popup', {
        popup: 'shops',
        value: {
            source: this.item,
            selected: this.selected
        }
    })
}

function minTransit () {
    var array = [ ...this.selected.inTransit ]
    var config = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    array.sort((a, b) => {
        return new Date(a) - new Date(b)
    })

    if (true) {
        let date = array[0].date.split('.').reverse()

        return {
            date: new Date(date).toLocaleDateString('ru-RU', config),
            count: array[0].count
        }
    }
}

function setCount (type) {
    var item = this.item
    var inTransit = item.transits[this.option] || 0
    var left = this.left + inTransit

    if ( type === 'sub' )
        this.count = Math.max(this.count - 1, Math.min(1, left))

    else if ( type === 'add' )
        this.count = Math.min(this.count + 1, left)

    return this.$emit('input', this.count)
}
</script>

<style lang="stylus">
@import '~@/style/palette'

.items-left-block

    .title
        margin 8px 0

    .count-div
        background transparent
        border 1px solid $red
        border-radius 8px
        overflow hidden
        position relative
        height 8px
        width 500px

        .selected-count
            background $red
            border-radius 0 8px 8px 0
            height 100%
            position absolute
            left 0

    .empty
        color lighten($dark-gray, 5)
        display block
        font-size 18px
        margin 8px 0 16px 0

    .lefts-in-shop-div
        align-items top
        display flex
        justify-content space-between
        margin 12px 0
        width 490px

        .lefts-in-shop-title
            display block
            color lighten($dark-gray, 15)
            font-size 16px
            font-weight 500
            margin-bottom 2px

        .icon
            color $red
            font-size 18px
            position relative
            left -2px
            top 2px
            margin-right -24px
            width 24px

        .lefts-in-shop-select
            appearance none
            background transparent
            border none
            font-size 16px
            padding 6px 8px 6px 24px
            position relative
            width 200px

        .transit-date
            display block
            font-size 16px
            font-weight 500
            margin-bottom 8px

        .left-count
            font-size 16px
            font-weight 600

    .set-count-div
        align-items center
        display flex
        justify-content space-between
        width 225px

        .set-count
            align-items center
            border 1px solid
            border-radius 25px
            display flex
            font-size 20px
            font-weight 600
            justify-content center
            height 35px
            width 80px
</style>
