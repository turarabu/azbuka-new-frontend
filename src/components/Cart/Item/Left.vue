<template lang="pug">
    div( class='count-cart data' )
        span( class='set-count' @click='setCount("sub")' ) –
        span( class='count-text' ) {{ item.count }} {{ item.source.unit }}
        span( class='set-count' @click='setCount("add")' ) +
</template>

<script>
export default {
    props: ['item', 'index'],
    methods: { setCount, updateItem },
    data: function () {
        return {}
    }
}

function setCount (type) {
    var item = this.item.source
    var option = item.specs[0].options[ this.item.option ]

    var inTransit = item.transits[ this.item.option ] || 0
    var left = option.left + inTransit

    if ( type === 'sub' )
        this.item.count = Math.max(this.item.count - 1, Math.min(1, left))

    else if ( type === 'add' )
        this.item.count = Math.min(this.item.count + 1, left)
    // console.log(this.item)

    return this.updateItem()
}

function updateItem () {
    var index = this.index
    var item = Object.assign(this.item, {
        count: this.item.count,
        total: this.item.source.prices.mins[this.item.option] * this.item.count
    })

    this.$store.commit('set-cart', { index, item })
}
</script>

<style lang="stylus">
.count-cart
    align-items center
    display flex
    justify-content space-between

    .set-count
        border 1px solid
        border-radius 25px
        display inline-block
        padding 3px 18px

    .count-text
        display inline-block
        margin 0 4px
</style>
