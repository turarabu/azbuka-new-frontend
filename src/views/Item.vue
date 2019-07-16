<template lang="pug">
    div#item
        div( class='content block' v-if='item' )
            ItemSlider( :item='item' )
            ItemDetails( :item='item' )
</template>

<script>
import ItemSlider from '@/components/Item/Slider.vue'
import ItemDetails from '@/components/Item/Details.vue'

export default {
    props: ['id'],
    computed: { item },
    components: { ItemSlider, ItemDetails }
}


function item () {
    for (let item of this.$store.state.items) {
        if (item.id === this.id)
            return item
    }
}
</script>

<style lang="stylus">
@import '~@/style/palette'

#item
    margin-bottom 64px

    .content
        display grid
        grid-template-columns 850px 850px
        justify-content space-between
        padding 92px 0
        position relative
</style>
