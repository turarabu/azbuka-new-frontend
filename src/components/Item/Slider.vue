<template lang="pug">
    div( class='item-slider' )
        div( class='head-image-div' @click='openFullSlider' )
            img( class='image' :src='`http://95.167.9.22:81/images/${ list[ current ] }.jpg`' )

        div( class='images-list-div' )
            div( class='image-div' v-for='(image, index) in list' @click='current = index' )
                img( class='image' :src='`http://95.167.9.22:81/images/${ image }.jpg`' )


</template>

<script>
export default {
    props: ['item', 'fullSlider'],
    methods: { openFullSlider },
    data: function () {
        var current = 0
        var list = this.item.headImage
            ? [this.item.headImage, ...this.item.images]
            : [...this.item.images]

        return { current, list }
    }
}

// Methods
function openFullSlider () {
    if (this.fullSlider === true)
        return this.$store.commit('full-slider', this.item)
}
</script>

<style lang="stylus">
@import '~@/style/palette'

.item-slider
    
    .head-image-div
        align-items center
        display flex
        justify-content center
        width 100%

        .image
            max-height 100%
            max-width 100%

    .images-list-div
        align-items center
        display flex
        flex-wrap wrap
        justify-content center
        margin 24px 0
        width 100%

        .image-div
            border 1px solid $white-gray
            height 72px
            margin 8px 6px
            padding 6px
            min-width 72px


        .image
            height 100%
</style>
