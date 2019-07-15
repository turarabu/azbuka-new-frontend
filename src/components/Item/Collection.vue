<template lang="pug">
    router-link( tag='div' class='collection-card' :to='link' )
        div( class='image-div' )
            img( class='image' :src='poster' onerror='this.onerror = null; this.src = "/images/not-found.png"' )
        
        h3( class='name' ) {{ name }}

</template>

<script>
export default {
    props: ['collection'],
    data: function () {
        return Object.assign(this.collection, {
            poster: `/images/dynamic/${ this.collection.headImage }.jpg`,
            link: `/catalog/${ this.collection.id }`
        })
    }
}
</script>

<style lang="stylus">
@import '~@/style/palette'

@import '~@/style/palette'

.collection-card
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
</style>

