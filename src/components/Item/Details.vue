<template lang="pug">
    div( class='item-details' )
        div( class='tabs-div' )
            span( :class='{tab: true, active: tab === 0}' @click='tab = 0' )
                span( class='text' ) Купить товар
            span( :class='{tab: true, active: tab === 1}' @click='tab = 1' )
                span( class='text' ) Характеристики

        ItemBuy( :class='{show: tab === 0}' :item='item' )
        ItemSpecs( :class='{show: tab === 1}' :item='item' )
</template>

<script>
import ItemBuy from '@/components/Item/Buy.vue'
import ItemSpecs from '@/components/Item/Specs.vue'

export default {
    props: ['item'],
    components: { ItemBuy, ItemSpecs },
    data: function () {
        console.log(this.item)
        return {
            tab: 0
        }
    }
}
</script>

<style lang="stylus">
@import '~@/style/palette'

.item-details
    overflow hidden

    .tabs-div
        align-items center
        display flex
        justify-content space-between
        margin-left -5%
        width 110%

        .tab
            background $dark-blue
            color $white-gray
            display inline-block
            font-size 18px
            padding 16px 0
            text-align center
            text-transform uppercase
            transform skew(-15deg)
            width 50%
            &.active
                background $red

            .text
                display inline-block
                transform skew(15deg)

</style>


