<template lang="pug">
    div( class='item-buy' )
        h3( class='name' ) Товар:
            span( class='new-line' ) {{ item.name }}

        p( class='gray-line' ) Артикул: {{ item.id }}

        p( class='price-text' ) Цена
                span( class='discount' v-if='hasDiscount' ) / Цена со скидкой

        p( class='price-block' )
            span( class='current' :class='{old: hasDiscount}' ) {{ maxPrice }}
            span( class='discount' v-if='hasDiscount' ) {{ minPrice }}

        div( class='left-div' )
            span( class='spec-name' ) Остатки
            div( class='left-line' )
                div( class='child' :style='`width: ${ count }%`' )

            div( class='warehouse-div' )
                div( class='empty' v-if='getOption().warehouses.length === 0' ) Нет в наличии
                div( class='warehouses-row' v-else )
                    p( class='warehouses-text' )
                        span( class='text' ) В наличии на складах
                    i( class='select-gps icon icon-map-marker' )
                    select( class='warehouses' v-model='warehouse' )
                        option( v-for='(w, i) in getOption().warehouses' :value='i' ) {{ w }}


                p( class='left-text' )
                    span( class='text') Количество
                    span( class='left' ) {{ getOption().left }} {{ item.unit }}

        div( class='line' )
            span( class='spec-name' ) Укажите количество
            div( class='count-div' )
                span( class='count-change-button' @click='setCount("sub")' ) -
                span( class='count-text' ) {{ count }}
                span( class='count-change-button' @click='setCount("add")' ) +


        div( class='line' v-for='spec in item.specs' )
            span( class='spec-name' ) Выберите {{ spec.name }}
            i( class='select-arrow icon icon-angle-up' )
            select( class='select' :name='spec.id' v-model='selected' @change='warehouse = 0' )
                option( v-for='o in spec.options' :value='o.id' ) {{ o.name }}

            button( class='add-to-cart' @click='addToCart' )
                i( class='icon icon-cart' )
                span Купить
</template>

<script>
export default {
    props: ['item'],
    methods: { getOption, setCount, addToCart },
    computed: { minCount, maxCount },
    updated: function () {
        var option = this.getOption()

        if (this.count > option.left || this.count === 0)
            this.count = Math.min(1, option.left)
    },

    data: function () {
        var selected = this.item.specs[0].options[0].id
        var warehouse = 0
        
        return {
            selected,
            warehouse,
            count: getOption(this.item.specs[0].options, selected).left,
            hasDiscount: hasDiscount(this.item, selected),
            maxPrice: maxPrice(this.item, selected),
            minPrice: minPrice(this.item, selected)
        }
    }
}

// Computed
function minCount () {
    return this.getOption().left === 0
        ? 0 : 1
}

function maxCount () {
    return this.getOption().left + 1
}

// Methods
function getOption (optionS, selected) {
    optionS = optionS || this.item.specs[0].options
    selected = selected || this.selected

    for (let option of optionS) {
        if (option.id === selected)
            return option
    }
}

function setCount (type) {
    if (type === 'sub') 
        this.count = Math.max(this.count - 1, this.minCount)

    else if (type === 'add')
        this.count = Math.min(this.count + 1, this.maxCount)
}

function addToCart () {
    if (this.count === 0)
        return

    else this.$store.commit('add', {
        item: this.item,
        count: this.count,
        selected: this.selected
    })
}

// Data functions
function hasDiscount (item, selected) {
    var option = getOption(item.specs[0].options, selected)
    return option.prices.discounts.length > 0
}

function maxPrice (item, selected) {
    var option = getOption(item.specs[0].options, selected)
    return toReadablePrice( option.prices.current )
}

function minPrice (item, selected) {
    var option = getOption(item.specs[0].options, selected)
    var discounts = calcDiscounts(
        option.prices.current,
        option.prices.discounts
    )

    return toReadablePrice( Math.max(discounts) )
}

// Help functions
function calcDiscounts (base, discounts) {
    var result = []

    for (let dis of discounts)
        result.push( base * ((100 - dis.discount) / 100) )

    return result
    
}

function toReadablePrice (price) {
    price = parseInt(price)
    price = price.toLocaleString('ru-RU')

    return `${ price } руб`
}
</script>


<style lang="stylus">
@import '~@/style/palette'

.item-buy
    background $white-gray
    display none
    padding 32px 52px
    &.show
        display block

    .name
        font-size 20px
        font-weight 500
        line-height 24px
        text-transform uppercase

        .new-line
            display block

    .gray-line
        color lighten($dark-gray, 10)
        font-size 18px
        margin 16px 0

    .price-text
        font-size 20px
        font-weight 500
        line-height 24px
        margin 16px 0 6px 0
        text-transform uppercase

    .price-block
        border 1px solid $red
        border-radius 25px
        display inline-block
        font-size 20px
        font-weight 500
        margin-left -2px
        overflow hidden

        .current
            display inline-block
            margin 8px 20px
            &.old
                color lighten($dark-gray, 25)
                margin 8px 16px

        .discount
            background $red
            border-radius 25px 0 0 25px
            color $white
            display inline-block
            margin-left -4px
            padding 8px 16px

    .spec-name
        display block
        font-size 18px
        font-weight 500
        line-height 24px
        margin 12px 0
        text-transform uppercase

    .left-line
        border 1px solid $red
        border-radius 5px
        overflow hidden
        height 8px
        width 520px
        
        .child
            background $red
            border-radius 0 5px 5px 0
            content ''
            display block
            height 100%
            width attr('child')

    .warehouse-div
        align-items center
        display flex
        justify-content space-between
        margin 12px 0 20px 0
        width 460px

        .warehouses-row
            display block

        .text
            display block
            color lighten($dark-gray, 15)
            font-size 16px
            font-weight 500
            margin 4px 0

        .select-gps
            display inline-block
            color $red

        .warehouses
            background transparent
            border none
            font-size 16px
            font-weight 500
            outline none
            padding-right 8px
            width 160px

        .left
            font-size 16px
            font-weight 600

    .count-div
        align-items center
        display flex

    .count-change-button
        align-items center
        border 1px solid $dark-gray
        border-radius 50px
        display flex
        font-size 24px
        justify-content center
        height 32px
        width 64px

    .count-text
        display inline-block
        font-size 18px
        margin 0 8px
        text-align center
        width 48px

    .select-arrow
        display inline-block
        transform rotateZ(180deg)
        position relative
        left 250px

    .select
        background transparent
        border 1px solid
        border-radius 50px
        font-size 16px
        font-weight 500
        outline none
        padding 6px 16px
        width 260px
        -webkit-appearance none

    .add-to-cart
        background $red
        border none
        border-radius 50px
        color $white
        display block
        font-size 18px
        margin 16px 0
        outline none
        padding 12px 16px
        text-transform uppercase
        width 260px
</style>
