<template lang="pug">
    div( class='item-buy' )
        h3( class='title' ) {{ item.name }}
        p( class='vendor-code' ) Артикул: {{ item.id }}

        PriceBlock( v-bind='{ item, option }' )
        LeftBlock( v-bind='{ item, option }' v-model='count' )
        OptionsBlock( v-bind='{ item }' v-model='option' )

        div( class='buttons-div' )
            button( class='add-to-cart' @click='toCart' )
                i( class='icon icon-cart' )
                span Купить

            button( v-if='closeButton === true' class='close-button' @click='$emit("close")' )
                span Продолжить покупки
        
</template>

<script>
import PriceBlock from '@/components/Item/Buy/Price.vue'
import LeftBlock from '@/components/Item/Buy/Left.vue'
import OptionsBlock from '@/components/Item/Buy/Options.vue'

export default {
    components: { PriceBlock, LeftBlock, OptionsBlock },
    methods: { toCart, check, add, concat },
    props: ['item', 'closeButton'],
    data: function () {
        return {
            option: 0,
            count: 1
        }
    }
}

// Methods
function toCart () {
    var cart = this.$store.state.cart
    var optionsList = this.item.specs[this.option].options

    for ( let index in cart ) {
        let item = cart[index]

        if ( item.id === this.item.id ) {
            let check = this.check(item)
            if ( check === 'concat' )
                return this.concat(index, item)

            else return
        }
    }

    if ( optionsList[this.option].left > 0 )
        return this.add()
}

function check (item) {
    var optionsList = this.item.specs[this.option].options
    
    if ( optionsList[this.option].left === 0 )
        return false

    if ( item.count + this.count <= optionsList[this.option].left )
        return 'concat'

    return false
}

function add () {
    var optionsList = this.item.specs[this.option].options
    var item = this.item

    if ( this.count <= optionsList[this.option].left )
        this.$store.commit('to-cart', {
            id: item.id,
            source: item,
            poster: `/images/dynamic/${ item.headImage }.jpg`,
            option: this.option,
            count: this.count,
            total: this.item.prices.mins[this.option] * this.count
        })
}

function concat (index, item) {
    item.count += this.count
    item.total = this.item.prices.mins[this.option] * item.count

    this.$store.commit('set-cart', { index, item })
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

    .title
        font-size 20px
        font-weight 500
        line-height 24px
        text-transform uppercase

    .vendor-code
        color lighten($dark-gray, 15)
        font-size 18px
        margin 12px 0

    .buttons-div
        align-items center
        display flex
        justify-content space-between
        padding 16px 0
        width 575px

    .add-to-cart
        background $red
        border none
        border-radius 25px
        color $white
        display inline-block
        font-size 18px
        outline none
        padding 12px
        text-transform uppercase
        width 250px

        .icon
            display inline-block
            font-size 20px
            position relative
            top 3px
            margin-right 12px

    .close-button
        background $white-gray
        border 1px solid $red
        border-radius 25px
        color $red
        display inline-block
        font-size 18px
        font-weight 500
        outline none
        padding 12px
        text-transform uppercase
        width 300px
</style>
