<template lang="pug">
    div( class='item-card' :class='{hide}' )
        div( class='image-div' @click='openPreview' )
            img( class='image' :src='`/images/dynamic/${ item.headImage }.jpg`' onerror='this.onerror = null; this.src = "/images/not-found.png"' )
        
        router-link( tag='div' class='meta' :to='`/item/${ item.id }`' :linkto='`/item/${ item.id }`' )
            p( class='name' ) {{ item.name }}

            p( class='price-text' ) Цена
                span( class='discount' v-if='hasDiscount' ) / Цена со скидкой

            div( class='bottom' )
                span( class='price-block' )
                    span( class='current' :class='{old: hasDiscount}' ) {{ maxPrice }}
                    span( class='discount' v-if='hasDiscount' ) {{ minPrice }}

                span( class='add' )
                    i( class='icon icon-cart' )
                    span( class='plus' ) +

</template>

<script>
export default {
    props: ['item'],
    computed: { search },
    methods: { openPreview },
    mounted: init,
    data: function () {
        return {
            hide: false,
            hasDiscount: this.item.prices.max !== this.item.prices.max,
            maxPrice: toReadablePrice( this.item.prices.max ),
            minPrice: toReadablePrice( this.item.prices.min )
        }
    }
}

// Computed
function search () {
    return this.$store.state.search
}

// Mounted
function init () {
    var list = Object.keys(this.search)

    for (let key of list) {
        let value = this.search[key]
        let prop = getProp.call(this, key, this.item)

        if (findValue(prop, value) === false) {
            this.hide = true
            return this.$emit('exclude', true)
        }
    }
}

// Methods
function openPreview () {
    this.$store.commit('item-preview', this.item)
}

// Help functions
function getProp (prop, item) {
    var propsList = []

    if (prop === 'prices')
        return item.prices.min

    for (let p of item.properties) {
        for (let c of p.childs) {
            if (c.id === prop) 
                return c.value
        }
    }

    return ''
}

function findValue (key, data) {
    switch (data.type) {
        case 'search':
            return key.toLowerCase().search(data.value.toLowerCase()) >= 0
        case 'range':
            return key >= data.value.min && key <= data.value.max
        case 'select':
            console.log(data, key)
            return data.value.length === 0 || data.value.includes(key)
    }
    
    return true
}

function toReadablePrice (price) {
    price = parseInt(price)
    price = price.toLocaleString('ru-RU')

    return `${ price } руб`
}
</script>

<style lang="stylus">
@import '~@/style/palette'

.item-card
    border 1px solid darken($white-gray, 5)
    &.hide
        display none
    
    .image-div
        align-items center
        display flex
        justify-content center
        padding 16px
        height 420px
        width 100%

        .image
            max-height 100%
            max-width 100%

    .name
        font-size 18px
        font-weight 500
        height 72px
        padding 0 16px

    .price-text
        color lighten($dark-gray, 5)
        font-size 18px
        margin 0 16px

        .discount
            display inline-block
            margin-left 4px

    .bottom
        align-items center
        display flex
        justify-content space-between
        margin 12px 0
        padding 0 16px 0 12px
        width 100%

    .price-block
        border 1px solid $red
        border-radius 25px
        font-size 20px
        font-weight 500
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

    .add
        color $black
        display inline-block
        font-size 36px
        margin 0 4px
        position relative

        .plus
            align-items center
            background $red
            border-radius 50%
            color $white
            content '+'
            display flex
            font-size 18px
            justify-content center
            position absolute
            top -8px
            right -8px
            height 24px
            width 24px
</style>
